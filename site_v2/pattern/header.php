<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
    die();
}

use Bitrix\Main\Page\Asset;

Asset::getInstance()->addCss('/www/fastonline_static-main/docs/css/main.css');
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="<?=SITE_DIR?>">
    <link rel="apple-touch-icon" sizes="180x180" href="<?=SITE_TEMPLATE_PATH?>/assets/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="<?=SITE_TEMPLATE_PATH?>/assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="194x194" href="<?=SITE_TEMPLATE_PATH?>/assets/favicon/favicon-194x194.png">
    <link rel="icon" type="image/png" sizes="192x192" href="<?=SITE_TEMPLATE_PATH?>/assets/favicon/android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?=SITE_TEMPLATE_PATH?>/assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="<?=SITE_TEMPLATE_PATH?>/assets/favicon/site.webmanifest">
    <link rel="mask-icon" href="<?=SITE_TEMPLATE_PATH?>/assets/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="<?=SITE_TEMPLATE_PATH?>/assets/favicon/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <?php $APPLICATION->ShowHead(); ?>
    <title><?php $APPLICATION->ShowTitle(); ?></title>
</head>
<body class="body">
<?php $APPLICATION->ShowPanel(); ?>
<script>
// КРИТИЧЕСКИЙ ФИКС: Принудительная навигация для логотипа и всех ссылок
(function() {
  'use strict';
  
  function fixNavigation() {
    // Обработка логотипа - самый высокий приоритет
    var logo = document.querySelector("a.header__logo, a[data-logo-link]");
    if (logo) {
      var currentHref = logo.getAttribute("href");
      if (!currentHref || currentHref === "#" || currentHref.trim() === "") {
        logo.setAttribute("href", "/");
        currentHref = "/";
      }
      
      // Удаляем все старые обработчики и добавляем новый с максимальным приоритетом
      var newLogo = logo.cloneNode(true);
      logo.parentNode.replaceChild(newLogo, logo);
      
      // Обработчик в capture phase - выполняется ПЕРВЫМ
      newLogo.addEventListener("click", function(e) {
        var href = newLogo.getAttribute("href") || "/";
        // Нормализуем href
        if (href === "" || href === "#" || !href) {
          href = "/";
        }
        // Если href относительный, делаем абсолютным
        if (href.charAt(0) !== "/" && !href.startsWith("http")) {
          href = "/" + href;
        }
        console.log("ЛОГОТИП КЛИКНУТ! Переход на:", href);
        // Останавливаем ВСЕ другие обработчики
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        if (e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        // Принудительный переход
        try {
          window.location.href = href;
        } catch(err) {
          window.location = href;
        }
        return false;
      }, true);
      
      // Дополнительный обработчик на самой ссылке (не capture)
      newLogo.onclick = function(e) {
        var href = this.getAttribute("href") || "/";
        if (href === "" || href === "#" || !href) {
          href = "/";
        }
        if (href.charAt(0) !== "/" && !href.startsWith("http")) {
          href = "/" + href;
        }
        console.log("ЛОГОТИП onclick! Переход на:", href);
        window.location.href = href;
        return false;
      };
      
      // Обработка изображения внутри логотипа
      var logoImg = newLogo.querySelector("img");
      if (logoImg) {
        logoImg.style.cursor = "pointer";
        logoImg.addEventListener("click", function(e) {
          var href = newLogo.getAttribute("href") || "/";
          if (href === "" || href === "#" || !href) {
            href = "/";
          }
          if (href.charAt(0) !== "/" && !href.startsWith("http")) {
            href = "/" + href;
          }
          console.log("ИЗОБРАЖЕНИЕ ЛОГОТИПА КЛИКНУТО! Переход на:", href);
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          if (e.stopPropagation) e.stopPropagation();
          if (e.preventDefault) e.preventDefault();
          try {
            window.location.href = href;
          } catch(err) {
            window.location = href;
          }
          return false;
        }, true);
        
        // Дополнительный обработчик
        logoImg.onclick = function(e) {
          var href = newLogo.getAttribute("href") || "/";
          if (href === "" || href === "#" || !href) {
            href = "/";
          }
          if (href.charAt(0) !== "/" && !href.startsWith("http")) {
            href = "/" + href;
          }
          console.log("ИЗОБРАЖЕНИЕ onclick! Переход на:", href);
          window.location.href = href;
          return false;
        };
      }
    }
    
    // Обработка всех ссылок в header
    var headerLinks = document.querySelectorAll("header a[href]:not([data-fancybox]):not([href^='tel:']):not([href^='mailto:']):not([href^='#'])");
    headerLinks.forEach(function(link) {
      if (link.classList.contains("header__logo") || link.hasAttribute("data-logo-link")) {
        return; // Уже обработано выше
      }
      
      link.addEventListener("click", function(e) {
        var href = link.getAttribute("href");
        if (href && href !== "#" && !href.startsWith("javascript:")) {
          console.log("Переход по ссылке header:", href);
          // Не блокируем, но логируем
        }
      }, true);
    });
    
  }
  
  // Выполняем сразу если DOM готов
  if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", fixNavigation);
  } else {
    fixNavigation();
  }
  
  // Также выполняем после небольшой задержки на случай если DOM еще не полностью готов
  setTimeout(fixNavigation, 100);
  setTimeout(fixNavigation, 500);
})();
</script>
<div class="main-container">
  <header class="header">
  <div class="container">
    <div class="header__block header__top">
      <a class="logo header__logo" href="<?=(defined('SITE_DIR') && SITE_DIR ? SITE_DIR : '/')?>" data-logo-link>
        <img src="<?=SITE_TEMPLATE_PATH?>/assets/images/logo-fast-online.svg" alt="FASTonline">
      </a>
      <div class="search header__search mob-hidden">
        <form action="#" role="search" aria-label="Поиск по сайту">
          <label for="search-desktop" class="visually-hidden">Поиск по сайту</label>
          <input type="search" id="search-desktop" name="search" placeholder="Поиск по сайту..." aria-label="Поле поиска">
          <button class="search__button" type="submit" aria-label="Найти">
            <svg class="search__button-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-search"></use>
            </svg>
          </button>
        </form>
      </div>
      <div class="header__callback">
        <div class="header__callback-link">
          <a class="header__callback-text" href="tel:+78000000000">8 800 000 0000</a>
          <a class="header__callback-text-underline" data-fancybox href="#modalCallback">Заказать звонок</a>
        </div>
      </div>
      <div class="header__toolbar">
        <a class="header__toolbar-link" href="#" aria-label="Избранное">
          <svg class="header__toolbar-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-fav"></use>
          </svg>
        </a>
        <div class="search header__search only-mobile">
          <form action="#" role="search" aria-label="Поиск по сайту (мобильная версия)">
            <label for="search-mobile" class="visually-hidden" data-search-field-mobile>Поиск по сайту</label>
            <input type="search" id="search-mobile" name="search" placeholder="Поиск по сайту..." aria-label="Поле поиска">
            <button class="search__button" type="submit" tabindex="0" aria-label="Найти" data-search-button-mobile>
              <svg class="search__button-icon" aria-hidden="true">
                <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-search"></use>
              </svg>
            </button>
          </form>
        </div>
        <a class="header__toolbar-link cart" href="#" aria-label="Корзина, товаров: 42">
          <span class="cart__count" aria-hidden="true">42</span>
          <span class="visually-hidden">42 товара в корзине</span>
          <svg class="header__toolbar-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-cart"></use>
          </svg>
        </a>
      </div>
      <div class="header__account">
        <a class="button--light header__account-link" href="#">
          <span>Войти</span>
          <svg class="header__account-icon">
            <use xlink:href="/www/fastonline_static-main/docs/assets/sprite.svg#icon-enter"></use>
          </svg>
        </a>
      </div>
      <button class="header__menu-btn" type="button" aria-label="Открыть меню" aria-expanded="false" data-toggle-menu>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
    </div>
    <!-- Desktop меню -->
    <div class="header__block header__bottom header__nav-desktop" role="navigation" aria-label="Основная навигация">
      <nav class="nav header__nav">
        <ul class="nav__list">
          <li>
            <a class="nav__link nav__link--accent" href="<?=SITE_DIR?>catalog/">
              <div class="nav__link-icon burger" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>Каталог</span>
            </a>
          </li>
          <li>
            <a class="nav__link" href="<?=SITE_DIR?>services/">Услуги</a>
          </li>
          <li>
            <a class="nav__link" href="<?=SITE_DIR?>novinki/">Новинки</a>
          </li>
          <li>
            <a class="nav__link" href="<?=SITE_DIR?>aktsii/">Акции</a>
          </li>
          <li>
            <a class="nav__link" href="<?=SITE_DIR?>bitrix/">Битрикс</a>
          </li>
          <li>
            <a class="nav__link" href="<?=SITE_DIR?>reviews/">Отзывы</a>
          </li>
          <li>
            <a class="nav__link" href="<?=SITE_DIR?>howitwork/">Как купить</a>
          </li>
          <li>
            <a class="nav__link" href="<?=SITE_DIR?>portfolio/">Портфолио</a>
          </li>
          <li>
            <a class="nav__link" href="<?=SITE_DIR?>faq/">Вопрос-ответ</a>
          </li>
          <li>
            <a class="nav__link" href="<?=SITE_DIR?>about/">О проекте</a>
          </li>
          <li>
            <a class="nav__link" href="<?=SITE_DIR?>contacts/">Контакты</a>
          </li>
        </ul>
      </nav>
    </div>
    <!-- Мобильное меню -->
    <div class="header__block header__bottom menu-mobile" data-mobile-menu role="navigation" aria-label="Основная навигация">
      <nav class="nav header__nav menu-mobile__nav">
        <ul class="nav__list menu-mobile__list" role="menubar">
          <li role="none">
            <a class="nav__link nav__link--accent menu-mobile__link" href="<?=SITE_DIR?>catalog/" role="menuitem">
              <div class="nav__link-icon burger tab-hidden" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>Каталог</span>
            </a>
            <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
          <li role="none">
            <a class="nav__link menu-mobile__link" href="<?=SITE_DIR?>services/" role="menuitem">
              <span>Услуги</span>
            </a>
             <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
          <li role="none">
            <a class="nav__link menu-mobile__link" href="<?=SITE_DIR?>novinki/" role="menuitem">
              <span>Новинки</span>
            </a>
             <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
          <li role="none">
            <a class="nav__link menu-mobile__link" href="<?=SITE_DIR?>aktsii/" role="menuitem">
              <span>Акции</span>
            </a>
             <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
          <li role="none">
            <a class="nav__link menu-mobile__link" href="<?=SITE_DIR?>bitrix/" role="menuitem">
              <span>Битрикс</span>
            </a>
             <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
          <li role="none">
            <a class="nav__link menu-mobile__link" href="<?=SITE_DIR?>reviews/" role="menuitem">
              <span>Отзывы</span>
            </a>
             <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
          <li role="none">
            <a class="nav__link menu-mobile__link" href="<?=SITE_DIR?>howitwork/" role="menuitem">
              <span>Как купить</span>
            </a>
             <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
          <li role="none">
            <a class="nav__link menu-mobile__link" href="<?=SITE_DIR?>portfolio/" role="menuitem">
              <span>Портфолио</span>
            </a>
             <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
          <li role="none">
            <a class="nav__link menu-mobile__link" href="<?=SITE_DIR?>faq/" role="menuitem">
              <span>Вопрос-ответ</span>
            </a>
             <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
          <li role="none">
            <a class="nav__link menu-mobile__link" href="<?=SITE_DIR?>about/" role="menuitem">
              <span>О проекте</span>
            </a>
             <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
          <li role="none">
            <a class="nav__link menu-mobile__link" href="<?=SITE_DIR?>contacts/" role="menuitem">
              <span>Контакты</span>
            </a>
             <svg class="menu-mobile__link-icon" aria-hidden="true">
              <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-arrow-extra-min"></use>
            </svg>
          </li>
        </ul>
        <div class="menu-mobile__nav-bottom">
          <div class="header__account header__account--mobile">
            <a class="header__account-link" href="#">
              <span>Войти</span>
              <svg class="header__account-icon">
                <use xlink:href="<?=SITE_TEMPLATE_PATH?>/assets/sprite.svg#icon-enter"></use>
              </svg>
            </a>
          </div>
          <div class="header__callback header__callback--mobile">
            <div class="header__callback-link">
              <a class="header__callback-text" href="tel:+78000000000">8 800 000 0000</a>
              <a class="header__callback-text-underline" data-fancybox href="#modalCallback">Заказать звонок</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</header>

