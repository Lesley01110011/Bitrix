import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".triggered").forEach((elem) => {
    hide(elem);

    ScrollTrigger.create({
      trigger: elem,
      onEnter() {
        animateFrom(elem);
      },
      onEnterBack() {
        animateFrom(elem, -1);
      },
      onLeave() {
        hide(elem);
      }
    });
  });
});

function animateFrom(elem, direction) {
  direction = direction || 1;
  let x = 0;
  let y = direction * 100;
  if (elem.classList.contains("triggered--from-left")) {
    x = -200;
    y = 0;
  } else if (elem.classList.contains("triggered--from-right")) {
    x = 200;
    y = 0;
  }
  elem.style.transform = `translate(${x}px, ${y}px)`;
  elem.style.opacity = "0";
  gsap.fromTo(
    elem,
    { x, y, autoAlpha: 0 },
    {
      duration: 2,
      delay: 0.2,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto"
    }
  );
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}