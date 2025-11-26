/**
 * Поиск в header
 * Простая и надежная реализация поиска
 */

// Моковые данные для поиска
const SEARCH_DATA = [
  { title: "Готовые интернет-магазины на Bitrix", url: "./catalog.html", category: "Каталог" },
  { title: "Разработка корпоративных сайтов", url: "./services.html", category: "Услуги" },
  { title: "Новые шаблоны для интернет-магазинов", url: "./catalog.html", category: "Новинки" },
  { title: "Скидки на услуги разработки", url: "./catalog.html", category: "Акции" },
  { title: "Интеграция Bitrix24 с внешними системами", url: "./services.html", category: "Битрикс" },
  { title: "Отзывы клиентов о наших услугах", url: "./reviews.html", category: "Отзывы" },
  { title: "Портфолио выполненных проектов", url: "./about-service.html", category: "Портфолио" },
  { title: "Часто задаваемые вопросы", url: "./faq.html", category: "Вопрос-ответ" }
];

/**
 * Выполнить поиск
 */
function performSearch(query, redirectToFirst = true) {
  if (!query || !query.trim()) {
    return [];
  }

  const searchQuery = query.trim().toLowerCase();
  const results = SEARCH_DATA.filter(item => {
    return item.title.toLowerCase().includes(searchQuery) ||
           item.category.toLowerCase().includes(searchQuery);
  });

  if (redirectToFirst && results.length > 0) {
    const targetUrl = results[0].url + "?q=" + encodeURIComponent(query);
    window.location.href = targetUrl;
  }

  return results;
}

/**
 * Подсветка текста
 */
function highlightText(text, query) {
  if (!query) return text;
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return text.replace(regex, '<span class="search__results-item-title-highlight">$1</span>');
}

/**
 * Показать результаты автодополнения
 */
window.headerSearchAutocomplete = function(event, type) {
  try {
    const input = event.target;
    const query = input.value.trim();
    const resultsContainer = document.getElementById(`search-results-${type}`);
    
    if (!resultsContainer) {
      console.log('Контейнер результатов не найден:', `search-results-${type}`);
      return;
    }

    if (query.length < 2) {
      resultsContainer.classList.remove('active');
      resultsContainer.innerHTML = '';
      return;
    }

    const results = performSearch(query, false);
    
    if (results.length === 0) {
      resultsContainer.innerHTML = '<div class="search__results-empty">Ничего не найдено</div>';
      resultsContainer.classList.add('active');
      return;
    }

    const html = results.map((item, index) => `
      <a href="${item.url}?q=${encodeURIComponent(query)}" 
         class="search__results-item" 
         role="option" 
         aria-selected="${index === 0 ? 'true' : 'false'}"
         onclick="event.stopPropagation();">
        <div class="search__results-item-title">${highlightText(item.title, query)}</div>
        <div class="search__results-item-category">${item.category}</div>
      </a>
    `).join('');

    resultsContainer.innerHTML = html;
    resultsContainer.classList.add('active');

    // Закрытие при клике вне
    setTimeout(() => {
      const closeHandler = function(e) {
        if (!resultsContainer.contains(e.target) && e.target !== input && !input.contains(e.target)) {
          resultsContainer.classList.remove('active');
          document.removeEventListener('click', closeHandler);
        }
      };
      document.addEventListener('click', closeHandler);
    }, 100);
  } catch (error) {
    console.error('Ошибка в headerSearchAutocomplete:', error);
  }
};

/**
 * Глобальный обработчик для inline обработчиков в HTML
 */
window.headerSearchHandler = function(event, type) {
  try {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    
    const inputId = type === 'desktop' ? 'search-desktop' : 'search-mobile';
    const input = document.getElementById(inputId);
    
    if (!input) {
      console.error('Поле поиска не найдено:', inputId);
      return false;
    }

    const query = input.value.trim();
    if (query) {
      performSearch(query);
      
      // Закрываем мобильное поле поиска если это mobile
      if (type === 'mobile') {
        const searchBtn = document.querySelector("[data-search-button-mobile]");
        const searchField = document.querySelector("[data-search-field-mobile]");
        if (searchBtn && searchField) {
          searchField.classList.remove("active");
          searchBtn.classList.remove("active");
          setTimeout(() => {
            document.body.classList.remove("overlay");
          }, 100);
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error('Ошибка в headerSearchHandler:', error);
    return false;
  }
};

/**
 * Инициализация поиска
 */
function initHeaderSearch() {
  console.log('Инициализация поиска в header...');
  
  // Desktop поиск
  const desktopInput = document.getElementById("search-desktop");
  const desktopForm = desktopInput ? desktopInput.closest("form") : null;
  
  // Mobile поиск
  const mobileInput = document.getElementById("search-mobile");
  const mobileForm = mobileInput ? mobileInput.closest("form") : null;

  console.log('Desktop input:', desktopInput);
  console.log('Desktop form:', desktopForm);
  console.log('Mobile input:', mobileInput);
  console.log('Mobile form:', mobileForm);

  // Обработка desktop поиска
  if (desktopForm && desktopInput) {
    // Обработка отправки формы
    desktopForm.onsubmit = function(e) {
      return window.headerSearchHandler(e, 'desktop');
    };

    // Обработка кнопки
    const desktopButton = desktopForm.querySelector("button[type='submit']");
    if (desktopButton) {
      desktopButton.onclick = function(e) {
        return window.headerSearchHandler(e, 'desktop');
      };
    }

    // Обработка Enter
    desktopInput.onkeydown = function(e) {
      if (e.key === "Enter") {
        return window.headerSearchHandler(e, 'desktop');
      }
    };
  }

  // Обработка mobile поиска
  if (mobileForm && mobileInput) {
    // Обработка отправки формы
    mobileForm.onsubmit = function(e) {
      return window.headerSearchHandler(e, 'mobile');
    };

    // Обработка кнопки
    const mobileButton = mobileForm.querySelector("button[type='submit']");
    if (mobileButton) {
      mobileButton.onclick = function(e) {
        return window.headerSearchHandler(e, 'mobile');
      };
    }

    // Обработка Enter
    mobileInput.onkeydown = function(e) {
      if (e.key === "Enter") {
        return window.headerSearchHandler(e, 'mobile');
      }
    };
  }
}

// Инициализация
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderSearch);
} else {
  initHeaderSearch();
}

// Дополнительная инициализация с задержкой на случай конфликтов
setTimeout(initHeaderSearch, 500);
setTimeout(initHeaderSearch, 1000);

console.log('header-search.js загружен');
