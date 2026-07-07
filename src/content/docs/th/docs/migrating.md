---
title: ย้ายมาใช้ Plume
description: ย้ายกลุ่มผู้รับของคุณมาจาก Sendy, Mailchimp หรือที่ไหนก็ตามที่ export เป็น CSV ได้
---

ย้ายกลุ่มผู้รับของคุณมาจาก Sendy, Mailchimp หรือที่ไหนก็ตามที่ export เป็น CSV ได้ Plume จะรักษาสถานะความยินยอม (consent) ของผู้รับไว้ครบถ้วน

## จาก Sendy

Export แต่ละลิสต์ของ Sendy เป็น CSV จากแดชบอร์ดของ brand คอลัมน์ของ Sendy จะแมปเข้ากับ email, name และ custom fields ของ Plume ได้อย่างลงตัว และเนื่องจากทั้งสองระบบส่งผ่าน Amazon SES ชื่อเสียงโดเมนของคุณจะติดตามมาด้วย

## จาก Mailchimp

Export กลุ่มผู้รับเป็น CSV จาก Mailchimp (**Audience → Export**) นำเข้าเฉพาะรายชื่อที่มีสถานะ *subscribed* เท่านั้น — Plume จะไม่ส่งอีเมลถึงที่อยู่ที่ถูก clean หรือ unsubscribe แล้ว แต่ถ้านำเข้ามาก็แค่ถูกเพิ่มเป็นสถานะ suppressed

## Export ข้อมูลของคุณ

แพลตฟอร์มส่วนใหญ่จะใส่ email, name และ merge fields ไว้ในคอลัมน์แรก ๆ เก็บแถวหัวตาราง (header row) ไว้ด้วย — คุณจะใช้แมปคอลัมน์ตอนนำเข้า

## นำเข้าสู่ Plume

ใช้ตัวนำเข้า CSV ในแอป (ดู [Subscribers & opt-in](/th/docs/subscribers/)) หรือถ้าต้องการระบบอัตโนมัติหรือลิสต์ขนาดใหญ่ ใช้ API endpoint `POST /api/lists/{listId}/import` (ดู [REST API reference](/th/docs/rest-api/)) Plume จะตัดรายชื่อซ้ำกับ subscriber ที่มีอยู่แล้ว และรายงานแถวที่ถูกข้ามหรือไม่ถูกต้อง

:::note
รายชื่อที่ opt-in ไว้แล้วสามารถข้ามขั้นตอน double opt-in ของ Plume ได้ — เปิดตัวเลือก *existing consent* ตอนนำเข้า เพื่อไม่ต้องให้ลิสต์ที่ยินยอมอยู่แล้วยืนยันตัวตนซ้ำอีกครั้ง
:::

## เชื่อมต่อผู้ให้บริการอีเมล

Plume ส่งผ่านผู้ให้บริการอีเมลของคุณเอง — Amazon SES หรือผู้ให้บริการ SMTP ใดก็ได้ — ซึ่งตั้งค่า **ในหน้า UI ของแอป** ที่ **Settings** ไม่ใช่ผ่านตัวแปรแวดล้อม การตั้งค่าผ่านตัวแปรแวดล้อมที่ Plume อ่านมีเพียงตัวแปร `PLUME_*` แปดตัวเท่านั้น (ไม่มี `.env.example`) ดู [Configuration](/th/docs/configuration/), [Connecting Amazon SES](/th/docs/connecting-ses/) และ [Email providers](/th/docs/email-providers/) ก่อนส่งอีเมลครั้งแรกของคุณ
