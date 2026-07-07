---
title: ระบบ Hook
description: ขยายความสามารถของ Plume ด้วย Go ผ่าน kernel ภายในสไตล์ WordPress ที่รวม action และ filter
---

Plume มาพร้อม hook kernel สไตล์ WordPress (`internal/hooks`) ที่ให้คุณรันโค้ดของตัวเองตอนเกิด event สำคัญ — โดยไม่ต้อง fork โปรเจกต์ Hook เขียนด้วย **Go** คอมไพล์รวมเข้าไปใน build ของคุณ และลงทะเบียนในโค้ด ไม่มีไฟล์ config หรือ UI สำหรับมัน

:::note
Hook มีไว้สำหรับคนที่ **ขยาย Plume ด้วย Go** ถ้าคุณแค่ต้องการให้ Plume แจ้งเตือนบริการภายนอกผ่าน HTTP — ภาษาอะไรก็ได้ ไม่ต้องแก้โค้ด — ให้ใช้ [outbound webhook](/th/docs/webhooks/) แทน ทั้งสองระบบแยกจากกันโดยเจตนา และชื่อ event ของทั้งคู่ก็ต่างกันโดยตั้งใจ
:::

## Hook คืออะไร

Hook คือฟังก์ชันที่คุณลงทะเบียนไว้กับ event ที่มีชื่อ เมื่อ Plume ไปถึง event นั้น มันจะเรียก handler ทุกตัวที่ลงทะเบียนไว้กับ event นั้น คุณผูก handler เข้ากับ hook kernel — instance `*hooks.Hooks` ที่สร้างด้วย `hooks.New()` ใน `cmd/plume` — โดยใช้ `h.AddAction(...)` หรือ `h.AddFilter(...)` ระหว่างขั้นตอน wiring ตอน startup มี hook อยู่สองแบบ

## Action

**Action** คือการตอบสนองต่อสิ่งที่เกิดขึ้นแล้ว — subscriber สมัครเข้ามา, campaign ส่งเสร็จ, ที่อยู่อีเมล bounce Handler จะรันตามลำดับ **priority** จากน้อยไปมาก และ chain จะ **หยุดทันทีที่เจอ error ตัวแรก**

| Event | เกิดขึ้นเมื่อ |
|---|---|
| `subscriber.added` | มีการเพิ่ม subscriber |
| `subscriber.import_row` | มีการประมวลผลแถวระหว่าง import CSV |
| `subscriber.confirmed` | subscriber ยืนยัน double opt-in |
| `subscriber.unsubscribed` | subscriber ยกเลิกรับข่าวสาร |
| `email.opened` | มีการบันทึกการเปิดอ่าน |
| `link.clicked` | มีการคลิกลิงก์ที่ถูก track |
| `email.bounced` | ที่อยู่อีเมล bounce |
| `email.complained` | ผู้รับแจ้งว่าเป็นสแปม |
| `campaign.sending` | campaign เริ่มส่ง |
| `campaign.sent` | campaign ส่งเสร็จ |

## Filter

**Filter** คือการแปลงค่าแล้วคืนค่ากลับมา handler จะรับค่าปัจจุบันแล้วต้องคืนค่า (ที่อาจถูกแก้ไขแล้ว) ซึ่งจะถูกส่งต่อไปยัง filter ตัวถัดไปใน chain

filter ตัวเดียวที่มีคือ **`render.email_html`** ซึ่งเขียน HTML ของอีเมลขาออกใหม่ก่อนส่ง พฤติกรรมในตัวของ Plume เอง — tracking pixel, ลิงก์ unsubscribe, และการเขียนลิงก์ใหม่สำหรับ click-tracking — ล้วนถูก implement เป็น filter บน `render.email_html` เช่นกัน

## การเขียนและลงทะเบียน hook

ลงทะเบียน handler ของคุณตอน startup ตรงจุดที่ kernel ถูก wire ขึ้นมา handler ทุกตัวมี signature เดียวกัน — มันรับ payload เป็น `any` ซึ่งคุณต้อง type-assert เป็น struct payload ของ event นั้น handler ของ action คืนค่า `error` — ถ้าคืนค่า error จะหยุด chain สำหรับ event นั้นทันที

```go
import (
	"context"

	"github.com/plume-newsletter/plume/internal/hooks"
	"github.com/plume-newsletter/plume/internal/signup"
)

// h is the *hooks.Hooks instance (hooks.New()) from cmd/plume.
func registerHooks(h *hooks.Hooks) {
	// priority 50 — lower numbers run earlier; the chain stops on the first error.
	h.AddAction(signup.HookConfirmed, 50, func(ctx context.Context, p any) error {
		sub := p.(signup.ConfirmedPayload).Subscriber // runs after double opt-in
		return crm.Upsert(ctx, sub.Email)
	})
}
```

handler ของ filter จะรับค่าปัจจุบัน (เป็น `any` เช่นกัน) แล้วคืนค่าที่แปลงแล้ว สำหรับ `render.email_html` ค่านั้นคือ string HTML ของอีเมล:

```go
h.AddFilter(render.HookName, 50, func(ctx context.Context, value any) (any, error) {
	html := value.(string)
	return strings.ReplaceAll(html, "{{year}}", "2026"), nil
})
```

## ตัวอย่าง: แจ้งเตือนผ่าน Slack

โพสต์ไปยัง Slack ทุกครั้งที่ campaign ส่งเสร็จ — handler Go จริงบน **action** `campaign.sent` ซึ่ง payload คือ `sending.SendingPayload`:

```go
h.AddAction(sending.HookCampaignSent, 50, func(ctx context.Context, p any) error {
	c := p.(sending.SendingPayload).Campaign
	return slack.Post(ctx, fmt.Sprintf("📨 %s finished sending", c.Name))
})
```

เนื่องจาก handler คืนค่าเป็น `error` การเรียก Slack ที่ล้มเหลวจะปรากฏผ่าน action chain แทนที่จะหายไปเงียบๆ
