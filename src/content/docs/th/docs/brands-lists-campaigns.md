---
title: Brand, list และ campaign
description: สามอ็อบเจกต์หลักที่เป็นแกนของทุกสิ่งที่ Plume ทำ และความสัมพันธ์ระหว่างกัน
---

สามอ็อบเจกต์นี้คือแกนของทุกสิ่งที่ Plume ทำ เมื่อเข้าใจความสัมพันธ์ระหว่างกันแล้ว ส่วนที่เหลือของผลิตภัณฑ์จะเข้าใจง่ายขึ้นทันที

## Brand คืออะไร

**Brand** คือตัวตนของผู้ส่ง: ประกอบด้วย from-name, from-address, reply-to และโดเมนสำหรับส่งที่ยืนยันแล้ว รัน brand ได้หลายตัวจาก Plume instance เดียว — แต่ละ brand มีชื่อเสียง (reputation) และการตั้งค่า DNS เป็นของตัวเอง

## List คืออะไร

**List** คือกลุ่มของ subscriber ที่ยินยอมรับข่าวสารจาก brand หนึ่ง ๆ list เป็นเจ้าของสถานะ consent และ unsubscribe โดย subscriber คนหนึ่งอาจอยู่ได้หลาย list พร้อมกัน

## Campaign คืออะไร

**Campaign** คืออีเมล HTML หนึ่งฉบับที่ส่งจาก brand ไปยัง list (หรือ [segment](/th/docs/subscribers/) ของ list นั้น) แต่ละ campaign มีรายงานการติดตามผลและต้นทุนต่อการส่งเป็นของตัวเอง

## ความสัมพันธ์ระหว่างกัน

```text
Brand ──owns──▶ List ──holds──▶ Subscribers ;  Campaign ──targets──▶ List
```
