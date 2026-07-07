---
title: การรัน Plume
description: Plume คือโปรเซสเซิร์ฟเวอร์เดี่ยวที่ไม่มี subcommand — รันแล้วมันทำทุกอย่างเอง
---

Plume คือ **โปรเซสเซิร์ฟเวอร์เดี่ยว** ไม่มี subcommand ใดๆ การรัน binary จะเริ่ม HTTP server และทุกอย่างที่เหลือเกิดขึ้นภายในโปรเซสเดียวนั้น ไม่มี `plume serve`, `plume migrate`, `plume import`, หรือ `plume worker`

## เกิดอะไรขึ้นตอน startup

เมื่อคุณรัน Plume (ทั้ง binary หรือ `docker compose up`) มันจะ:

- เริ่ม HTTP server บนพอร์ต `8080`
- รัน database migration ของ [goose](https://github.com/pressly/goose) ที่ฝังไว้โดยอัตโนมัติ
- Bootstrap ผู้ใช้ admin จาก environment (ดู [Configuration](/th/docs/configuration/))
- เปิด **send worker** และ **automation worker** เป็น goroutine ที่รันอยู่ภายในโปรเซสเดียวกัน

Import CSV **ไม่ใช่** คำสั่ง — มันคือ API endpoint `POST /api/lists/{listId}/import` (หรือตัว importer ใน UI) ดู [อ้างอิง REST API](/th/docs/rest-api/)

## วิธีรัน

### Docker (แนะนำ)

```bash
docker compose up -d
```

### Prebuilt binary

ดาวน์โหลด release binary ตั้งค่า [environment variable](/th/docs/configuration/) แล้วรัน:

```bash
./plume
```

### จาก source (สำหรับการพัฒนา)

```bash
go run ./cmd/plume
```

## Configuration

การตั้งค่าทั้งหมดทำผ่าน environment variable — ไม่มีไฟล์ config และไม่มี `.env.example` ดู [Configuration](/th/docs/configuration/) สำหรับรายการตัวแปร `PLUME_*` ทั้งหมด

## Health check

Plume มี health endpoint ที่ `GET /health` เหมาะสำหรับ load balancer และ container health probe
