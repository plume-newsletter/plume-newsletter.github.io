---
title: การตั้งค่า
description: ตั้งค่า Plume ทั้งหมดผ่านตัวแปรแวดล้อม โดย secret ที่กรอกผ่าน UI จะถูกเข้ารหัสไว้เสมอ
---

Plume ตั้งค่าทั้งหมดผ่านตัวแปรแวดล้อม (environment variables) เท่านั้น ไม่มี `.env.example` ไม่มีไฟล์ config และไม่มีการโหลด `.env` — ตั้งค่าตัวแปรในตัว process ของคุณ (หรือใน `docker-compose.yml`) ทุกตัวแปรมีค่าเริ่มต้นที่เหมาะสมอยู่แล้ว ยกเว้น database URL และ secret สำหรับเซ็นและเข้ารหัสอีกสองตัว

## ตัวแปรที่จำเป็น

| Variable | หมายเหตุ |
|---|---|
| `PLUME_DATABASE_URL` | connection string (DSN) ของ Postgres แอปจะออกทันทีตอน startup ถ้าไม่ได้ตั้งค่านี้ |
| `PLUME_COOKIE_SECRET` | คีย์ใช้เซ็น session cookie ต้องมีความยาว **อย่างน้อย 32 ไบต์** |
| `PLUME_SECRET_KEY` | AES key ที่ใช้เข้ารหัส secret ที่จัดเก็บไว้ ต้องมีความยาว **32 ไบต์พอดี** |

## ตัวแปรเสริม

| Variable | หมายเหตุ |
|---|---|
| `PLUME_ADMIN_EMAIL` | ใช้ bootstrap ผู้ใช้แอดมินคนแรกตอนบูตครั้งแรก ไม่มีผลถ้ามีแอดมินอยู่แล้ว |
| `PLUME_ADMIN_PASSWORD` | รหัสผ่านสำหรับผู้ใช้แอดมินที่ bootstrap ขึ้นมา |
| `PLUME_BASE_URL` | URL สาธารณะที่ใช้ในลิงก์อีเมล ค่าเริ่มต้นคือ `http://localhost:8080` |
| `PLUME_ADDR` | ที่อยู่ที่เซิร์ฟเวอร์รับฟัง ค่าเริ่มต้นคือ `:8080` |
| `PLUME_SECURE_COOKIES` | ตั้งเป็น `true` เพื่อทำเครื่องหมาย cookie เป็น `Secure` (ใช้เมื่อให้บริการผ่าน HTTPS) |

:::caution[ความยาวของคีย์สำคัญมาก]
`PLUME_COOKIE_SECRET` ต้องมีความยาว **อย่างน้อย 32 ไบต์** และ `PLUME_SECRET_KEY` ต้องมีความยาว **32 ไบต์พอดี** Plume จะไม่เริ่มทำงานถ้าคีย์มีความยาวไม่ถูกต้อง
:::

## Secret กรอกผ่าน UI

ข้อมูลรับรอง (credentials) ของผู้ให้บริการ **ไม่ใช่** ตัวแปรแวดล้อม ข้อมูลรับรองของผู้ให้บริการอีเมล — Amazon SES (region, access key id, secret) หรือ SMTP (host, port, username, password) — และ Anthropic API key สำหรับ [ผู้ช่วย AI](/th/docs/additional-features/) จะกรอกในแอปที่หน้า **Settings** Plume เข้ารหัสข้อมูลเหล่านี้ด้วย AES โดยใช้ `PLUME_SECRET_KEY` จึงไม่มีการเก็บเป็น plaintext และไม่ตกค้างอยู่ใน shell history หรือไฟล์ compose ของคุณ

นั่นหมายความว่าไม่มีตัวแปรแวดล้อมอย่าง `SES_*`, `SMTP_*`, `AWS_*` หรือ Anthropic key ใด ๆ — ให้เชื่อมต่อผู้ให้บริการเหล่านั้นจากแอปที่กำลังรันอยู่แทน ดู [Connecting Amazon SES](/th/docs/connecting-ses/) หรือ [Email providers](/th/docs/email-providers/) สำหรับ SMTP

:::note
เนื่องจาก `PLUME_SECRET_KEY` ใช้ถอดรหัส secret ที่จัดเก็บไว้ทั้งหมด ควรเก็บค่านี้ให้คงที่และสำรองไว้เสมอ การเปลี่ยนหรือทำคีย์นี้หายจะทำให้ข้อมูลรับรองของผู้ให้บริการและ Anthropic ที่เข้ารหัสไว้ก่อนหน้านี้อ่านไม่ได้ และคุณจะต้องกรอกใหม่ทั้งหมด
:::
