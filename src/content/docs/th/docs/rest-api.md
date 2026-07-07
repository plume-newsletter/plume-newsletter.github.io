---
title: อ้างอิง REST API
description: JSON REST API ภายใต้ /api ที่ครอบคลุมทุกอย่างที่ Plume UI ทำได้
---

Plume เปิด JSON REST API ที่ครอบคลุมทุกอย่างที่ UI ทำได้ base path คือ `/api` (สัมพัทธ์กับ URL ของการติดตั้งของคุณ) — ไม่มี `/api/v1`

## การยืนยันตัวตน

ยืนยันตัวตนได้สองแบบ:

- **API key** ใน header `Authorization: Bearer <api key>` หรือ
- **Session cookie** ที่ถูกตั้งไว้ตอนคุณ login เข้า UI

API key ถูกสร้างใน UI ที่ **Settings → API keys** ขึ้นต้นด้วย `plume_`, **แสดงให้เห็นเพียงครั้งเดียว** ตอนสร้าง และเก็บไว้เป็น hash แบบ SHA-256 เท่านั้น — Plume ไม่มีทางแสดง key นั้นซ้ำได้อีก key หนึ่งดวงมีสิทธิ์เท่ากับเจ้าของ workspace คือมีสิทธิ์เข้าถึงเหมือนที่เจ้าของมี ไม่มี header `X-API-Key`

```bash
curl https://your-plume.example.com/api/subscribers \
  -H "Authorization: Bearer plume_xxx"
```

## การยืนยันตัวตนและ health check

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/login` | Login และตั้ง session cookie |
| `POST` | `/api/logout` | Logout |
| `GET` | `/api/me` | ผู้ใช้ปัจจุบัน |
| `GET` | `/health` | Health check (ไม่ต้องยืนยันตัวตน) |

## Brands

`GET` / `POST` / `PUT` / `DELETE` บน `/api/brands` — CRUD เต็มรูปแบบสำหรับ sender identity

## Lists

CRUD บน `/api/lists` พร้อมทั้ง import CSV:

| Method | Path | Description |
|---|---|---|
| `GET` `POST` `PUT` `DELETE` | `/api/lists` | List CRUD |
| `POST` | `/api/lists/{listId}/import` | Import subscriber จากไฟล์ CSV |

## Subscribers

CRUD บน `/api/subscribers`

```json
{
  "id": "sub_8f2a",
  "email": "sofia@example.com",
  "status": "subscribed",
  "lists": ["product-news"]
}
```

## Campaigns

CRUD บน `/api/campaigns` พร้อมทั้ง action สำหรับ send/test/report:

| Method | Path | Description |
|---|---|---|
| `GET` `POST` `PUT` `DELETE` | `/api/campaigns` | Campaign CRUD |
| `POST` | `/api/campaigns/{id}/test` | ส่งอีเมลทดสอบ |
| `POST` | `/api/campaigns/{id}/send` | ส่ง campaign |
| `GET` | `/api/campaigns/{id}/report` | ดึงรายงานของ campaign |

`POST /api/campaigns/{id}/send` รับ body ที่มี **อย่างใดอย่างหนึ่งเท่านั้น** ระหว่าง `listId` หรือ `segmentId` — การส่งไปยัง segment จะ resolve เฉพาะ subscriber ที่ตรงเงื่อนไข ณ ขณะนั้น และมีสถานะ `active` เท่านั้น:

```json
{ "segmentId": "3f9c2b7e-1a2b-4c3d-9e8f-0a1b2c3d4e5f" }
```

```json
{ "recipients": 4213 }
```

ถ้าใส่ทั้งสอง key หรือไม่ใส่เลยจะได้ `400` (`provide exactly one of listId or segmentId`); list/segment/campaign ที่ไม่รู้จักจะได้ `404`; campaign ที่ถูก queue หรือส่งไปแล้วจะได้ `409`

## Analytics

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/analytics/overview` | ภาพรวม engagement แบบรวม |
| `GET` | `/api/analytics/deliverability` | ตัวชี้วัด deliverability |

## AI

endpoint ของ [ผู้ช่วย AI](/th/docs/additional-features/) ภายใต้ `/api/ai/*` รวมถึง campaign copilot ทั้งหมดนี้ต้องมีการตั้งค่า Anthropic API key ไว้ที่ **Settings → AI** — ถ้าไม่มี ทุก route ในหมวดนี้จะคืนค่า `400 AI not configured`

`POST /api/ai/campaign` ร่างหรือปรับปรุง campaign ในหนึ่งรอบการสนทนา: ส่งประวัติแชทพร้อมสถานะปัจจุบันของ editor ไป แล้วได้ draft ฉบับสมบูรณ์กลับมาแทนที่ของเดิม

```json
{
  "messages": [{ "role": "user", "content": "Black Friday promo, 20% off" }],
  "state": { "subject": "", "blocks": [], "audience": null }
}
```

```json
{
  "reply": "Drafted a Black Friday promo with a 20%-off code and a shop-now button.",
  "subject": "20% off, today only",
  "blocks": [
    { "type": "heading", "text": "Black Friday is here", "level": 1 },
    { "type": "text", "html": "<p>Take <strong>20% off</strong> everything, today only.</p>" },
    { "type": "button", "label": "Shop now", "href": "#", "align": "center" }
  ],
  "audience": null,
  "sendTimeAdvice": "Your last three campaigns opened best around 9am on weekdays."
}
```

`state.blocks` ใช้ JSON ของ [block editor](/th/docs/additional-features/) มาตรฐานของ Plume (`heading` / `text` / `image` / `button` / `divider` / `spacer`) — AI จะไม่มีวันสร้าง URL รูปภาพขึ้นเอง แต่จะเว้น `src` ให้ว่างพร้อม `alt` ที่อธิบายไว้ให้คุณกรอกเอง ถ้า request สื่อถึงกลุ่มเป้าหมาย (เช่น "ส่งให้คนที่ไม่ได้เปิดอ่านมา 30 วัน") คำตอบจะมี `audience` ด้วย (รูปแบบ match/conditions เดียวกับ [segment](/th/docs/additional-features/)) พร้อม `audienceCount` — UI จะให้คุณบันทึกเป็น segment ได้ในคลิกเดียว `sendTimeAdvice` อ้างอิงจาก analytics ของคุณเอง และจะปรากฏเฉพาะเมื่อมีข้อมูลมากพอที่จะให้คำแนะนำได้

ฝั่งเซิร์ฟเวอร์จะตรวจสอบ block และ audience ของโมเดลก่อนตอบกลับ (retry ภายในหนึ่งครั้งถ้า draft ผิดพลาด) และคืนค่า `502 AI produced an invalid draft` แทนที่จะส่งอะไรที่ render ไม่ได้กลับไป endpoint นี้ไม่เคยส่งอีเมล — มันคืนแค่ draft ให้คุณตรวจสอบใน editor เท่านั้น

## Settings

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/settings` | อ่านการตั้งค่าของ workspace |
| `PUT` | `/api/settings/ses` | ตั้งค่า credential ของ Amazon SES |
| `PUT` | `/api/settings/ai` | ตั้งค่า key ของผู้ช่วย AI |

## Endpoint อื่นๆ

ส่วนที่เหลือของผลิตภัณฑ์เปิดใช้งานอยู่ภายใต้ base path เดียวกัน รวมถึง: `/api/api-keys`, [`/api/webhooks`](/th/docs/webhooks/), `/api/segments`, `/api/ab-tests`, `/api/automations`, `/api/templates`, `/api/signup-forms`, `/api/team`, `/api/ai/*`, และ `/api/blocks/render`

## Flow สาธารณะ (ไม่ต้องยืนยันตัวตน)

Flow เหล่านี้ขับเคลื่อนหน้าตาที่ subscriber มองเห็นและ feedback loop ของ SES ไม่ได้อยู่ภายใต้ `/api` และไม่ต้องใช้ key:

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/subscribe/{listId}` | สมัครรับข่าวสารแบบสาธารณะ |
| `GET` | `/confirm/{subscriberId}` | ยืนยัน double opt-in |
| `GET` `POST` | `/u/{recipientId}` | ยกเลิกรับข่าวสาร (unsubscribe) |
| `GET` | `/f/{id}` | ฟอร์มสมัครรับข่าวสารแบบโฮสต์ให้ |
| `POST` | `/webhook/ses` | รับ feedback ประเภท bounce/complaint จาก SNS |

## ข้อผิดพลาด

Error ใช้ HTTP status code มาตรฐานพร้อม JSON body:

```json
{ "error": "message" }
```

`401` หมายถึงไม่มี key หรือ key ไม่ถูกต้อง (หรือไม่มี session); `422` หมายถึง validation ล้มเหลว
