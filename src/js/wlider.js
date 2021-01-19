const sliderElem = document.querySelector('.js-swiper-container');

const mySwiper = new Swiper (sliderElem, {
  slidesPerView: 1,
  spaceBetween: 21,
  pagination: {
    clickable: true,
  el: '.js-swiper-pagination',
  type: 'bullets',
  },
  loop: true,
  navigation: {
    nextEl: '.js-swiper-button-next',
    prevEl: '.js-swiper-button-prev',
  },
    autoplay: {
    delay: 3000,
  },
  breakpoints: {
    1024: {
      slidesPerView: 2,
      spaceBetween: 21,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 21,
    }
  }
})
