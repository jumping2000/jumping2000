(() => {
  "use strict";

  const OWNER = "jumping2000";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Project filters
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const projectCards = [...document.querySelectorAll(".project-card")];
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach((card) => {
        card.hidden = selected !== "all" && card.dataset.category !== selected;
      });
    });
  });

  // Live public GitHub profile / repository counters; static fallback values remain visible.
  const status = document.getElementById("stats-status");
  const updateGitHubStats = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${OWNER}`, {
        headers: { Accept: "application/vnd.github+json" },
        cache: "no-store"
      });
      if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
      const profile = await response.json();
      const count = document.getElementById("repo-count");
      if (Number.isFinite(profile.public_repos)) count.textContent = profile.public_repos.toLocaleString("it-IT");
      status.textContent = "AGGIORNATI";
      status.setAttribute("title", "Dati letti dal profilo pubblico GitHub");
    } catch (_error) {
      status.textContent = "DATI STATICI";
      status.setAttribute("title", "API GitHub non disponibile: mostro i valori di fallback");
    }

    const repoNames = ["universal_notifier", "ha-packages", "ha-templates"];
    await Promise.all(repoNames.map(async (name) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${OWNER}/${name}`, {
          headers: { Accept: "application/vnd.github+json" },
          cache: "no-store"
        });
        if (!response.ok) return;
        const repo = await response.json();
        const star = document.querySelector(`[data-repo-stat="${name}"]`);
        if (star && Number.isFinite(repo.stargazers_count)) star.textContent = repo.stargazers_count.toLocaleString("it-IT");
      } catch (_error) {
        // Keep the last known public count in the HTML if the API is unavailable.
      }
    }));
  };
  updateGitHubStats();

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Lightweight Matrix-inspired background. Disabled for reduced-motion users.
  const canvas = document.getElementById("matrix-rain");
  if (!canvas || reduceMotion) return;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  const glyphs = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ";
  let columns = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let animationId = 0;
  const fontSize = 14;
  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.font = `${fontSize}px "IBM Plex Mono", monospace`;
    columns = Array.from({ length: Math.ceil(width / fontSize) }, () => Math.random() * (height / fontSize));
  };
  const drawFrame = () => {
    context.fillStyle = "rgba(5, 9, 7, 0.075)";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "rgba(75, 210, 117, 0.58)";
    context.font = `${fontSize}px "IBM Plex Mono", monospace`;
    columns.forEach((position, index) => {
      const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
      context.fillText(glyph, index * fontSize, position * fontSize);
      if (position * fontSize > height && Math.random() > 0.979) columns[index] = 0;
      else columns[index] += 0.42 + Math.random() * 0.24;
    });
  };
  const loop = () => {
    frame += 1;
    // Render every other animation frame to keep the effect subtle and inexpensive.
    if (frame % 2 === 0) drawFrame();
    animationId = window.requestAnimationFrame(loop);
  };
  resize();
  animationId = window.requestAnimationFrame(loop);
  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) window.cancelAnimationFrame(animationId);
    else animationId = window.requestAnimationFrame(loop);
  });

})();
