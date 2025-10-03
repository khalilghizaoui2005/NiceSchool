// ملف src/assets/js/main.js

// تأكد أن كل السكريبت يعمل بعد تحميل DOM
document.addEventListener('DOMContentLoaded', () => {

  // مثال على زر أو عنصر تحتاج event
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // تهيئة مكتبة AOS إذا كانت موجودة
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true
    });
  }

  // تهيئة مكتبة GLightbox إذا كانت موجودة
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  // تهيئة Swiper إذا كانت موجودة
  if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // أي عناصر أخرى من القالب يجب التأكد من وجودها قبل الإضافة
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      document.body.classList.toggle('mobile-nav-active');
    });
  }

});
