# รายงานการรวมเว็บไซต์ ClassFlow

## ขอบเขตงาน

- รวมหน้าเว็บเดิม 4 ส่วนเป็น Repository เดียว
- ไม่แก้ Google Apps Script, Google Sheets, Google Drive หรือสูตรคะแนน
- ไม่แก้ฟังก์ชันหลักใน `app.js` และ `api.js`
- ไม่แก้หน้าตา สี ปุ่ม หรือ layout เดิม
- ไม่แก้ข้อผิดพลาดเดิมที่อาจมีอยู่ในระบบ

## ไฟล์ที่แก้ไข

| ไฟล์ | รายละเอียด |
|---|---|
| `index.html` | ย้ายหน้า Login มาไว้ราก Repository และเพิ่มการโหลด config/navigation กลางก่อนสคริปต์เดิม |
| `js/config.js` | เปลี่ยน URL ของเว็บปลายทางเป็นเส้นทาง Login/Student/Teacher/Status ภายใน Repository เดียว |
| `student/index.html` | เพิ่มการโหลด `../shared/config.js` และ `../shared/navigation.js` |
| `student/js/config.js` | อ่าน Student API URL และ Login URL จากค่ากลาง |
| `teacher/index.html` | เพิ่มการโหลด `../shared/config.js` และ `../shared/navigation.js` |
| `teacher/js/config.js` | อ่าน Teacher API URL และ Login URL จากค่ากลาง |
| `status/index.html` | เพิ่มการโหลด `../shared/config.js` และ `../shared/navigation.js` |
| `status/js/config.js` | อ่าน Public API URL จากค่ากลาง |

## ไฟล์ที่สร้างใหม่

| ไฟล์ | หน้าที่ |
|---|---|
| `shared/config.js` | จุดตั้งค่า Web App URL ทั้ง 3 ตัวเพียงแห่งเดียว |
| `shared/navigation.js` | คำนวณ URL ของทั้ง 4 หน้าโดยอ้างอิงจากตำแหน่ง Repository ปัจจุบัน |
| `.nojekyll` | ป้องกัน GitHub Pages ประมวลผลไฟล์ด้วย Jekyll โดยไม่จำเป็น |
| `README.md` | คู่มือตั้งค่า อัปโหลด เปิด GitHub Pages ทดสอบ และย้ายระบบ |
| `MIGRATION_REPORT.md` | รายงานการเปลี่ยนแปลงและขอบเขตการตรวจสอบ |

## ไฟล์ฟังก์ชันหลักที่คงเดิมทุกไบต์

- `js/app.js` — ระบบ Login และ redirect ตาม role
- `student/js/app.js` — ฟังก์ชันระบบนักเรียนทั้งหมด
- `student/js/api.js` — การเรียก Student API
- `teacher/js/app.js` — ฟังก์ชันระบบครูทั้งหมด
- `teacher/js/api.js` — การเรียก Teacher API
- `status/js/app.js` — ฟังก์ชันตรวจสอบสถานะสาธารณะ

## ฟังก์ชันเดิมที่ตรวจสอบจากโค้ดแล้ว

- Login กลางและ redirect ตามค่า `portal`
- รับ `loginToken` และแลกเป็น session ของ Student/Teacher API
- แยก localStorage ของนักเรียนและครูด้วย `SESSION_KEY` เดิม
- ล้าง token จาก URL หลังรับสำเร็จ
- Logout กลับหน้า Login กลาง
- การเรียก Apps Script ผ่าน `API_URL` เดิม
- หน้าส่งงาน/รับงาน ระบบกลุ่ม การตรวจงาน ตารางคะแนน การนำเข้าคะแนน และ Logs ยังคงใช้โค้ด `app.js` เดิม
- หน้า Status ยังใช้ Public API เดิม
- ไลบรารี XLSX สำหรับนำเข้าไฟล์ในหน้าครูยังโหลดจากแหล่งเดิม

ข้อความว่า “ตรวจสอบจากโค้ดแล้ว” หมายถึงยืนยันว่าโค้ดเดิมไม่ได้ถูกตัดทอนและเส้นทางไฟล์ใหม่เชื่อมถึงกัน ไม่ใช่การยืนยันผลกับข้อมูลจริง

## การตรวจสอบที่ทำในชุดไฟล์นี้

- ตรวจโครงสร้างไฟล์และเส้นทางสคริปต์ทุกหน้า
- ตรวจว่าไฟล์ JavaScript หลักและ API ตรงกับต้นฉบับด้วย SHA-256
- ตรวจ syntax ของ JavaScript
- ตรวจลิงก์ไฟล์ภายในแบบ static
- ตรวจว่าไม่มี URL ของ Repository เก่าค้างในไฟล์เว็บ
- ตรวจว่า Apps Script และข้อมูลลับไม่ได้ถูกรวมเข้า ZIP สำหรับ GitHub Pages

## รายการที่ต้องทดสอบกับระบบจริง

- การตอบกลับของ Student API, Teacher API และ Public API หลังใส่ URL จริง
- CORS/redirect ของ Apps Script deployment จริง
- Login ด้วยบัญชีนักเรียนและครูจริง
- สิทธิ์ของ token และอายุ session
- ส่งไฟล์จริงเข้า Google Drive
- งานเดี่ยว งานกลุ่ม โหมดเลือกส่ง และการเปลี่ยนกลุ่ม
- การตรวจงาน ให้คะแนน คะแนนแบบไม่มี submission และ ScoreTable ทุกห้อง
- นำเข้า Excel/CSV และข้อมูลที่กรอกตรงในชีต
- ลบ/แก้ไข/กู้คืน submission และไฟล์จาก Logs
- สูตรคะแนนและการซิงก์ข้อมูลใน Google Sheets จริง
- ภาระงานเมื่อมีผู้ใช้พร้อมกันจำนวนมาก; ยังไม่สามารถจำลอง Apps Script quota จริงจากไฟล์ static ได้

## ข้อสังเกตเดิมที่ไม่ได้แก้ปนกับงานนี้

- ต้นฉบับใช้ชื่อภายในบางจุดว่า `Matrix Student System V2` แม้ชื่อหน้าเป็น Class Flow V.2 ซึ่งไม่มีผลต่อการทำงาน จึงคงไว้
- ต้นฉบับกำหนด Web App URL เป็น placeholder จึงต้องใส่ URL จริงใน `shared/config.js` ก่อนใช้งาน
- ไม่ได้ประเมินหรือแก้ตรรกะทางธุรกิจภายใน Apps Script เพราะอยู่นอกขอบเขตการรวม Repository
