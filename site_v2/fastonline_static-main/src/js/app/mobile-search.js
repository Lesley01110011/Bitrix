document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector("[data-search-button-mobile]");
  const searchField = document.querySelector("[data-search-field-mobile]");
  
  if (!searchBtn || !searchField) return;
  
  document.addEventListener("click", (e) => {
    // Не блокируем клики на ссылках, формах, кнопках отправки и других навигационных элементах
    const isLink = e.target.tagName === 'A' || e.target.closest('a');
    const isForm = e.target.tagName === 'FORM' || e.target.closest('form');
    const isSubmitButton = e.target.type === 'submit' || e.target.closest('button[type="submit"]');
    const isSearchInput = e.target.type === 'search' || e.target.closest('input[type="search"]');
    
    if (isLink || isForm || isSubmitButton || isSearchInput) return;
    
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