document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector("[data-toggle-menu]");
  const menu = document.querySelector("[data-mobile-menu]");

  document.addEventListener("click", (e) => {
    if (menuBtn.contains(e.target) && !menuBtn.classList.contains("active")) {
      e.preventDefault();
      menu.classList.add("active");
      menuBtn.classList.add("active");
      setTimeout(() => {
        document.body.classList.add("overlay");
      }, 200);
    } else if ((e.target == menuBtn || !menu.contains(e.target)) && menuBtn.classList.contains("active")) {
      e.preventDefault();
      menu.classList.remove("active");
      menuBtn.classList.remove("active");
      setTimeout(() => {
        document.body.classList.remove("overlay");
      }, 200);
    }
  });
});
