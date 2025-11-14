document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-open]");
  buttons.forEach((btn) => {
    new FilterMobile(btn);
  });
});

class FilterMobile {
  constructor(el) {
    this.btn = el;
    this.type = this.btn.getAttribute("data-open");
    this.block = document.querySelector(`[data-${this.type}]`);
    this.btnClose = this.block.querySelector("[data-close]");
    this.listeners();
  }

  listeners() {
    this.btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.btn.classList.add("open");
      this.open();
    });

    this.btnClose.addEventListener("click", (e) => {
      e.preventDefault();
      this.btn.classList.remove("open");
      this.close();
    });
  }

  open() {
    this.block.classList.add("filter--open");
    this.block.style.height = `${this.block.scrollHeight}px`;
    document.body.classList.add("overlay");
  }

  close() {
    this.block.style.height = "";
    this.block.classList.remove("filter--open");
    document.body.classList.remove("overlay");
  }
}