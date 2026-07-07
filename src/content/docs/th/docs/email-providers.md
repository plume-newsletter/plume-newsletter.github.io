---
title: ผู้ให้บริการอีเมล
description: ส่งผ่าน Amazon SES, Mailgun, SendGrid, Postmark, Resend หรือ SMTP server ใดก็ได้
---

Plume ส่งผ่าน **ผู้ให้บริการอีเมลที่ใช้งานอยู่ (active)** เพียงตัวเดียว ซึ่งเลือกได้ที่ **Settings → Email**
รองรับผู้ให้บริการสองประเภท

- **Amazon SES** — ตัวเลือกเด่น: วิธีส่งปริมาณมากที่ประหยัดที่สุด
  ($0.10 ต่อ 1,000 อีเมล) และเป็นผู้ให้บริการรายเดียวในตอนนี้ที่รองรับการ
  suppress bounce/complaint แบบอัตโนมัติ ดู [Connecting SES](/th/docs/connecting-ses/)
- **SMTP** — SMTP server ใดก็ได้: Mailgun, SendGrid, Postmark, Resend, mail host
  แบบดั้งเดิม หรือ relay ของคุณเอง ไม่ต้องมีบัญชี AWS

## เชื่อมต่อผู้ให้บริการ SMTP

ที่ **Settings → Email** ให้เปิดการ์ด **SMTP** แล้วกรอก

| ช่อง | ค่า |
|---|---|
| SMTP host | endpoint SMTP ของผู้ให้บริการของคุณ (ดูตารางด้านล่าง) |
| Port | 587 (ค่าเริ่มต้น) หรือ 465 |
| SMTP username | แตกต่างกันไปตามผู้ให้บริการ (ดูตารางด้านล่าง) |
| SMTP password | API key หรือรหัสผ่าน SMTP เฉพาะของผู้ให้บริการ |

เมื่อบันทึกฟอร์มแล้ว SMTP จะกลายเป็นผู้ให้บริการที่ใช้งานอยู่ รหัสผ่านของคุณจะถูกจัดเก็บแบบเข้ารหัสและไม่แสดงผลอีก

### ผู้ให้บริการยอดนิยม

| ผู้ให้บริการ | Host | Port | หมายเหตุ |
|---|---|---|---|
| Mailgun | `smtp.mailgun.org` | 587 | ใช้ SMTP credentials จากแดชบอร์ดของ Mailgun |
| SendGrid | `smtp.sendgrid.net` | 587 | username คือคำว่า `apikey` ตรงตัว ส่วน API key ของคุณกรอกในช่อง password |
| Postmark | `smtp.postmarkapp.com` | 587 | ใช้ server API token เป็นทั้ง username และ password |
| Resend | `smtp.resend.com` | 465 | username คือ `resend`, ใช้ API key เป็น password |

## การสลับผู้ให้บริการ

จัดเก็บ credential ทั้งสองชุดไว้พร้อมกันได้ โดยมีเพียงชุดเดียวที่ใช้งานอยู่ การบันทึกฟอร์มของการ์ดใดก็ตามจะเปิดใช้งานผู้ให้บริการนั้น และการ์ดที่ตั้งค่าไว้แล้วแต่ยังไม่ได้ใช้งานจะแสดงปุ่ม **Use this provider** ให้สลับได้โดยไม่ต้องกรอก credential ใหม่

## ความปลอดภัย

- Port 465 ใช้ implicit TLS ส่วน port อื่นทั้งหมดต้องใช้ STARTTLS — Plume
  จะปฏิเสธการส่ง credentials ผ่านการเชื่อมต่อที่ไม่เข้ารหัส
- อีเมลทุกฉบับยังคงมี header สำหรับ unsubscribe แบบคลิกเดียว (RFC 8058) ในทุกผู้ให้บริการ
  ดังนั้นการปฏิบัติตามข้อกำหนดของ Gmail/Yahoo สำหรับผู้ส่งปริมาณมากจึงเหมือนกับ SES ทุกประการ

## ข้อจำกัดของผู้ให้บริการ SMTP

การ suppress bounce และ complaint แบบอัตโนมัติทำงานกับ **SES เท่านั้น** (ผ่าน SNS webhook) เมื่อส่งผ่าน SMTP ให้คอยตรวจสอบแดชบอร์ด suppression/bounce ของผู้ให้บริการนั้นเอง — หน้า deliverability ของ Plume จะแสดงได้เฉพาะสิ่งที่มันมองเห็นเท่านั้น ส่วน event webhook ของ Mailgun/SendGrid โดยตรงอยู่ในแผนพัฒนาถัดไป
