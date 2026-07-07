---
title: Quickstart
description: ติดตั้ง Plume ให้รันบนเครื่องของคุณและส่งอีเมลทดสอบฉบับแรกได้ภายในประมาณห้านาที
---

ติดตั้ง Plume ให้รันบนเครื่องของคุณและส่งอีเมลทดสอบฉบับแรกได้ภายในประมาณห้านาที

## สิ่งที่ต้องมีก่อน

คุณจะต้องมี **Docker** และ **Docker Compose** โดย *ไม่จำเป็น* ต้องมีผู้ให้บริการอีเมลตั้งแต่เริ่มต้น — จนกว่าคุณจะเชื่อมต่อผู้ให้บริการจริง Plume จะใช้ **log provider** ในตัวที่เขียนอีเมลออกทาง stdout แทนการส่งจริง ทำให้รันได้ทันทีโดยไม่ต้องตั้งค่าอะไรเลย เมื่อพร้อมส่งจริงแล้ว ให้เชื่อมต่อ [Amazon SES](/th/docs/connecting-ses/) (ประหยัดที่สุดเมื่อส่งปริมาณมาก) หรือ [ผู้ให้บริการ SMTP ใดก็ได้](/th/docs/email-providers/) — Mailgun, SendGrid, Postmark, Resend และอื่น ๆ — ผ่านหน้า UI ของแอป

## 1. Clone โปรเจกต์

Clone repo

```bash
git clone https://github.com/plume-newsletter/plume.git
cd plume
```

## 2. ตั้งค่าตัวแปรแวดล้อม

Plume ตั้งค่าทั้งหมดผ่านตัวแปรแวดล้อม (environment variables) เท่านั้น — ไม่มี `.env.example` และไม่มีไฟล์ config ไฟล์ `docker-compose.yml` ที่มาให้จะตั้งค่าตัวแปรที่จำเป็นให้คุณอยู่แล้ว ส่วนที่ควรตรวจสอบคือค่า bootstrap ของแอดมินคนแรกและ secret สามตัว:

```yaml
environment:
  PLUME_DATABASE_URL: postgres://plume:plume@db:5432/plume?sslmode=disable
  PLUME_COOKIE_SECRET: change-me-to-at-least-32-bytes-long
  PLUME_SECRET_KEY: 32-byte-key-exactly-0123456789ab
  PLUME_ADMIN_EMAIL: you@example.com
  PLUME_ADMIN_PASSWORD: change-me
  PLUME_BASE_URL: http://localhost:8080
```

`PLUME_ADMIN_EMAIL` / `PLUME_ADMIN_PASSWORD` ใช้ bootstrap ผู้ใช้แอดมินคนแรกตอนบูตครั้งแรก ดูรายการตัวแปรทั้งหมดได้ที่ [Configuration](/th/docs/configuration/)

## 3. เริ่มการทำงานของสแตก

เปิดใช้งาน Plume และ PostgreSQL พร้อมกัน migration จะรันอัตโนมัติทุกครั้งที่บูต

```bash
docker compose up -d

# → UI live at http://localhost:8080
```

:::tip
เข้า `localhost:8080` แล้วลงชื่อเข้าใช้ด้วยอีเมลและรหัสผ่านแอดมินที่คุณตั้งไว้ด้านบน แอดมินคนแรกจะถูกสร้างขึ้นอัตโนมัติตอนบูตครั้งแรก — คุณไม่ต้องสร้างบัญชีจากหน้าล็อกอิน
:::

## 4. สร้าง brand ของคุณ

ในแดชบอร์ด เพิ่ม [brand](/th/docs/brands-lists-campaigns/) พร้อมที่อยู่อีเมลต้นทาง (from-address) ของคุณ Plume จะแสดงระเบียน DNS ให้ยืนยัน — เพิ่มระเบียนเหล่านั้นที่ผู้ให้บริการของคุณ แล้ว Plume จะยืนยันให้อัตโนมัติ

## 5. ส่งอีเมลทดสอบ

เมื่อสร้าง draft campaign แล้ว ให้ลองส่งทดสอบดู สร้าง API key ที่ **Settings → API keys** จากนั้นเรียก endpoint สำหรับทดสอบ campaign เลือกภาษาที่ถนัด:

```bash
# cURL
curl -X POST http://localhost:8080/api/campaigns/cmp_123/test \
  -H "Authorization: Bearer plume_xxx" \
  -H "Content-Type: application/json" \
  -d '{"to":"you@example.com"}'
```

```js
// JavaScript
await fetch("http://localhost:8080/api/campaigns/cmp_123/test", {
  method: "POST",
  headers: {
    "Authorization": "Bearer plume_xxx",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ to: "you@example.com" }),
});
```

```go
// Go
req, _ := http.NewRequest("POST",
    "http://localhost:8080/api/campaigns/cmp_123/test",
    strings.NewReader(`{"to":"you@example.com"}`))
req.Header.Set("Authorization", "Bearer plume_xxx")
req.Header.Set("Content-Type", "application/json")
http.DefaultClient.Do(req)
```

## การแก้ปัญหา

:::caution[อีเมลถูกปฏิเสธ?]
ถ้าคุณใช้ SES บัญชีใหม่จะเริ่มต้นในโหมด sandbox และส่งได้เฉพาะที่อยู่ที่ยืนยันแล้วเท่านั้น (ก่อนตั้งค่าผู้ให้บริการใด ๆ log provider จะแค่พิมพ์ข้อความออกทาง stdout — ไม่มีอะไรถูกปฏิเสธ) ดู [Connecting Amazon SES](/th/docs/connecting-ses/) เพื่อออกจากโหมด sandbox
:::
