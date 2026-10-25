/* Page rendering, banner slider, navigation. Content comes from config.js; form logic is in form.js */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const sample = t => `<span class="todo">${t}</span>`;
const pic = (src, alt) => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" onerror="this.remove()">` : "";
const live = CONFIG.verified;
const tel = live ? `<a href="tel:${esc(CONFIG.phone.replace(/\s/g, ""))}">${esc(CONFIG.phone)}</a>` : `${esc(CONFIG.phone)} ${sample("Sample")}`;
const mail = live ? `<a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>` : `${esc(CONFIG.email)} ${sample("Sample")}`;

const LOGO = '<img src="/images/asp-logo-crop.png" alt="ASP Construction logo" width="116" height="58">';

const brand = `
  <a class="logo brand-combo" href="#home" aria-label="ASP Construction home">
    ${LOGO}
    <span class="brand-name">
      <strong>ASP CONSTRUCTION</strong>
    </span>
  </a>
`;
const sec = (id, cls, html) => `<section id="${id}" class="${cls}"><div class="wrap">${html}</div></section>`;

const hero = `<section id="home" class="hero" aria-roledescription="carousel" aria-label="Featured">${SLIDES.map((s, i) =>
  `<div class="slide${i ? "" : " on"}" role="group" aria-label="Slide ${i + 1} of ${SLIDES.length}"><div class="bg"${IMAGES.slides[i] ? ` style="--img:url('${esc(IMAGES.slides[i])}')"` : ""}></div><div class="wrap"><div class="k">${esc(s.k)}</div>${i ? `<h2 class="h1">` : "<h1>"}${esc(s.t)}${i ? "</h2>" : "</h1>"}<p>${esc(s.p)}</p><a class="btn" href="#${s.to}">${esc(s.b)}</a></div></div>`).join("")}
<div class="ctl"><div class="wrap">${SLIDES.map((_, i) => `<button class="dot" aria-label="Go to slide ${i + 1}"${i ? "" : " aria-current=true"}></button>`).join("")}<button class="arr" id="prev" aria-label="Previous slide">&#8249;</button><button class="arr" id="next" aria-label="Next slide">&#8250;</button></div></div></section>`;

const highlights = `<div class="hl"><div class="wrap grid">${HIGHLIGHTS.map(h => `<div class="card"><h3>${h[0]}</h3><p style="margin:0">${h[1]}</p></div>`).join("")}</div></div>`;

const about = sec("about", "", `<div class="split"><div><h2>About Us</h2><p> ASP Construction provides reliable, high-quality construction solutions for residential and commercial projects across Tamil Nadu and Bengaluru. We focus on quality, innovation, transparency, and customer satisfaction, building strong foundations and lasting relationships through professional construction services.

ISO 9001:2015 Certified | Quality Construction | Customer Satisfaction</p><ul class="tags"><li>Quality workmanship</li><li>Site safety</li><li>Transparency</li><li>Customer satisfaction</li></ul><a class="btn" href="#services" style="background:var(--ink);border-color:var(--ink);color:#fff">View Services</a></div><div class="ph">${pic(IMAGES.about, "Building under construction")}</div></div>`);

const services = sec("services", "alt", `<h2>Our Services</h2><p class="lead"><div class="grid">${SERVICES.map(s => `<article class="card k"><div class="ph">${pic(IMAGES.services[s.k], s.t)}</div><div class="body"><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p><ul>${s.p.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></article>`).join("")}</div>`);

const clients = CONFIG.testimonials.length ? sec("clients", "", `<h2>What Clients Say</h2><div class="grid">${CONFIG.testimonials.map(t => `<div class="card"><div class="body"><p>${esc(t.text)}</p><b>${esc(t.name)}</b>${t.role ? `<br><small>${esc(t.role)}</small>` : ""}</div></div>`).join("")}</div>`) : "";


const band = `<div class="cta"><div class="wrap"><h2>Ready to start your project?</h2><p>Tell us what you want to build and where. We’ll get back to you.</p>${live ? `<a class="tel" href="tel:${esc(CONFIG.phone.replace(/\s/g, ""))}">${esc(CONFIG.phone)}</a>` : `<span class="tel">${esc(CONFIG.phone)}</span>${sample("Sample number")}<br><br>`}<a class="btn" href="#contact">Contact Us</a></div></div>`;

const contact = sec("contact", "alt", `<h2>Request a Quote</h2><p class="lead">Tell us about your project and where it is.</p><form id="f" novalidate>
<div class="two"><div><label for="n">Full name</label><input id="n" autocomplete="name"><div class="er" id="e-n"></div></div><div><label for="p">Phone number</label><input id="p" type="tel" autocomplete="tel"><div class="er" id="e-p"></div></div></div>
<div><label for="m">Email address</label><input id="m" type="email" autocomplete="email"><div class="er" id="e-m"></div></div>
<div class="two"><div><label for="s">Service required</label><select id="s"><option value="">Select</option>${SERVICES.map(s => `<option>${esc(s.t)}</option>`).join("")}</select><div class="er" id="e-s"></div></div><div><label for="l">Preferred location</label><select id="l"><option value="">Select</option>${LOCS.map(l => `<option>${l.n}</option>`).join("")}</select><div class="er" id="e-l"></div></div></div>
<div class="two"><div><label for="y">Project type</label><select id="y"><option value="">Select</option>${TYPES.map(t => `<option>${t}</option>`).join("")}</select><div class="er" id="e-y"></div></div><div><label for="b">Estimated budget (optional)</label><input id="b"></div></div>
<div><label for="d">Expected start date (optional)</label><input id="d" type="date"></div>
<div><label for="t">Project description</label><textarea id="t" rows="5"></textarea><div class="er" id="e-t"></div></div>
<input id="hp" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px">
<div><button class="btn" id="go" type="submit">Request a Quote</button></div><div id="res" role="status" aria-live="polite"></div></form>`);


$("#app").innerHTML = hero + highlights + about + services + clients + band + contact;
$("#brand").innerHTML = brand;

$("#top").innerHTML = `
  <div class="wrap top-content">
      </div>
`;

$("#nav").innerHTML = NAV.map(n => `<a href="#${n[0]}" data-s="${n[0]}">${n[1]}</a>`).join("");

$("#foot").innerHTML = `
  <div class="footer-grid">

    <!-- Company -->
    <div class="footer-brand">
      <a class="logo" href="#home" aria-label="ASP Construction home">
        ${LOGO}
      </a>
      <p>Solid Foundations, Superior Construction.</p>
    </div>

    <!-- Quick Links -->
    <div class="footer-links">
      <h3>Quick Links</h3>
      ${NAV.map(n =>
        `<a href="#${n[0]}">${esc(n[1])}</a>`
      ).join("")}
    </div>

    <!-- Service Areas -->
    <div class="footer-areas">
      <h3>Service Areas</h3>
      ${LOCS.map(l =>
        `<span>${esc(l.n)}, ${esc(l.s)}</span>`
      ).join("")}
    </div>

    <!-- Contact -->
    <div class="footer-contact">
      <h3>Contact Us</h3>
      ${live ? `
        <a href="tel:${esc(CONFIG.phone.replace(/\\s/g, ""))}">
          <span class="footer-icon">☎</span>
          <span>${esc(CONFIG.phone)}</span>
        </a>
        <a href="mailto:${esc(CONFIG.email)}">
          <span class="footer-icon">✉</span>
          <span>${esc(CONFIG.email)}</span>
        </a>
        <p><span class="footer-icon">⌖</span>
          ${esc(CONFIG.address)}
        </p>
      ` : `
        <p>Contact details will be updated soon.</p>
      `}
    </div>

  </div>

  <div class="footer-bottom">
    <p>© ${new Date().getFullYear()} ASP Construction.
       All Rights Reserved.</p>
    <a href="#home">Back to Top ↑</a>
  </div>
`;

/* Floating Call and WhatsApp buttons */
if (live) {
  const phone = CONFIG.phone.replace(/\D/g, "");

  $("#float").innerHTML = `
    <a href="tel:+${phone}" class="float-btn call-btn"
       aria-label="Call ASP Construction" title="Call Us">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor"
          d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2
          a1 1 0 0 1 1.02-.24c1.12.37 2.33.56 3.57.56
          a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39
          3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1
          c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z"/>
      </svg>
    </a>

    <a href="https://wa.me/${phone}" target="_blank"
       rel="noopener noreferrer"
       class="float-btn whatsapp-btn"
       aria-label="Chat on WhatsApp" title="WhatsApp Us">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor"
          d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0
          C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7
          a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3
          11.8-11.8 0-3.2-1.3-6.1-3.5-8.3ZM12.1 21.6
          c-1.7 0-3.3-.5-4.7-1.3l-.3-.2-3.9 1 1-3.8-.2-.4
          a9.7 9.7 0 1 1 8.1 4.7Zm5.3-7.3c-.3-.2-1.8-.9-2.1-1
          -.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1
          -.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1
          -.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2
          0-.4 0-.6s-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6
          c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1
          3 1.3 3.2c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5
          1.8.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7
          2-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.3Z"/>
      </svg>
    </a>
  `;
}

/* banner slider */
const slides = [...document.querySelectorAll(".slide")], dots = [...document.querySelectorAll(".dot")];
let cur = 0, timer;
const go = i => { cur = (i + slides.length) % slides.length; slides.forEach((s, j) => s.classList.toggle("on", j === cur)); dots.forEach((d, j) => j === cur ? d.setAttribute("aria-current", "true") : d.removeAttribute("aria-current")); };
const play = () => { clearInterval(timer); if (!matchMedia("(prefers-reduced-motion:reduce)").matches) timer = setInterval(() => go(cur + 1), 6500); };
dots.forEach((d, i) => d.onclick = () => { go(i); play(); });
$("#prev").onclick = () => { go(cur - 1); play(); }; $("#next").onclick = () => { go(cur + 1); play(); };
const heroEl = $("#home"); heroEl.onmouseenter = heroEl.onfocusin = () => clearInterval(timer); heroEl.onmouseleave = heroEl.onfocusout = play; play();

/* navigation: mobile menu, active section, location prefill */
const nav = $("#nav");
nav.addEventListener("click", () => { nav.classList.remove("open"); $("#menu").setAttribute("aria-expanded", "false"); });
$("#menu").onclick = () => { const o = nav.classList.toggle("open"); $("#menu").setAttribute("aria-expanded", o); };
document.addEventListener("click", e => { const a = e.target.closest("[data-loc]"); if (a) $("#l").value = a.dataset.loc; });
const links = [...nav.querySelectorAll("a")];
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.dataset.s === e.target.id ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")); }), { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section").forEach(s => io.observe(s));
