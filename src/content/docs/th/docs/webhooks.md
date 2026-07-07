---
title: Webhook ขาออก
description: ให้ Plume POST JSON payload ของ event ที่เซ็นด้วยลายเซ็นไปยัง URL ของคุณเอง — ไม่ต้องเขียนโค้ด
---

Outbound webhook ให้ Plume แจ้งบริการภายนอกผ่าน HTTP เมื่อมีบางอย่างเกิดขึ้น ต่างจาก [ระบบ hook ของ Go](/th/docs/hooks/) ตรงที่ webhook **ไม่ต้องเขียนโค้ด** — คุณตั้งค่า endpoint ใน UI (หรือผ่าน API) แล้ว Plume จะ POST JSON ไปให้

:::note
ชื่อ event ของ webhook ตั้งใจให้ต่างจากชื่อ [hook](/th/docs/hooks/) ภายในของ Go webhook คือช่องทางผสานงานแบบไม่ต้องเขียนโค้ด ใช้ได้ทุกภาษา ส่วน hook มีไว้สำหรับขยาย Plume ด้วย Go
:::

## การตั้งค่า endpoint

เพิ่ม webhook endpoint ในแอป หรือจัดการ endpoint ผ่าน [REST API](/th/docs/rest-api/) ที่ `/api/webhooks` แต่ละ endpoint จะมี URL, event ที่ subscribe ไว้, และ **signing secret** ที่ใช้ยืนยันตัวตนของการส่ง

## การส่งทำงานอย่างไร

เมื่อ event ที่ subscribe ไว้เกิดขึ้น Plume จะส่ง `POST` พร้อม JSON body ไปยัง URL ของคุณ มี header สองตัวที่อธิบายการส่งนั้น:

- `X-Plume-Event` — ชื่อ event (เช่น `campaign.sent`)
- `X-Plume-Signature` — ลายเซ็น HMAC-SHA256 ของ request body แบบดิบ โดยใช้ signing secret ของ endpoint นั้นเป็นคีย์

:::caution[ไม่มีการ retry]
การส่งเป็นแบบ **best-effort และ fire-and-forget** ไม่มี retry ไม่มีคิว และไม่มี log การส่ง — ถ้า endpoint ของคุณล่มหรือคืนค่า error event นั้นจะหายไปเลย ทำให้ handler ของคุณเร็วและ idempotent และอย่าพึ่งพา webhook สำหรับสิ่งที่พลาดไม่ได้เด็ดขาด
:::

## รายการ event

| Event | เกิดขึ้นเมื่อ |
|---|---|
| `subscriber.created` | มีการสร้าง subscriber |
| `subscriber.confirmed` | subscriber ยืนยัน double opt-in |
| `campaign.sent` | campaign ส่งเสร็จ |

## การตรวจสอบลายเซ็น

คำนวณ HMAC-SHA256 ของ **request body แบบดิบ** โดยใช้ signing secret ของ endpoint นั้น แล้วเทียบกับ header `X-Plume-Signature` ใช้การเปรียบเทียบแบบ constant-time

```js
import crypto from "node:crypto";

function verify(rawBody, signature, secret) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature),
  );
}

app.post("/plume-webhook", (req, res) => {
  if (!verify(req.rawBody, req.get("X-Plume-Signature"), SECRET)) {
    return res.sendStatus(401);
  }
  const event = req.get("X-Plume-Event");
  // handle event...
  res.sendStatus(200);
});
```

ตรวจสอบลายเซ็นทุกครั้งก่อนที่จะเชื่อถือ payload — มันเป็นสิ่งเดียวที่พิสูจน์ได้ว่า request นี้มาจาก Plume ของคุณจริงๆ
