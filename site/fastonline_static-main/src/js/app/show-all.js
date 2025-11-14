document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("[data-show-trigger]");
  links.forEach((link) => {
    new OpeningBlock(link);
  });
});

class OpeningBlock {
  constructor(el) {
    this.link = el;
    this.parent = el.closest("[data-show-wrap]");
    this.block = this.parent.querySelector("[data-show-block]");
    this.listeners();
  }

  listeners() {
    this.link.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.link.classList.contains("open")) {
        this.link.classList.remove("open");
        this.link.innerText = this.link.getAttribute("data-show-trigger");
        this.block.style.height = "";
        setTimeout(() => {
          this.parent.style.zIndex = "";
        }, 1000);
      } else {
        this.block.style.height = `${this.block.scrollHeight}px`;
        this.parent.style.zIndex = "999";
        this.link.classList.add("open");
        this.link.innerText = "Скрыть";
      }
    });
  }
}