(function () {
  'use strict';

  // หา URL หลักจากตำแหน่งไฟล์ shared/navigation.js เพื่อรองรับทั้ง GitHub Pages
  // และการเปลี่ยนชื่อผู้ใช้ GitHub โดยไม่ต้องฝังโดเมนไว้ในโค้ด
  const scriptUrl = new URL(document.currentScript.src, window.location.href);
  const baseUrl = new URL('../', scriptUrl);
  const routes = Object.freeze({
    login: new URL('./', baseUrl).href,
    student: new URL('student/', baseUrl).href,
    teacher: new URL('teacher/', baseUrl).href,
    status: new URL('status/', baseUrl).href
  });

  window.ClassFlowNavigation = Object.freeze({
    routes,
    url: function (name) {
      if (!Object.prototype.hasOwnProperty.call(routes, name)) {
        throw new Error('ไม่พบหน้าที่ต้องการเปิด: ' + name);
      }
      return routes[name];
    },
    go: function (name, replace) {
      const destination = this.url(name);
      if (replace) window.location.replace(destination);
      else window.location.href = destination;
    }
  });
})();
