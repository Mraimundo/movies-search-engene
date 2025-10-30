document.addEventListener("DOMContentLoaded", () => {
  const testUnitOutput = document.getElementById("testUnitOutput");
  const searchMoviesFeedbackMessage = document.getElementById(
    "searchMoviesContainerFeedbackMessage"
  );

  function logTest(msg, css = "") {
    const lineTest = document.createElement("div");
    lineTest.className = css;
    lineTest.textContent = msg;
    testUnitOutput.appendChild(lineTest);
  }

  function it(name, fn) {
    try {
      const maybeResultPromise = fn();
      if (maybeResultPromise instanceof Promise) {
        maybeResultPromise
          .then(() => logTest(`✅ ${name}`, "pass"))
          .catch((event) =>
            logTest(`❌ ${name}\n   → ${event.message}`, "fail")
          );
      } else {
        logTest(`✅ ${name}`, "pass");
      }
    } catch (event) {
      logTest(`❌ ${name}\n   → ${event.message}`, "fail");
    }
  }

  function expect(obtained) {
    return {
      toBe(expected) {
        if (obtained !== expected)
          throw new Error(`Expected ${expected}, got ${obtained}`);
      },
      toBeTruthy() {
        if (!obtained) throw new Error(`Expected truthy, got ${obtained}`);
      },
      toBeFalsy() {
        if (obtained) throw new Error(`Expected falsy, got ${obtained}`);
      },
      toEqual(expected) {
        const r = JSON.stringify(obtained);
        const s = JSON.stringify(expected);
        if (r !== s) throw new Error(`Expected ${s}, got ${r}`);
      },
      toInclude(text) {
        if (!String(obtained).includes(text))
          throw new Error(`Expected text to include "${text}"`);
      },
    };
  }

  globalThis.fetch = async (url) => {
    if (url.includes("&i=")) {
      return {
        json: async () => ({
          Response: "True",
          Genre: "Action",
          Director: "Leonardo Dicarpio",
          Plot: "Dreams inside dreams.",
          imdbRating: "8.0",
        }),
      };
    }

    return {
      json: async () => ({
        Response: "True",
        Search: [
          {
            Title: "A era de Inception",
            Year: "2012",
            Type: "movie",
            imdbID: "tt1398644",
            Poster: "N/A",
          },
        ],
      }),
    };
  };

  it("should render error message in DOM", () => {
    renderSearchMoviesErrorMessage("Network Error");
    expect(searchMoviesFeedbackMessage.innerHTML).toInclude("Network Error");
  });

  it("should display the search results", () => {
    displaySearchPlaceholder();
    expect(searchMoviesFeedbackMessage.innerHTML).toInclude(
      "Inicie sua pesquisa"
    );
  });

  it("should populate the movie and series details and expand the card", async () => {
    const card = document.createElement("div");
    card.dataset.imdbid = "tt1398644";
    const details = document.createElement("div");
    details.classList.add("hidden");
    card.appendChild(details);

    await fetchMovieAndSerieDetails(card, details);
    expect(details.innerHTML).toInclude("Genre:");
    expect(card.classList.contains("expanded")).toBeTruthy();
  });

  it("should be possible to hide details and retrieve the card", () => {
    const card = document.createElement("div");
    card.classList.add("expanded");
    const details = document.createElement("div");
    details.classList.remove("hidden");

    hideMovieAndSerieDetails(card, details);
    expect(details.classList.contains("hidden")).toBeTruthy();
    expect(card.classList.contains("expanded")).toBeFalsy();
  });
});
