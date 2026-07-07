---
title: ฟอร์มสมัครสมาชิกบน WordPress
description: เพิ่มฟอร์มสมัครสมาชิกของ Plume บนเว็บไซต์ WordPress ด้วย shortcode หรือ widget — subscriber ยืนยันผ่านอีเมล (double opt-in) ไม่ต้องใช้ API key
---

ปลั๊กอิน Plume สำหรับ WordPress จะเพิ่มฟอร์มสมัครสมาชิกลงในเว็บไซต์ของคุณ การส่งฟอร์มจะไปที่ endpoint สมัครสมาชิกแบบ double-opt-in ของ Plume instance คุณ ดังนั้น subscriber ทุกคนจะต้องยืนยันผ่านอีเมลก่อนจึงจะ active ปลั๊กอินนี้ไม่จัดเก็บ API key ใด ๆ — เก็บแค่ base URL ของ Plume คุณและ list ID เท่านั้น

## ติดตั้ง

ตอนนี้ปลั๊กอินแจกจ่ายเป็นไฟล์ zip บน GitHub (การลงทะเบียนใน wordpress.org directory จะตามมาทีหลัง)

1. ดาวน์โหลด `plume-newsletter.zip` เวอร์ชันล่าสุดจาก[หน้า releases](https://github.com/plume-newsletter/wordpress-plugin/releases)
2. ใน WordPress ไปที่ **Plugins → Add New → Upload Plugin** เลือกไฟล์ zip แล้วติดตั้งและเปิดใช้งาน

## เชื่อมต่อกับ Plume

1. ไปที่ **Settings → Plume**
2. กรอก **Plume base URL** ของคุณ (เช่น `https://app.yourplume.com`)
3. กรอก **list ID** — คัดลอกได้จากแดชบอร์ด Plume ของคุณที่หน้า **Lists**

## เพิ่มฟอร์ม

- **Shortcode:** ใส่ `[plume_signup]` ในหน้าหรือโพสต์ใดก็ได้ ตัวเลือกเพิ่มเติม: `[plume_signup list="LIST_ID" button="Join" name="true"]` (`list` ที่ระบุตรงนี้จะแทนที่ค่าเริ่มต้น ส่วน `name="true"` จะแสดงช่องกรอกชื่อ)
- **Widget:** เพิ่ม widget **Plume Signup** ลงใน sidebar หรือ footer

## Subscriber ถูกเพิ่มอย่างไร

การส่งฟอร์มจะสร้าง subscriber สถานะ **pending** ใน Plume และส่งอีเมลยืนยันให้ พวกเขาจะกลายเป็น **active** ก็ต่อเมื่อคลิกลิงก์ยืนยันแล้วเท่านั้น — เป็น double opt-in มาตรฐาน สแปมถูกกรองด้วย honeypot และการตรวจสอบจังหวะเวลา (timing check) ไม่มี CAPTCHA และไม่มีการติดตามผู้ใช้
