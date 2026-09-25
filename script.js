(() => {
  "use strict";

  // ---- Config: número de WhatsApp del negocio ----
  const WHATSAPP_NUMBER = "56959887954"; // formato internacional sin '+'

  // ---- Config opcional de analítica de ads (dejar vacío hasta tener IDs reales) ----
  const GA4_MEASUREMENT_ID = ""; // ej: "G-XXXXXXXXXX"
  const META_PIXEL_ID = ""; // ej: "000000000000000"

  function loadGA4(id) {
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s1);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", id);
  }

  function loadMetaPixel(id) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", id);
    window.fbq("track", "PageView");
  }

  if (GA4_MEASUREMENT_ID) loadGA4(GA4_MEASUREMENT_ID);
  if (META_PIXEL_ID) loadMetaPixel(META_PIXEL_ID);

  function trackLead(label) {
    if (window.gtag) window.gtag("event", "generate_lead", { method: "whatsapp", content_name: label });
    if (window.fbq) window.fbq("track", "Lead", { content_name: label });
  }

  // ---- Enlaces de WhatsApp con mensaje precargado ----
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const msg = el.getAttribute("data-wa-msg") || "Hola 🌿 Quiero más información.";
    el.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
    el.addEventListener("click", () => trackLead(msg.slice(0, 60)));
  });

  // ---- Año en el footer ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Nav con fondo al hacer scroll ----
  const nav = document.getElementById("nav");
  const floatWa = document.getElementById("floatWa");
  const progressBar = document.getElementById("progressBar");

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle("is-scrolled", y > 40);
    floatWa.classList.toggle("is-visible", y > 400);

    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? (y / scrollable) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // ---- Cierra el menú / desplazamiento suave para navegadores sin scroll-behavior ----
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
})();
