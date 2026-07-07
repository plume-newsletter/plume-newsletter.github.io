---
title: Subscriber และ opt-in
description: เพิ่ม subscriber ทีละคน นำเข้าไฟล์ CSV หรือเก็บรวบรวมผ่าน double opt-in — พร้อมติดตาม consent เสมอ
---

เพิ่มผู้คนทีละคน นำเข้าไฟล์ CSV หรือเก็บรวบรวมผ่านฟอร์มสมัครสมาชิก — พร้อมติดตาม consent เสมอ

## การเพิ่ม subscriber

เพิ่มรายบุคคลได้จากแดชบอร์ดหรือผ่าน [API](/th/docs/rest-api/) subscriber แต่ละคนจะจัดเก็บอีเมล ชื่อ (ไม่บังคับ) custom field และสถานะ consent ต่อ list

## การนำเข้าไฟล์ CSV

อัปโหลดไฟล์ CSV แล้ว map คอลัมน์เข้ากับ field การนำเข้า CSV เป็นการทำงานภายในแอป — Plume จะตัด subscriber ที่ซ้ำกับที่มีอยู่แล้วออก และรายงานแถวที่ถูกข้ามหรือไม่ถูกต้อง ตัวนำเข้าจะ post ไปที่ `POST /api/lists/{listId}/import`

```csv
email,name,plan
sofia@example.com,Sofia Chen,pro
marcus@example.com,Marcus Reid,free
```

## Double opt-in ทำงานอย่างไร

:::tip
เมื่อใช้ double opt-in subscriber ใหม่จะได้รับอีเมลยืนยัน และจะกลายเป็น active ก็ต่อเมื่อคลิกยืนยันแล้วเท่านั้น — เป็นวิธีที่ดีที่สุดในการปกป้อง deliverability และให้สอดคล้องกับข้อกำหนดต่าง ๆ
:::

flow แบบสาธารณะคือ `POST /subscribe/{listId}` ซึ่งจะสร้าง subscriber สถานะ pending และส่งอีเมลยืนยัน ตามด้วย `GET /confirm/{subscriberId}` เมื่อผู้รับคลิกลิงก์ — ซึ่งจะทำเครื่องหมายให้เป็น confirmed

## ฟิลด์ที่กำหนดเอง (Custom field)

กำหนด field เช่น `plan` หรือ `country` แล้วนำไปใช้ปรับแต่ง campaign ให้เป็นส่วนตัว หรือใช้สร้าง [segment](/th/docs/additional-features/)
