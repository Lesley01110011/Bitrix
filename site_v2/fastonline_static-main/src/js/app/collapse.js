document.addEventListener("DOMContentLoaded", () => {
  const collapse = document.querySelectorAll("[data-collapse]");
  collapse.forEach((el) => {
    const collapseItems = el.querySelectorAll(".collapse__wrapper");
    collapseItems.forEach((item) => {
      new Collapse(item);
    });
  });
});

class Collapse {
  constructor(el) {
    this.el = el;
    this.trigger = this.el.querySelector("[data-collapse-trigger]");
    this.icon = this.el.querySelector("[data-collapse-icon]");
    this.content = this.el.querySelector("[data-collapse-content]");
    this.duration = this.el
      .closest("[data-duration]")
      .getAttribute("data-duration");
    this.firstInit();
    this.setListeners();
  }

  setListeners() {
    this.trigger.addEventListener("click", () => {
      this.toggle();
    });
    window.addEventListener("resize", () => {
      this.firstInit();
    });
  }

  firstInit() {
    if (this.trigger.classList.contains("active")) {
      this.addProperties();
    }
  }

  addProperties() {
    const el = this.content;
    const { icon } = this;
    const { trigger } = this;
    const height = el.scrollHeight;
    el.style.transition = `max-height ${this.duration}ms ease`;
    el.classList.add("collapsing");
    el.classList.remove("collapsing");
    el.classList.add("collapse-show");
    icon?.classList.add("active");
    trigger.classList.add("active");
    el.style.maxHeight = `${height}px`;
    el.style.height = `${height}px`;
  }

  show() {
    const el = this.content;
    if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse-show")
    ) {
      return;
    }
    this.addProperties();
  }

  hide() {
    const el = this.content;
    const { icon } = this;
    const { trigger } = this;
    if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse-show")
    ) {
      return;
    }
    el.classList.remove("collapse-show");
    icon?.classList.remove("active");
    trigger.classList.remove("active");
    el.classList.add("collapsing");
    el.classList.remove("collapsing");
    el.style.maxHeight = "";
  }

  toggle() {
    const currContent = this.el.querySelector("[data-collapse-content]");
    const collapse = document.querySelectorAll("[data-collapse]");
    collapse.forEach((el) => {
      const content = el.querySelectorAll("[data-collapse-content]");
      const icons = el.querySelectorAll("[data-collapse-icon]");
      const triggers = el.querySelectorAll("[data-collapse-trigger]");

      content.forEach((item) => {
        if (
          item !== currContent &&
          !el.hasAttribute("data-collapse-multiple")
        ) {
          item.classList.remove("collapse-show");
          item.style.maxHeight = "";
          icons.forEach((icon) => {
            icon.classList.remove("active");
          });
          triggers.forEach((trigger) => {
            trigger.classList.remove("active");
          });
        }
      });
    });
    currContent.classList.contains("collapse-show") ? this.hide() : this.show();
  }
}
