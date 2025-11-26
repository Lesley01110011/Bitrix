import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
import "swiper/css";

document.addEventListener("DOMContentLoaded", () => {
  sliderThumbsInit();
});

function sliderThumbsInit() {
  const sliderTop = document.querySelectorAll("[data-slider-top]");
  const sliderBottom = document.querySelectorAll("[data-slider-bottom]");

  for (let i = 0; i < sliderTop.length; i++) {
    const mySwiperThumbs = new Swiper(sliderBottom[i], {
      modules: [Navigation, Thumbs],
      slidesPerView: 4,
      simulateTouch: true,
      spaceBetween: 30,
      freeMode: true,
      multipleActiveThumbs: false,
      observer: true,
      loop: true,
      autoScrollOffset: true,
      observeParents: true,
      breakpoints: {
        1440: {
          slidesPerView: 4
        },
        1024: {
          slidesPerView: 3
        }
      }
    });

    const mySwiperTop = new Swiper(sliderTop[i], {
      modules: [Navigation, Pagination, Thumbs],
      slidesPerView: 1,
      simulateTouch: true,
      observer: true,
      observeParents: true,
      loop: true,
      thumbs: {
        swiper: mySwiperThumbs,
        slideThumbActiveClass: "swiper-slide-thumb-active"
      },
      pagination: {
        el: sliderTop[i].querySelector("[data-slider-pagination]"),
        clickable: true,
        type: "bullets",
        bulletClass: "bullet",
        bulletActiveClass: "bullet--active"
      },
      navigation: {
        nextEl: sliderTop[i].querySelector("[data-slider-next]"),
        prevEl: sliderTop[i].querySelector("[data-slider-prev]")
      }
    });
  }
}
