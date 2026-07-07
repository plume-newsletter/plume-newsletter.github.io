---
title: คำถามที่พบบ่อยและการแก้ปัญหา
description: คำตอบสั้น ๆ สำหรับปัญหาที่พบบ่อยที่สุดเมื่อใช้งาน Plume
---

คำตอบสั้น ๆ สำหรับปัญหาที่พบบ่อยที่สุด ยังติดปัญหาอยู่ไหม? เปิดกระทู้พูดคุยได้ที่ [GitHub](https://github.com/plume-newsletter/plume)

## ข้อผิดพลาดที่พบบ่อย

### "Email address not verified"

ถ้าคุณส่งผ่าน Amazon SES บัญชีของคุณอาจยังอยู่ในโหมด sandbox ให้ยืนยันผู้รับหรือขอสิทธิ์ production access — ดู [Connecting Amazon SES](/th/docs/connecting-ses/) ข้อมูลรับรองของผู้ให้บริการกรอกผ่านหน้า UI ของแอปที่ **Settings** ไม่ใช่ตัวแปรแวดล้อม

### ต้องมีบัญชี AWS ไหม?

ไม่จำเป็น SES เป็นตัวเลือกที่ประหยัดที่สุดเมื่อส่งปริมาณมาก แต่ Plume ส่งผ่านผู้ให้บริการ SMTP ใดก็ได้ (Mailgun, SendGrid, Postmark, Resend, …) ดู [Email providers](/th/docs/email-providers/)

### "Database connection refused"

ตรวจสอบ `PLUME_DATABASE_URL` และตรวจว่า Postgres เข้าถึงได้จาก container หรือ host ของคุณ Plume จะออกทันทีตอน startup ถ้าไม่ได้ตั้งค่า database URL และจะรัน migration ที่ฝังไว้อัตโนมัติทุกครั้งที่บูต — ไม่มีขั้นตอน migrate แยกต่างหาก

### ลิงก์ tracking ชี้ไปที่ localhost

ตั้งค่า `PLUME_BASE_URL` เป็น HTTPS URL สาธารณะของคุณ เพื่อให้ลิงก์ tracking และ unsubscribe ที่ถูกเขียนใหม่แสดงผลถูกต้องสำหรับผู้รับ

## Deliverability

รักษาอัตรา bounce ให้ต่ำกว่า 5% และ complaint ให้ต่ำกว่า 0.1% — ระบบ auto-suppression ของ Plume จะช่วยจัดการส่วนใหญ่ให้คุณ อย่าลืมยืนยันตัวตนโดเมนที่ใช้ส่งด้วย DKIM, SPF และ DMARC เสมอ

## Performance

Plume รันเป็น **process เดียว** โดยมี send worker และ automation worker ทำงานเป็น goroutine ภายใน process เดียวกัน หนึ่งอินสแตนซ์รองรับลิสต์ระดับหลักแสนรายชื่อได้อย่างสบาย ๆ send worker จะทยอยส่งไปยังผู้ให้บริการที่คุณตั้งค่าไว้ภายใต้อัตราการส่งที่กำหนด ทำให้ไม่มีทางส่งเกินโควตาของคุณ ไม่มี worker process แยกที่ต้องรันหรือ scale เพิ่ม — throughput การส่งถูกกำหนดโดยอัตราการส่งของผู้ให้บริการ ไม่ใช่โดย Plume
