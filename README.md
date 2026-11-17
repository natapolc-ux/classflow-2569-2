# ClassFlow ภาคเรียนที่ 2 ปีการศึกษา 2569

Repository นี้รวมหน้า Login, Student, Teacher และ Status เป็น Multi-Page Website เดียวสำหรับ GitHub Pages โดยคงโค้ดการทำงานเดิมและใช้ Google Apps Script/Google Sheets ชุดเดิม

## URL หลังเปิด GitHub Pages

เมื่อชื่อ Repository คือ `classflow-2569-2`:

- Login: `https://ชื่อผู้ใช้.github.io/classflow-2569-2/`
- Student: `https://ชื่อผู้ใช้.github.io/classflow-2569-2/student/`
- Teacher: `https://ชื่อผู้ใช้.github.io/classflow-2569-2/teacher/`
- Status: `https://ชื่อผู้ใช้.github.io/classflow-2569-2/status/`

## ตั้งค่าก่อนอัปโหลด

เปิด `shared/config.js` แล้วแทนค่า URL ของ Google Apps Script Web App ทั้ง 3 จุด:

```js
window.CLASSFLOW_CONFIG = Object.freeze({
  api: Object.freeze({
    student: 'URL_STUDENT_API_ที่ลงท้ายด้วย_exec',
    teacher: 'URL_TEACHER_API_ที่ลงท้ายด้วย_exec',
    public: 'URL_PUBLIC_API_ที่ลงท้ายด้วย_exec'
  })
});
```

ไฟล์นี้เก็บเฉพาะ Web App URL ที่หน้าเว็บจำเป็นต้องเรียกใช้ ห้ามใส่ Script Properties, shared secret, รหัสผ่าน หรือ private key ลงใน Repository

## ขั้นตอนอัปโหลด GitHub แบบทีละขั้น

1. เข้าสู่ GitHub และสร้าง Repository ใหม่ชื่อ `classflow-2569-2`
2. เลือก Public เพื่อใช้ GitHub Pages ฟรี
3. ยังไม่ต้องสร้าง README หรือไฟล์ตัวอย่างจากหน้า GitHub หากจะอัปโหลด ZIP ด้วย Git/GitHub Desktop
4. แตก ZIP นี้ จะได้โฟลเดอร์ `classflow-2569-2`
5. แก้ `shared/config.js` ให้เป็น Web App URL จริงทั้ง 3 รายการ
6. อัปโหลด **เนื้อหาภายในโฟลเดอร์** ขึ้นที่ราก Repository โดยให้ `index.html` อยู่ระดับบนสุด
7. เปิด Repository > **Settings** > **Pages**
8. ในหัวข้อ Build and deployment เลือก **Deploy from a branch**
9. Branch เลือก `main` และ Folder เลือก `/(root)` แล้วกด **Save**
10. รอ GitHub Pages เผยแพร่ แล้วเปิด URL Login ด้านบน

## ลำดับทดสอบหลังเผยแพร่

1. เปิดหน้า Status โดยยังไม่ Login และทดสอบเลือกชั้น/ห้อง
2. Login ด้วยบัญชีนักเรียนทดสอบ ต้องไป `/student/`
3. Logout ต้องกลับหน้า `/classflow-2569-2/`
4. Login ด้วยบัญชีครูทดสอบ ต้องไป `/teacher/`
5. ตรวจงานตัวอย่างหนึ่งรายการและตรวจว่าคะแนนในชีตเดิมเปลี่ยนถูกต้อง
6. ส่งงานจากบัญชีนักเรียนทดสอบหนึ่งรายการ แล้วตรวจสถานะ/ตารางคะแนน
7. ทดสอบงานเดี่ยว งานกลุ่ม โหมดเลือกส่ง และกลุ่มที่นักเรียนเลือกเอง
8. ทดสอบคะแนนแบบไม่มีไฟล์ งานนำเข้าภายนอก และการกู้คืนจาก Logs กับข้อมูลทดสอบ

## เปลี่ยนจากเว็บเก่าโดยไม่ทำข้อมูลสูญหาย

1. อย่าลบหรือแก้ Repository เก่าระหว่างทดสอบ
2. อย่าแก้ Google Sheet ID, Drive Folder ID, Script Properties หรือ Apps Script deployment เดิม
3. เปิดเว็บใหม่และทดสอบด้วยบัญชีทดสอบก่อน เพราะทั้งเว็บเก่าและเว็บใหม่สามารถชี้ Apps Script เดิมพร้อมกันได้
4. เมื่อเว็บใหม่ผ่านการทดสอบแล้ว จึงแจก URL ใหม่ให้นักเรียนและครู
5. เก็บ Repository เก่าไว้แบบอ่านอย่างเดียวอย่างน้อยหนึ่งภาคเรียน หรือจนมั่นใจว่า URL ใหม่ทำงานครบ
6. หากต้องย้อนกลับ ให้กลับไปใช้ URL เก่าได้ทันที ข้อมูลการส่งงานและคะแนนยังอยู่ใน Google Sheets/Drive เดิม

## โครงสร้างสำคัญ

```text
classflow-2569-2/
├── index.html
├── js/
├── student/
├── teacher/
├── status/
├── shared/
│   ├── config.js
│   └── navigation.js
├── .nojekyll
├── README.md
└── MIGRATION_REPORT.md
```

รายละเอียดไฟล์ที่แก้และขอบเขตการทดสอบอยู่ใน `MIGRATION_REPORT.md`
