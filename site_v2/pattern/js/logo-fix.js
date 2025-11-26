// Исправление навигации для логотипа и всех ссылок в header
(function() {
  'use strict';
  
  // Функция для принудительного перехода по ссылке
  function forceNavigation(href) {
    if (href && href !== "#" && !href.startsWith("javascript:")) {
      window.location.href = href;
      return true;
    }
    return false;
  }
  
  // Выполняем сразу, если DOM уже готов, иначе ждем DOMContentLoaded
  function initLogoFix() {
    // Обработка логотипа - используем capture phase для перехвата раньше других обработчиков
    var logo = document.querySelector("a.header__logo, a[data-logo-link]");
    if (logo) {
      // Убеждаемся, что href правильный
      var currentHref = logo.getAttribute("href");
      if (!currentHref || currentHref === "#" || currentHref.trim() === "") {
        logo.setAttribute("href", "/");
      }
      
      // Обработчик с высоким приоритетом (capture phase) - принудительный переход
      logo.addEventListener("click", function(e) {
        var href = logo.getAttribute("href");
        if (!href || href === "#" || href.trim() === "") {
          href = "/";
        }
        
        // Если это валидная ссылка, принудительно переходим
        if (href && href !== "#" && !href.startsWith("javascript:")) {
          console.log("Переход на главную через логотип:", href);
          // Останавливаем всплытие и предотвращаем другие обработчики
          e.stopImmediatePropagation();
          e.stopPropagation();
          // Принудительно переходим
          window.location.href = href;
          return false;
        }
      }, true); // true = capture phase
      
      // Обработка клика на изображении внутри логотипа
      var logoImg = logo.querySelector("img");
      if (logoImg) {
        logoImg.style.cursor = "pointer";
        logoImg.addEventListener("click", function(e) {
          var href = logo.getAttribute("href");
          if (!href || href === "#" || href.trim() === "") {
            href = "/";
          }
          // Принудительно переходим при клике на изображение
          if (href && href !== "#" && !href.startsWith("javascript:")) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            window.location.href = href;
            return false;
          }
        }, true);
      }
    }
    
    // Обработка всех ссылок в header (desktop и mobile меню)
    var headerLinks = document.querySelectorAll("header a[href]:not([data-fancybox]):not([href^='tel:']):not([href^='mailto:'])");
    headerLinks.forEach(function(link) {
      // Используем capture phase чтобы перехватить событие раньше других обработчиков
      link.addEventListener("click", function(e) {
        var href = link.getAttribute("href");
        if (href && href !== "#" && !href.startsWith("javascript:")) {
          // Если ссылка валидна, разрешаем переход
          // Не вызываем preventDefault - переход произойдет автоматически
          console.log("Переход по ссылке:", href);
        }
      }, true);
    });
  }
  
  // Выполняем сразу если DOM готов, иначе ждем
  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initLogoFix);
  } else {
    initLogoFix();
  }
})();

