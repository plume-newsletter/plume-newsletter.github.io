---
title: การเชื่อมต่อ Amazon SES
description: เชื่อมต่อบัญชี Amazon SES ของคุณเองเพื่อส่งอีเมล ยืนยันโดเมน ออกจากโหมด sandbox และตั้งค่า feedback
---

Plume ส่งอีเมลผ่านบัญชี SES ของคุณเองโดยใช้ AWS SES v2 หน้านี้จะพาไปดูขั้นตอนเรื่อง credentials, การยืนยันโดเมน, การออกจากโหมด sandbox และการตั้งค่า feedback

ไม่ได้ใช้ AWS? Plume ยังส่งผ่าน [ผู้ให้บริการ SMTP ใดก็ได้](/th/docs/email-providers/) — Mailgun, SendGrid, Postmark, Resend และอื่น ๆ

Credential ของ SES — region, access key id และ secret — กรอกในแอปที่หน้า **Settings** ไม่ใช่ตัวแปรแวดล้อม Plume จัดเก็บข้อมูลเหล่านี้แบบเข้ารหัส AES ไว้ที่ storage จนกว่าคุณจะตั้งค่า SES Plume จะใช้ **log provider** ในตัวที่พิมพ์อีเมลออกทาง stdout แทนการส่งจริง ทำให้คุณพัฒนาและทดสอบได้โดยไม่ต้องตั้งค่า AWS เลย

## สร้าง IAM credentials

ใน AWS IAM ให้สร้างผู้ใช้ที่มี programmatic access และแนบ policy ที่จำกัดขอบเขตไว้เฉพาะการส่งของ SES Plume ต้องการแค่สิทธิ์ส่งอีเมลและอ่านสถิติการส่งเท่านั้น

```json
{
  "Effect": "Allow",
  "Action": ["ses:SendEmail", "ses:SendRawEmail"],
  "Resource": "*"
}
```

กรอก access key id, secret และ region ที่ได้ลงใน **Settings** Plume จะเข้ารหัสข้อมูลก่อนบันทึก

## ยืนยันโดเมน

เพิ่ม brand ของคุณใน Plume แล้วระบบจะสร้างระเบียน DKIM และ SPF ให้ไปเพิ่มที่ผู้ให้บริการ DNS ของคุณ Plume จะ poll SES และเปลี่ยนสถานะ brand เป็น *verified* ให้อัตโนมัติ — โดยปกติภายในประมาณ 30 นาที

## ออกจากโหมด sandbox

:::note
บัญชี SES ใหม่จะเริ่มต้นในโหมด **sandbox** — คุณส่งได้เฉพาะที่อยู่ที่ยืนยันแล้วเท่านั้น และจำกัดไว้ที่ 200 ฉบับ/วัน ให้ขอสิทธิ์ production access จากคอนโซล SES เพื่อปลดข้อจำกัดทั้งสองอย่าง
:::

## ตั้งค่า feedback

Feedback เรื่อง bounce และ complaint จะมาถึง Plume ผ่าน **SNS webhook** ให้ชี้ SNS topic ไปที่ endpoint feedback ของ Plume

```text
POST https://your-host/webhook/ses
```

สังเกตว่านี่เป็น root path (`/webhook/ses`) ไม่ได้อยู่ใต้ `/api` Plume จะประมวลผล SNS notification และอัปเดตการ suppress ให้อัตโนมัติ — ดู [Tracking & suppression](/th/docs/tracking-suppression/)

:::caution[ยืนยัน SNS subscription]
การยืนยัน SNS subscription **ไม่ใช่** กระบวนการอัตโนมัติ เมื่อคุณสร้าง subscription, SNS จะส่งข้อความยืนยันที่มี `SubscribeURL` แนบมา Plume จะบันทึก URL นี้ไว้ในล็อก — ต้องมีผู้ดูแลระบบเข้าไปคลิกลิงก์นั้นหนึ่งครั้งเพื่อยืนยัน subscription ก่อนที่ feedback จะเริ่มไหลเข้ามา
:::
