document.addEventListener("DOMContentLoaded", () => {
  const sortItems = document.querySelectorAll("[data-sort-list]");
  sortItems.forEach((item) => {
    new SortItem(item);
  });
});

class SortItem {
  constructor(item) {
    this.item = item;
    this.articles = item.querySelectorAll("[data-sort-item]");
    this.btnSort = item.querySelectorAll("[data-sort-btn]");
    this.setListeners();
  }

  setListeners() {
    this.btnSort.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.btnSort.forEach((item) => {
          this.removeClass(item, "active");
        });
        this.setClass(btn, "active");
        const type = btn.getAttribute("data-sort-btn");
        this.articles.forEach((article) => {
          if (type == "all") {
            this.removeClass(article, "hidden");
          } else if (article.getAttribute("data-sort-item") != type) {
            this.setClass(article, "hidden");
          } else {
            this.removeClass(article, "hidden");
          }
        });
      });
    });
  }

  setClass(el, cssClass = "") {
    el.classList.add(`${cssClass}`);
  }

  removeClass(el, cssClass = "") {
    el.classList.remove(`${cssClass}`);
  }
}
