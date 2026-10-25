/* enhance.js: loads AFTER main.js and form.js. Adds the services carousel, scroll animations and swipe on the banner. */
(() => {
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* 1. Services: turn the grid into a swipeable carousel */
  const g = document.querySelector("#services .grid");
  if (g) {
    const cards = [...g.children];
    const box = document.createElement("div");
    box.className = "cwrap rv";
    g.parentNode.insertBefore(box, g);
    box.appendChild(g);
    g.classList.add("carousel");
    g.tabIndex = 0;
    g.setAttribute("role", "region");
    g.setAttribute("aria-roledescription", "carousel");
    g.setAttribute("aria-label", "Services");
    box.insertAdjacentHTML("beforebegin", '<p class="hint">Swipe to see more services &rarr;</p>');
    box.insertAdjacentHTML("beforeend", '<button class="cbtn prev" aria-label="Previous service">&#8249;</button><button class="cbtn next" aria-label="Next service">&#8250;</button><div class="cdots"></div>');
    const prev = box.querySelector(".prev"), next = box.querySelector(".next"), dots = box.querySelector(".cdots");
    const step = () => (cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : g.clientWidth);
    const go = i => g.scrollTo({ left: Math.max(0, Math.min(i, cards.length - 1)) * step(), behavior: reduce ? "auto" : "smooth" });
    cards.forEach((_, i) => { const b = document.createElement("button"); b.setAttribute("aria-label", "Go to service " + (i + 1)); b.onclick = () => go(i); dots.appendChild(b); });
    const update = () => {
      const atEnd = g.scrollLeft + g.clientWidth >= g.scrollWidth - 4;
      const i = atEnd ? cards.length - 1 : Math.round(g.scrollLeft / step());
      [...dots.children].forEach((d, j) => j === i ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current"));
      prev.disabled = g.scrollLeft < 4; next.disabled = atEnd;
    };
    prev.onclick = () => go(Math.round(g.scrollLeft / step()) - 1);
    next.onclick = () => go(Math.round(g.scrollLeft / step()) + 1);
    g.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    g.addEventListener("keydown", e => { if (e.key === "ArrowRight") { e.preventDefault(); next.click(); } if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); } });
    addEventListener("resize", update); update();
  }

  /* 2. Reveal-on-scroll animation */
  const targets = document.querySelectorAll("main section:not(.hero) h2,.lead,.hint,.cwrap,.hl .card,.split>*,.tags li,#locations .card,#contact form,.cta .wrap>*,footer .grid>*");
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in"); io.unobserve(e.target);
    setTimeout(() => e.target.style.setProperty("--d", "0s"), 1400);
  }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  targets.forEach(el => {
    const i = [...el.parentNode.children].indexOf(el);
    el.style.setProperty("--d", Math.min(i, 5) * 0.09 + "s");
    el.classList.add("rv"); io.observe(el);
  });

  /* 3. Scroll progress bar + shrinking header */
  const bar = Object.assign(document.createElement("div"), { className: "prog" });
  document.body.appendChild(bar);
  const hd = document.querySelector("header");
  let tick = false;
  addEventListener("scroll", () => {
    if (tick) return; tick = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
      hd.classList.toggle("scrolled", scrollY > 40);
      tick = false;
    });
  }, { passive: true });

  /* 4. Swipe left/right on the banner slides */
  const hero = document.querySelector("#home");
  let x0 = null;
  hero.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) document.querySelector(dx < 0 ? "#next" : "#prev")?.click();
  }, { passive: true });
})();
