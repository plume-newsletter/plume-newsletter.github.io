---
title: การเชื่อมต่อ n8n
description: ทำงานอัตโนมัติกับ Plume ผ่าน n8n — ทริกเกอร์ workflow เมื่อเกิด event ของ subscriber และจัดการ subscriber กับ campaign จาก workflow ใดก็ได้
---

Plume มาพร้อม community node อย่างเป็นทางการสำหรับ [n8n](https://n8n.io): [`n8n-nodes-plume`](https://www.npmjs.com/package/n8n-nodes-plume)

## ติดตั้ง

ใน n8n แบบ self-hosted: **Settings → Community Nodes → Install** แล้วกรอก `n8n-nodes-plume`

## เชื่อมต่อ

1. ใน Plume สร้าง API key: **Settings → API Keys → New key** คีย์ที่ขึ้นต้นด้วย `plume_...` จะแสดงให้เห็นเพียงครั้งเดียว
2. ใน n8n เพิ่ม credential **Plume API**: URL ของ instance คุณ (เช่น `https://news.example.com`) และคีย์ดังกล่าว การทดสอบ credential จะตรวจสอบทั้งสองค่าทันที

## ทริกเกอร์ workflow จาก Plume

Node **Plume Trigger** จะเริ่ม workflow เมื่อ

| Event | เกิดขึ้นเมื่อ |
|---|---|
| `subscriber.created` | มีการเพิ่ม subscriber (ผ่าน API, ฟอร์ม, การนำเข้า หรือด้วยตนเอง) |
| `subscriber.confirmed` | Subscriber ทำ double opt-in สำเร็จ |
| `campaign.sent` | Campaign ส่งเข้าคิวครบทุกผู้รับแล้ว |

การเปิดใช้งาน workflow จะลงทะเบียน webhook endpoint บน Plume instance คุณให้อัตโนมัติ ส่วนการปิดใช้งานจะลบออก ทุกการส่งข้อมูลจะถูกเซ็นด้วย HMAC โดย Plume และตรวจสอบโดย node — คำขอปลอมจึงไม่มีทางเริ่ม workflow ของคุณได้

## สั่งการ Plume จาก workflow

Node **Plume** เปิดให้ใช้

- **Subscriber → Create** — เพิ่ม subscriber เข้า list (มีตัวเลือก list ให้เลือก)
- **Subscriber → Unsubscribe** — ตั้งสถานะ subscriber เป็น unsubscribed
- **Campaign → Create Draft** — ระบุ brand, subject, HTML body
- **Campaign → Send** — ส่ง campaign ที่มีอยู่ไปยัง **list หรือ segment**
- **List / Segment → Get Many** — ดึงข้อมูลไปใช้ต่อใน logic ถัดไป

## ตัวอย่าง: segment ของ subscriber ที่จ่ายเงิน

Stripe Trigger (การชำระเงินใหม่) → **Plume: Create Subscriber** เข้า list "Customers" ของคุณ → segment `Customers` ของคุณขับเคลื่อน campaign สำหรับสมาชิกเท่านั้นผ่าน **Campaign → Send**

## ตัวอย่าง: RSS พร้อมเงื่อนไขกำหนดเอง

Plume มี [RSS import ในตัว](/th/docs/rss/) สำหรับกรณีทั่วไป ส่วน pipeline แบบกำหนดเอง — เฉพาะบางหมวดหมู่ รวมหลายบล็อกเข้า brand เดียว หรือมีขั้นตอนอนุมัติ — ให้ใช้ **RSS Feed Trigger** ของ n8n → กรอง → **Plume: Create Campaign Draft**

## แผนพัฒนาถัดไป

Event ทริกเกอร์เพิ่มเติม (opens, clicks, bounces) จะทยอยมาตามที่ webhook catalog ขยายขึ้น — node จะรองรับ event เหล่านี้เมื่อมีการอัปเดตเวอร์ชัน
