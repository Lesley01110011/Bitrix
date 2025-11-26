document.addEventListener("DOMContentLoaded", () => {
  const selectItems = document.querySelectorAll("[data-select]");
  selectItems.forEach((item) => {
    new Select(item);
  });
});

class Select {
  constructor(el) {
    this.select = el;
    this.btn = this.select.querySelector("[data-select-btn]");
    this.list = this.select.querySelector("[data-select-list]");
    this.items = this.list.querySelectorAll("li");
    this.input = this.select.querySelector("[data-select-input]");
    this.listeners();
  }

  listeners() {
    this.btn.addEventListener("click", (e) => {
      e.preventDefault();
      this.list.classList.toggle("visible");
      this.btn.classList.toggle("active");
    });

    this.items.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.btn.innerText = item.innerText;
        this.list.classList.remove("visible");
      });
    });

    document.addEventListener("click", (e) => {
      // Не блокируем клики на ссылках и других интерактивных элементах
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        return;
      }
      if (e.target !== this.btn && !this.select.contains(e.target)) {
        this.hideSelectsList();
      }
    });

    document.addEventListener("keydown", (e) => {
      // Не блокируем Tab для навигации, только Escape
      if (e.key === "Escape") {
        this.hideSelectsList();
      }
    });
  }

  hideSelectsList() {
    this.list.classList.remove("visible");
    this.btn.classList.remove("active");
  }
}