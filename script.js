const tools = [
  { name: "Word & Character Counter", cat: "text", icon: "T", color: "#267cff", desc: "Count words, characters, sentences and paragraphs instantly.", file: "tools/word-counter.html" },
  { name: "Aspect Ratio Calculator", cat: "calculator", icon: "[]", color: "#783cff", desc: "Find the right aspect ratio for videos, images and social media.", file: "tools/aspect-ratio.html" },
  { name: "YouTube Title Checker", cat: "youtube", icon: "▶", color: "#ff304f", desc: "Check title length and get quick SEO-friendly guidance.", file: "tools/title-checker.html" },
  { name: "Hashtag Counter", cat: "social", icon: "#", color: "#16b887", desc: "Count hashtags and clean repeated tags quickly.", file: "tools/hashtag-counter.html" },
  { name: "Video Bitrate Calculator", cat: "video", icon: "▣", color: "#ff7b17", desc: "Estimate a practical bitrate for quality and file size.", file: "tools/bitrate.html" },
  { name: "Image Resizer", cat: "image", icon: "↗", color: "#12c6c4", desc: "Resize images to any pixel dimension in your browser.", file: "tools/image-resizer.html" },
  { name: "Image Compressor", cat: "image", icon: "▤", color: "#f12b91", desc: "Compress images locally without uploading them to a server.", file: "tools/image-compressor.html" },
  { name: "More Tools Coming Soon", cat: "other", icon: "⚙", color: "#765cff", desc: "More useful tools for creators are on the way.", file: "#" }
];

const grid = document.getElementById("toolGrid");
const empty = document.getElementById("emptyState");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function render(filter = "all", query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  grid.innerHTML = "";

  const list = tools.filter((tool) => {
    const matchesFilter = filter === "all" || tool.cat === filter;
    const matchesQuery =
      !normalizedQuery ||
      tool.name.toLowerCase().includes(normalizedQuery) ||
      tool.desc.toLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesQuery;
  });

  if (!list.length) {
    empty.hidden = false;
    return;
  }

  empty.hidden = true;

  list.forEach((tool) => {
    const card = document.createElement("a");
    card.href = tool.file === "#" ? "#" : tool.file;
    card.className = "tool-card";
    card.setAttribute("aria-label", tool.name);
    card.style.setProperty("--card-color", tool.color);
    card.innerHTML = `
      <div class="tool-icon" style="background:${tool.color}22;color:${tool.color};">${tool.icon}</div>
      <h3>${tool.name}</h3>
      <p>${tool.desc}</p>
    `;
    grid.appendChild(card);
  });
}

function activeFilter() {
  return document.querySelector(".cat.active")?.dataset.filter || "all";
}

render();

document.querySelectorAll(".cat").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".cat").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    render(button.dataset.filter, document.getElementById("searchInput").value);
  });
});

let searchTimeout = null;
document.getElementById("searchInput").addEventListener("input", (event) => {
  const value = event.target.value;
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => render(activeFilter(), value), 120);
});

document.getElementById("searchBtn").addEventListener("click", () => {
  document.getElementById("tools").scrollIntoView({ behavior: "smooth" });
});

const themeBtn = document.getElementById("themeBtn");
const applyTheme = () => {
  const isLight = document.body.classList.contains("light");
  themeBtn.textContent = isLight ? "☀" : "☾";
  localStorage.setItem("creator-theme", isLight ? "light" : "dark");
};

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  applyTheme();
});

if (localStorage.getItem("creator-theme") === "light") {
  document.body.classList.add("light");
}
applyTheme();

document.getElementById("menuBtn")?.addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  const opened = nav.dataset.opened === "1";
  nav.dataset.opened = opened ? "0" : "1";
  nav.style.display = opened ? "none" : "flex";
});

(() => {
  const nav = document.querySelector(".navbar");
  const updateNav = () => nav?.classList.toggle("scrolled", window.scrollY > 18);

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  if (prefersReducedMotion.matches || !window.matchMedia("(pointer:fine)").matches) {
    return;
  }

  const cards = document.querySelectorAll(".hero,.tool-card,.cta,.tool-box,.panel,.control-box,.preview-box");

  cards.forEach((card) => {
    let animationFrame = null;

    const updateGlow = (event) => {
      if (animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100;
        const y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100;

        card.style.setProperty("--mx", `${x}%`);
        card.style.setProperty("--my", `${y}%`);
        animationFrame = null;
      });
    };

    card.addEventListener("pointermove", updateGlow, { passive: true });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "35%");
    }, { passive: true });
  });
})();
