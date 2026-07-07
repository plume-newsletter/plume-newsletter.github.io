---
title: การติดตั้ง
description: รัน Plume ด้วย Docker หรือเป็นไบนารี Go แบบ static เดี่ยว ๆ ควบคู่กับ PostgreSQL
---

Plume มาในรูปแบบไบนารี Go แบบ static ตัวเดียวที่ฝัง web UI ไว้ในตัว รันด้วย Docker หรือวางไบนารีไว้ข้าง ๆ PostgreSQL ก็ได้

## Docker (แนะนำ)

ไฟล์ compose รวม Plume และ Postgres มาให้พร้อมค่าเริ่มต้นที่ใช้งานได้จริง

```yaml
services:
  plume:
    image: ghcr.io/plume-newsletter/plume:latest
    ports: ["8080:8080"]
    environment:
      PLUME_DATABASE_URL: postgres://plume:plume@db:5432/plume?sslmode=disable
      PLUME_COOKIE_SECRET: change-me-to-at-least-32-bytes-long
      PLUME_SECRET_KEY: 32-byte-key-exactly-0123456789ab
      PLUME_ADMIN_EMAIL: you@example.com
      PLUME_ADMIN_PASSWORD: change-me
      PLUME_BASE_URL: http://localhost:8080
    depends_on: [db]
  db:
    image: postgres:16
```

## ไบนารีเดียว

ไม่อยากใช้ Docker? ดาวน์โหลดไบนารีจาก release แล้วชี้ไปที่ connection string ของ Postgres การตั้งค่าทำผ่านตัวแปรแวดล้อม การรันไบนารีจะเริ่มเซิร์ฟเวอร์ รัน migration และเปิด background worker ให้อัตโนมัติ

```bash
curl -L https://github.com/plume-newsletter/plume/releases/latest/download/plume-linux-amd64 -o plume
chmod +x plume
PLUME_DATABASE_URL=postgres://localhost/plume \
PLUME_COOKIE_SECRET=change-me-to-at-least-32-bytes-long \
PLUME_SECRET_KEY=32-byte-key-exactly-0123456789ab \
  ./plume
```

### วางไว้หลัง reverse proxy

ให้ nginx หรือ Caddy จัดการ TLS แล้ว proxy มาที่พอร์ต 8080 ตั้งค่า `PLUME_BASE_URL` เป็น HTTPS URL สาธารณะของคุณ เพื่อให้ลิงก์ tracking และหน้า unsubscribe แสดงผลถูกต้อง และตั้งค่า `PLUME_SECURE_COOKIES=true` เพื่อให้ session cookie ถูกทำเครื่องหมาย Secure

## ฐานข้อมูล

Plume ต้องการ PostgreSQL 14 ขึ้นไป migration ถูกฝังไว้ในไบนารี (ใช้ goose) และรันอัตโนมัติตอน startup — ไม่มีขั้นตอนหรือคำสั่ง migrate แยกต่างหาก

## การอัปเกรด

ดึงอิมเมจ (หรือไบนารี) ตัวใหม่มาแล้วรีสตาร์ท migration เป็นแบบ forward-only และรันตอนบูต ตรวจสอบ [changelog](/th/docs/changelog/) ทุกครั้งก่อนอัปเดตเวอร์ชันใหญ่ เพื่อดูรายการที่อาจกระทบการทำงานเดิม
