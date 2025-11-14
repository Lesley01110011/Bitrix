document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector("[data-search-button-mobile]");
  const searchField = document.querySelector("[data-search-field-mobile]");
  document.addEventListener("click", (e) => {
    if (searchBtn.contains(e.target) && !searchBtn.classList.contains("active")) {
      e.preventDefault();
      searchField.classList.add("active");
      searchBtn.classList.add("active");
      setTimeout(() => {
        document.body.classList.add("overlay");
      }, 100);
    } else if ((e.target == searchBtn || !searchField.contains(e.target)) && searchBtn.classList.contains("active")) {
      e.preventDefault();
      searchField.classList.remove("active");
      searchBtn.classList.remove("active");
      setTimeout(() => {
        document.body.classList.remove("overlay");
      }, 100);
    }
  });
});