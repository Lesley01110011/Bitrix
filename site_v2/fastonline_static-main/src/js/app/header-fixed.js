import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const showAnim = gsap
    .from(header, {
      yPercent: -100,
      paused: true,
      duration: 0.4
    })
    .progress(1);

  ScrollTrigger.create({
    start: "100vh top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    }
  });
});