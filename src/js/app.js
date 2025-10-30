const API_KEY = "342aa484";
const API_BASE_URL = "https://www.omdbapi.com/";

const searchInputField = document.getElementById("searchInput");
const clearSearchButton = document.getElementById("clearSearchButton");
const searchFeedbackMessage = document.getElementById(
  "searchContainerFeedbackMessage"
);

let debounceTimer;
let currentRequest = null;

function debounce(func, delay) {
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}

async function handleMovieSearch(query) {
  if (!query || query.trim().length < 2) {
    displaySearchPlaceholder();
    return;
  }

  if (currentRequest) currentRequest.abort();

  const controller = new AbortController();
  currentRequest = controller;

  try {
    const response = await fetch(
      `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
      { signal: controller.signal }
    );

    const data = await response.json();

    if (data.Response === "True") {
    } else {
      console.log(data.Error);
    }
  } catch (error) {
  } finally {
    currentRequest = null;
  }
}

function displaySearchPlaceholder() {
  searchFeedbackMessage.innerHTML = `
        <div class="search-feedback--container">
            <div class="search-feedback__icon">🎥</div>
            <h2>Inicie sua pesquisa</h2>
            <p>Digite o nome de um filme ou série para começar</p>
        </div>
    `;
}

displaySearchPlaceholder();
