document.addEventListener("DOMContentLoaded", () => {
  const btnToTop = document.querySelector("[data-top]");
  document.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      btnToTop.classList.add("active");
    } else {
      btnToTop.classList.remove("active");
    }
  });
  btnToTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
});