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
      `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`,
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

function renderMovieResults(movies) {
  if (!Array.isArray(movies) || movies.length === 0) {
    displaySearchPlaceholder();
    return;
  }

  const moviesCardsHTML = movies
    .map(
      (movie, index) => `
        <div 
          class="movie-card" 
          data-imdbid="${movie.imdbID}" 
          style="animation-delay: ${index * 0.05}s"
        >
          <div class="poster-container">
            ${
              movie.Poster && movie.Poster !== "N/A"
                ? `<img src="${movie.Poster}" alt="${movie.Title}" class="poster-img" loading="lazy">`
                : `<div class="no-poster">🎬</div>`
            }
          </div>
          <div class="movie-info">
            <h3 class="movie-title">${movie.Title}</h3>
            <div class="movie-meta">
              <span class="movie-year">${movie.Year}</span>
              <span class="movie-type">${movie.Type}</span>
            </div>
          </div>
          <div class="movie-details hidden"></div>
        </div>
      `
    )
    .join("");

  searchFeedbackMessage.innerHTML = `<div class="movies-grid">${moviesCardsHTML}</div>`;

  initializeMovieCardInteractions();
}

function initializeMovieCardInteractions() {
  const moviesGrid = document.querySelector(".movies-grid");
  if (!moviesGrid) return;

  moviesGrid.addEventListener("mouseenter", handleHover, true);
  moviesGrid.addEventListener("mouseleave", handleHover, true);
  moviesGrid.addEventListener("touchstart", handleTouch, true);

  async function handleHover(event) {
    const card = event.target.closest(".movie-card");
    if (!card) return;

    const details = card.querySelector(".movie-details");

    if (event.type === "mouseenter" && details.classList.contains("hidden")) {
      await fetchMovieDetails(card, details);
    } else if (event.type === "mouseleave") {
      hideMovieDetails(card, details);
    }
  }

  function handleTouch(event) {
    const card = event.target.closest(".movie-card");
    if (!card) return;

    const details = card.querySelector(".movie-details");
    event.stopPropagation();

    if (details.classList.contains("hidden")) {
      fetchMovieDetails(card, details);
    } else {
      hideMovieDetails(card, details);
    }
  }
}

async function fetchMovieDetails(card, detailsContainer) {
  const imdbID = card.dataset.imdbid;

  try {
    const response = await fetch(
      `${API_BASE_URL}?apikey=${API_KEY}&i=${imdbID}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      detailsContainer.innerHTML = `
        <p><strong>Genre:</strong> ${data.Genre || "N/A"}</p>
        <p><strong>Director:</strong> ${data.Director || "N/A"}</p>
        <p><strong>Plot:</strong> ${data.Plot || "N/A"}</p>
        <p><strong>IMDb:</strong> ⭐ ${data.imdbRating || "N/A"}</p>
      `;
      detailsContainer.classList.remove("hidden");
      card.classList.add("expanded");
    }
  } catch (err) {
    console.error("Erro ao buscar detalhes:", err);
  }
}

function hideMovieDetails(card, detailsContainer) {
  detailsContainer.classList.add("hidden");
  card.classList.remove("expanded");
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

searchInputField.addEventListener(
  "input",
  debounce((e) => {
    const value = e.target.value.trim();

    if (value) {
      clearSearchButton.classList.add("visible");
      handleMovieSearch(value);
    } else {
      clearSearchButton.classList.remove("visible");
      displaySearchPlaceholder();
    }
  }, 500)
);

clearSearchButton.addEventListener("click", () => {
  searchInputField.value = "";
  clearSearchButton.classList.remove("visible");
  searchInputField.focus();
  displaySearchPlaceholder();
});

displaySearchPlaceholder();
