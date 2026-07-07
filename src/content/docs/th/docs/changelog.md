---
title: Changelog
description: การเปลี่ยนแปลงสำคัญของ Plume
---

การเปลี่ยนแปลงสำคัญของ Plume

## ยังไม่เผยแพร่

- **RSS blog-to-newsletter** — เชื่อมต่อ brand เข้ากับ RSS หรือ Atom feed ของบล็อกคุณ แล้ว Plume จะร่าง campaign ให้อัตโนมัติสำหรับทุกโพสต์ใหม่ (ที่เผยแพร่หลังจากเชื่อมต่อ) เลือก "Post as-is" เพื่อใช้ HTML ดิบตามเดิม หรือ "Let AI write it" เพื่อให้ copilot เขียนแต่ละโพสต์ใหม่เป็นจดหมายข่าวตามคำสั่ง (instruction) ที่คุณตั้งไว้ ระบบตรวจสอบความถูกต้องของ feed ทันที โพลทุก 15 นาที และร่างได้สูงสุด 3 ฉบับต่อการตรวจสอบหนึ่งครั้ง ดู [Turn your blog into a newsletter](/th/docs/rss/)
- **ย้ายจาก Ghost** — อัปโหลดไฟล์ export สมาชิกจาก Ghost เข้าสู่ตัวนำเข้า CSV ของ subscriber แล้วผู้อ่านที่ subscribed จะเข้ามาเป็น subscriber สถานะ active พร้อมส่งอีเมลได้ทันที ส่วนสมาชิกที่ opt-out จากอีเมลของ Ghost จะถูกข้ามไป ดู [Migrate from Ghost](/th/docs/ghost-migration/)
- **แบบฟอร์มสมัครรับข่าวสารบน WordPress** — ปลั๊กอิน Plume สำหรับ WordPress เพิ่มแบบฟอร์มสมัครรับข่าวสาร (shortcode หรือ widget) ที่ลงทะเบียนผู้เข้าชมเข้าสู่ list ของ Plume ผ่าน double opt-in โดยไม่มีการเก็บ API key ใด ๆ ดู [WordPress signup form](/th/docs/wordpress/)

## v0.4.0 — 2026-07-05

- **AI campaign copilot** — อธิบาย campaign ที่ต้องการด้วยภาษาพูดธรรมดาจากหน้าต่าง
  "New campaign" แล้วรับ draft เต็มรูปแบบ (subject + บล็อกเนื้อหา) ที่พร้อมปรับแก้ผ่านการแชท
  ระบบยังเสนอกลุ่มเป้าหมายเป็น segment ให้แบบคลิกเดียว และให้คำแนะนำเวลาที่ควรส่ง
  โดยอ้างอิงจากข้อมูล analytics ของคุณ เป็นฟีเจอร์เสริม — ต้องมี
  Anthropic API key ใน **Settings** และระบบจะไม่ส่ง campaign ให้เองเด็ดขาด ดู
  [`POST /ai/campaign`](/th/docs/rest-api/)
- **การส่งแบบกำหนดเป้าหมายด้วย Segment** — หน้าต่างส่งอีเมลตอนนี้มีแท็บ **List** และ
  **Segment** การส่งไปยัง segment จะเข้าถึงเฉพาะ subscriber ที่ตรงเงื่อนไข ณ ขณะนั้นและมีสถานะ
  `active` เท่านั้น ส่วนการ suppression และ unsubscribe แบบคลิกเดียวยังทำงานเหมือนเดิม ดู
  [Sending & the worker](/th/docs/sending/)

## v0.2.0 — 2026-07-03

- **ผู้ให้บริการอีเมลผ่าน SMTP** — ส่งผ่าน Mailgun, SendGrid, Postmark, Resend
  หรือเซิร์ฟเวอร์ SMTP ใดก็ได้ โดยไม่ต้องมีบัญชี AWS เลือกผู้ให้บริการที่ใช้งาน
  (SES หรือ SMTP) ได้ที่ **Settings → Email** header สำหรับ unsubscribe แบบคลิกเดียวยังคงใช้งานได้
  บนเส้นทาง SMTP ส่วนการ auto-suppression สำหรับ bounce/complaint ยังจำกัดเฉพาะ SES เท่านั้นในตอนนี้
  ดู [Email providers](/th/docs/email-providers/)

## v0.1.0 — เผยแพร่สู่สาธารณะครั้งแรก

รายการนี้สรุปฟีเจอร์ที่เปิดใช้งานแล้วทั้งหมด:

- **Audience** — brand, list และ subscriber พร้อม custom fields, นำเข้า CSV, double opt-in
- **Campaigns** — เขียน HTML campaign พร้อม template และบล็อกที่นำกลับมาใช้ซ้ำได้
- **Sending & tracking** — background send worker ที่ทยอยส่งไปยัง Amazon SES ภายใต้อัตราการส่งที่กำหนด ติดตามการเปิดอ่าน คลิก bounce และ complaint พร้อม auto-suppression
- **Segments & A/B tests** — การแบ่งกลุ่มขั้นสูงและการทดสอบแบบ split test
- **Automations** — automation แบบหลายขั้นตอน
- **AI** — ผู้ช่วย AI สำหรับเขียนเนื้อหาและแนะนำเวลาส่ง
- **Analytics** — ภาพรวมการมีส่วนร่วมและแดชบอร์ด deliverability
- **Growth** — แบบฟอร์มสมัครรับข่าวสารแบบ hosted
- **Collaboration** — การทำงานเป็นทีม
- **Developers** — ระบบ [hook](/th/docs/hooks/) ที่เขียนด้วย Go, [webhooks](/th/docs/webhooks/) ขาออก, API keys และ [REST API](/th/docs/rest-api/) ที่ครอบคลุมทุกอย่างที่ UI ทำได้
