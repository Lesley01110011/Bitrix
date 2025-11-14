import axios from "axios";
import { Fancybox } from "@fancyapps/ui";

document.addEventListener("DOMContentLoaded", () => {
  const text = document.querySelectorAll("[data-text-circle]");
  text.forEach((textEl) => {
    const textContent = textEl.getAttribute("data-text-circle");
    const chars = textContent.split("");
    for (let i = 0; chars.length > i; i++) {
      textEl.innerHTML += `<span class="char char-${i}">${chars[i]}</span>`;
    }
  });
});