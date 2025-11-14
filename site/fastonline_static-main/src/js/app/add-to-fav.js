document.addEventListener("DOMContentLoaded", () => {
  const btnFav = document.querySelectorAll("[data-fav]");
  const btnFavDetail = document.querySelectorAll("[data-fav-text]");
  btnFav.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      btn.classList.toggle("active");
    });
  });
  btnFavDetail.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const textTmpl = btn.querySelector("[data-fav-text-tmpl]");
      if (btn.classList.contains("active")) {
        textTmpl.innerText = textTmpl.getAttribute("data-fav-text-tmpl");
      } else {
        textTmpl.innerText = textTmpl.getAttribute("data-fav-text-remove");
      }
    });
  });
});