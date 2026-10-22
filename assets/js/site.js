const filterButtons = document.querySelectorAll("[data-filter]");
const tagButtons = document.querySelectorAll("[data-tag-filter]");
const postCards = document.querySelectorAll(".post-list .post-card[data-tags]");
const publicationCards = document.querySelectorAll(".publication-card[data-year]");
const awardItems = document.querySelectorAll(".award-list li[data-award]");
const languageToggle = document.querySelector("[data-language-toggle]");

const yearPalettes = [
  { bg: "#4f87b3", fg: "#ffffff", border: "#4f87b3" },
  { bg: "#d9ecfa", fg: "#214d6f", border: "#b8d8ef" },
  { bg: "#e9f3df", fg: "#3f6337", border: "#c9e2b9" },
  { bg: "#fff0cf", fg: "#755313", border: "#f0d698" },
  { bg: "#f3e6f7", fg: "#684477", border: "#dfc4e8" },
  { bg: "#e5f4f2", fg: "#2e6964", border: "#bfe0dc" },
  { bg: "#f9e7e2", fg: "#7b4938", border: "#efcabe" },
  { bg: "#edf0f7", fg: "#48587e", border: "#d1d9ee" }
];

const venuePalettes = [
  { bg: "#f3f9fd", border: "#cfe5f5" },
  { bg: "#f7fbf0", border: "#d7eac5" },
  { bg: "#fff8ea", border: "#efd9a9" },
  { bg: "#f8f2fb", border: "#dfcdea" },
  { bg: "#f1faf8", border: "#c9e6e1" },
  { bg: "#fff3ef", border: "#efcfc4" },
  { bg: "#f4f6fb", border: "#d6ddec" },
  { bg: "#f8fbf7", border: "#d9e7d4" },
  { bg: "#fdf4f8", border: "#ebccda" },
  { bg: "#eff8ff", border: "#c9e1f5" }
];

const awardPalettes = {
  award: { bg: "#fff5d9", border: "#edd28e" },
  fellowship: { bg: "#eef7ff", border: "#c8e0f4" },
  scholarship: { bg: "#f3f8e9", border: "#d8e9ba" },
  default: { bg: "#f7f9fb", border: "#dce6ee" }
};

const hashString = (value = "") => {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
};

const classifyAward = (award = "") => {
  const text = award.toLowerCase();
  if (text.includes("scholarship")) return "scholarship";
  if (text.includes("fellow")) return "fellowship";
  if (text.includes("award") || text.includes("best") || text.includes("honorable")) return "award";
  return "default";
};

const applyPublicationColors = () => {
  const yearButtons = [...document.querySelectorAll("[data-year-filter]")];
  yearButtons.forEach((button, index) => {
    const palette = yearPalettes[index % yearPalettes.length];
    button.style.setProperty("--year-bg", palette.bg);
    button.style.setProperty("--year-fg", palette.fg);
    button.style.setProperty("--year-border", palette.border);
  });

  publicationCards.forEach((card) => {
    const venue = card.dataset.venue || "Publication";
    const palette = venuePalettes[hashString(venue) % venuePalettes.length];
    card.style.setProperty("--publication-bg", palette.bg);
    card.style.setProperty("--publication-border", palette.border);
  });
};

const applyAwardColors = () => {
  awardItems.forEach((item) => {
    const awardType = classifyAward(item.dataset.award || item.textContent);
    const palette = awardPalettes[awardType] || awardPalettes.default;
    item.dataset.awardType = awardType;
    item.style.setProperty("--award-bg", palette.bg);
    item.style.setProperty("--award-border", palette.border);
  });
};

const applyLanguage = (language) => {
  const normalizedLanguage = language === "zh" ? "zh" : "en";
  document.documentElement.lang = normalizedLanguage;
  if (languageToggle) {
    languageToggle.textContent = normalizedLanguage === "zh" ? "EN" : "中文";
    languageToggle.setAttribute(
      "aria-label",
      normalizedLanguage === "zh" ? "Switch to English" : "Switch to Chinese"
    );
  }
};

const savedLanguage = localStorage.getItem("siteLanguage") || "en";
applyLanguage(savedLanguage);
applyPublicationColors();
applyAwardColors();

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    const nextLanguage = document.documentElement.lang === "zh" ? "en" : "zh";
    localStorage.setItem("siteLanguage", nextLanguage);
    applyLanguage(nextLanguage);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    publicationCards.forEach((card) => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.year !== filter);
    });
  });
});

const applyTagFilter = (tag) => {
  const activeTag = [...tagButtons].some((button) => button.dataset.tagFilter === tag) ? tag : "all";
  tagButtons.forEach((button) => button.classList.toggle("active", button.dataset.tagFilter === activeTag));
  postCards.forEach((card) => {
    const tags = (card.dataset.tags || "").split("|");
    card.classList.toggle("hidden", activeTag !== "all" && !tags.includes(activeTag));
  });
};

if (tagButtons.length > 0) {
  const tagFromHash = () => decodeURIComponent(location.hash.slice(1)) || "all";
  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tag = button.dataset.tagFilter;
      history.replaceState(null, "", tag === "all" ? location.pathname : `#${encodeURIComponent(tag)}`);
      applyTagFilter(tag);
    });
  });
  window.addEventListener("hashchange", () => applyTagFilter(tagFromHash()));
  applyTagFilter(tagFromHash());
}
