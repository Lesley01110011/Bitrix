document.addEventListener("DOMContentLoaded", async () => {
  const menuBtn = document.querySelector("[data-toggle-menu]");
  const menu = document.querySelector("[data-mobile-menu]");

  if (!menuBtn || !menu) return;

  // Функция для закрытия меню с использованием async/await
  const closeMenu = async () => {
    menu.classList.remove("active");
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    
    // Используем Promise для асинхронной задержки
    await new Promise(resolve => setTimeout(resolve, 200));
    document.body.classList.remove("overlay");
  };

  // Функция для открытия меню
  const openMenu = async () => {
    menu.classList.add("active");
    menuBtn.classList.add("active");
    menuBtn.setAttribute("aria-expanded", "true");
    
    await new Promise(resolve => setTimeout(resolve, 200));
    document.body.classList.add("overlay");
  };

  // Обработчик клика на кнопку меню
  menuBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!menuBtn.classList.contains("active")) {
      await openMenu();
    } else {
      await closeMenu();
    }
  });

  // Обработчик клика на ссылки в меню - закрываем меню, но не блокируем переход
  const menuLinks = menu.querySelectorAll("a");
  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Не блокируем переход по ссылке, просто закрываем меню
      closeMenu();
      // Переход произойдет автоматически через href
    });
  });

  // Закрытие меню при клике вне его
  document.addEventListener("click", (e) => {
    // Проверяем, что клик не на ссылке меню или других навигационных элементах
    const isMenuLink = e.target.closest && e.target.closest("a.menu-mobile__link");
    const isNavLink = e.target.closest && (e.target.closest("a.nav__link") || e.target.closest("a.header__logo"));
    const isLink = e.target.tagName === 'A' || e.target.closest('a');
    
    if (menuBtn.classList.contains("active") && 
        !menu.contains(e.target) && 
        !menuBtn.contains(e.target) &&
        !isMenuLink &&
        !isNavLink &&
        !isLink) {
      closeMenu();
    }
  });
});
