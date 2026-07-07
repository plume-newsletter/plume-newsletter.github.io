---
title: การติดตามผลและการ suppress
description: Plume บันทึกการเปิดอ่าน คลิก bounce และ complaint แล้ว suppress ที่อยู่ที่มีปัญหาให้อัตโนมัติได้อย่างไร
---

การเปิดอ่านและคลิกถูกติดตามได้กับผู้ให้บริการอีเมลทุกเจ้า ส่วนการ suppress bounce และ complaint แบบอัตโนมัติตามที่อธิบายด้านล่างนี้ ต้องใช้ Amazon SES เท่านั้น — ดูตารางเปรียบเทียบฉบับเต็มได้ที่ [Email providers](/th/docs/email-providers/)

## การเปิดอ่านและคลิก

Tracking pixel จะบันทึกการเปิดอ่านผ่าน `GET /t/{recipientId}` ส่วนลิงก์จะถูกเขียนใหม่ให้ผ่าน Plume เพื่อบันทึกการคลิกก่อน redirect ผ่าน `GET /l/{linkId}/{recipientId}` ปิดการติดตามทั้งสองแบบได้ต่อ campaign สำหรับการส่งที่เน้นความเป็นส่วนตัว ทำงานเหมือนกันไม่ว่าผู้ให้บริการอีเมลที่ใช้งานอยู่จะเป็นเจ้าใด

## Bounce (อีเมลตีกลับ)

:::note[SES เท่านั้น]
การติดตาม bounce แบบอัตโนมัติต้องใช้ Amazon SES เท่านั้น SES จะรายงาน hard bounce และ soft bounce ผ่าน SNS feed ที่ `/webhook/ses` hard bounce จะถูก suppress ทันที ส่วน soft bounce จะถูก retry ก่อนที่จะ suppress ถ้าคุณส่งผ่าน SMTP แทน ให้คอยตรวจสอบแดชบอร์ด bounce ของผู้ให้บริการนั้นเอง — ดู [Email providers](/th/docs/email-providers/)
:::

## Complaint (การร้องเรียนสแปม)

:::note[SES เท่านั้น]
การติดตาม complaint แบบอัตโนมัติก็ต้องใช้ Amazon SES เช่นกัน เมื่อผู้รับทำเครื่องหมายอีเมลว่าเป็นสแปม SES จะส่ง complaint notification มาผ่าน feed `/webhook/ses` เดียวกัน Plume จะ suppress ที่อยู่นั้นและบันทึก event นี้ไว้กับ campaign
:::

## การ suppress อัตโนมัติ

:::caution
Hard bounce, complaint และการ unsubscribe จะถูก suppress ให้อัตโนมัติ ที่อยู่ที่ถูก suppress จะไม่ถูกส่งอีเมลอีกเลย ในทุก campaign จนกว่าคุณจะนำออกด้วยตัวเอง — การ suppress ถูกบังคับใช้ตอนที่ส่งจริง นี่คือมาตรการป้องกันที่สำคัญที่สุดในการไม่ให้อีเมลตกไปอยู่ในโฟลเดอร์สแปม การ suppress bounce/complaint แบบอัตโนมัติในตอนนี้ทำงานกับ **SES เท่านั้น** ส่วนการ unsubscribe จะถูก suppress ในทุกผู้ให้บริการ
:::
