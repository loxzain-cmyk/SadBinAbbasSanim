/* =========================================================
   SANIM PORTFOLIO
   ULTRA PRO MAX — INTERACTION ENGINE
========================================================= */

"use strict";


/* =========================================================
   GLOBAL STATE
========================================================= */

const state = {
  loaded: false,
  mouseX: window.innerWidth / 2,
  mouseY: window.innerHeight / 2,
  cursorX: window.innerWidth / 2,
  cursorY: window.innerHeight / 2
};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  document.body.classList.add("loading");

  initLoader();
  initNavbar();
  initMobileMenu();
  initSearch();
  initCursor();
  initMagneticElements();
  initScrollReveal();
  initParallax();
  initProjectCards();
  initSmoothAnchors();

});


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

  const loader = document.getElementById("loader");
  const percent = document.getElementById("loaderPercent");
  const line = document.querySelector(".loader-line span");

  if (!loader || !percent || !line) {
    finishLoading();
    return;
  }

  let value = 0;

  const timer = setInterval(() => {

    value += Math.floor(Math.random() * 7) + 2;

    if (value >= 100) {
      value = 100;
      clearInterval(timer);

      percent.textContent = "100%";
      line.style.width = "100%";

      setTimeout(() => {
        finishLoading();
      }, 550);

    } else {

      percent.textContent =
        String(value).padStart(2, "0") + "%";

      line.style.width = value + "%";

    }

  }, 55);
}


function finishLoading() {

  const loader = document.getElementById("loader");

  state.loaded = true;

  document.body.classList.remove("loading");
  document.body.classList.add("loaded");

  if (loader) {
    loader.classList.add("hide");

    setTimeout(() => {
      loader.remove();
    }, 1200);
  }
}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  const updateNavbar = () => {

    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

  };

  window.addEventListener("scroll", updateNavbar, {
    passive: true
  });

  updateNavbar();
}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("mobileMenu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {

    const open = menu.classList.toggle("open");

    toggle.classList.toggle("open", open);

    document.body.classList.toggle("loading", open);

  });


  menu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      menu.classList.remove("open");
      toggle.classList.remove("open");
      document.body.classList.remove("loading");

    });

  });

}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

  const trigger = document.getElementById("searchTrigger");
  const overlay = document.getElementById("searchOverlay");
  const close = document.getElementById("searchClose");
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  if (!trigger || !overlay || !input) return;


  const searchableContent = [

    {
      title: "Communication Research",
      category: "ACADEMIC",
      url: "academic.html"
    },

    {
      title: "Sports Talk",
      category: "ACADEMIC",
      url: "academic.html"
    },

    {
      title: "Civic Awareness",
      category: "ACADEMIC",
      url: "academic.html"
    },

    {
      title: "Organic Farming Practice",
      category: "ACADEMIC",
      url: "academic.html"
    },

    {
      title: "Early Sleeping Habits",
      category: "ACADEMIC",
      url: "academic.html"
    },

    {
      title: "From Decay to Renewal",
      category: "ACADEMIC",
      url: "academic.html"
    },

    {
      title: "Emergency Communication Plan",
      category: "ACADEMIC",
      url: "academic.html"
    },

    {
      title: "Transforming Public Service Delivery through ICT",
      category: "ACADEMIC",
      url: "academic.html"
    },

    {
      title: "The Familiar Stranger",
      category: "ACADEMIC",
      url: "academic.html"
    },

    {
      title: "Sports Reporter",
      category: "CURRENT WORK",
      url: "#home"
    },

    {
      title: "Internship",
      category: "EXPERIENCE",
      url: "internship.html"
    },

    {
      title: "Extracurricular",
      category: "MEDIA",
      url: "extracurricular.html"
    },

    {
      title: "Contact",
      category: "CONNECT",
      url: "contact.html"
    }

  ];


  function openSearch() {

    overlay.classList.add("open");

    setTimeout(() => {
      input.focus();
    }, 350);

  }


  function closeSearch() {

    overlay.classList.remove("open");
    input.value = "";

    if (results) {
      results.innerHTML = "";
    }

  }


  trigger.addEventListener("click", openSearch);

  close?.addEventListener("click", closeSearch);


  document.addEventListener("keydown", event => {

    if (event.key === "/" && document.activeElement !== input) {
      event.preventDefault();
      openSearch();
    }

    if (event.key === "Escape") {
      closeSearch();
    }

  });


  input.addEventListener("input", () => {

    const query = input.value
      .trim()
      .toLowerCase();

    if (!results) return;

    if (!query) {
      results.innerHTML = "";
      return;
    }


    const matches = searchableContent.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );


    if (!matches.length) {

      results.innerHTML = `
        <div class="search-result">
          <span>No results found</span>
          <small>TRY AGAIN</small>
        </div>
      `;

      return;
    }


    results.innerHTML = matches.map(item => `

      <a
        href="${item.url}"
        class="search-result magnetic"
      >

        <span>${item.title}</span>

        <small>${item.category} ↗</small>

      </a>

    `).join("");


    initMagneticElements(results);

  });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCursor() {

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const label = document.querySelector(".cursor-label");

  if (!dot || !ring) return;


  window.addEventListener("mousemove", event => {

    state.mouseX = event.clientX;
    state.mouseY = event.clientY;

  });


  function animateCursor() {

    state.cursorX +=
      (state.mouseX - state.cursorX) * .18;

    state.cursorY +=
      (state.mouseY - state.cursorY) * .18;


    dot.style.left = `${state.mouseX}px`;
    dot.style.top = `${state.mouseY}px`;

    ring.style.left = `${state.cursorX}px`;
    ring.style.top = `${state.cursorY}px`;

    if (label) {
      label.style.left = `${state.cursorX}px`;
      label.style.top = `${state.cursorY}px`;
    }


    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  const interactive = document.querySelectorAll(
    "a, button, input, .magnetic-card, .project-card, .principle-card"
  );


  interactive.forEach(element => {

    element.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-hover");
    });

    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-hover");
    });

  });


  document.querySelectorAll(
    ".project-card, .magnetic-card"
  ).forEach(element => {

    element.addEventListener("mouseenter", () => {
      document.body.classList.add("cursor-view");
    });

    element.addEventListener("mouseleave", () => {
      document.body.classList.remove("cursor-view");
    });

  });

}


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

function initMagneticElements(root = document) {

  const elements = root.querySelectorAll
    ? root.querySelectorAll(".magnetic")
    : [];


  elements.forEach(element => {

    if (element.dataset.magneticReady) return;

    element.dataset.magneticReady = "true";


    element.addEventListener("mousemove", event => {

      const rect = element.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;


      element.style.transform =
        `translate(${x * .18}px, ${y * .18}px)`;

    });


    element.addEventListener("mouseleave", () => {

      element.style.transform = "";

    });

  });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

  const elements = document.querySelectorAll(
    ".reveal-section, .reveal-text, .reveal-image"
  );

  if (!elements.length) return;


  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        observer.unobserve(entry.target);

      });

    },
    {
      threshold: .12,
      rootMargin: "0px 0px -80px 0px"
    }
  );


  elements.forEach(element => {
    observer.observe(element);
  });

}


/* =========================================================
   PARALLAX
========================================================= */

function initParallax() {

  const heroImage = document.querySelector(".hero-image img");
  const journalismImage =
    document.querySelector(".journalism-image img");
  const ulabImage =
    document.querySelector(".ulab-image img");

  let ticking = false;


  function updateParallax() {

    const scrollY = window.scrollY;


    if (heroImage) {

      const movement =
        Math.min(scrollY * .12, 100);

      heroImage.style.transform =
        `scale(1.08) translateY(${movement}px)`;

    }


    if (journalismImage) {

      const rect =
        journalismImage.getBoundingClientRect();

      if (
        rect.top < window.innerHeight &&
        rect.bottom > 0
      ) {

        const progress =
          (window.innerHeight - rect.top) /
          (window.innerHeight + rect.height);

        journalismImage.style.transform =
          `scale(1.08) translateY(${progress * 45 - 20}px)`;

      }

    }


    if (ulabImage) {

      const rect =
        ulabImage.getBoundingClientRect();

      if (
        rect.top < window.innerHeight &&
        rect.bottom > 0
      ) {

        const progress =
          (window.innerHeight - rect.top) /
          (window.innerHeight + rect.height);

        ulabImage.style.transform =
          `scale(1.08) translateY(${progress * 40 - 20}px)`;

      }

    }


    ticking = false;

  }


  window.addEventListener("scroll", () => {

    if (!ticking) {

      requestAnimationFrame(updateParallax);

      ticking = true;

    }

  }, {
    passive: true
  });


  updateParallax();

}


/* =========================================================
   PROJECT CARD TILT
========================================================= */

function initProjectCards() {

  const cards =
    document.querySelectorAll(".magnetic-card");


  cards.forEach(card => {

    card.addEventListener("mousemove", event => {

      if (window.innerWidth <= 800) return;


      const rect =
        card.getBoundingClientRect();


      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;


      const rotateY =
        ((x / rect.width) - .5) * 8;

      const rotateX =
        ((y / rect.height) - .5) * -8;


      card.style.transform =
        `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-5px)
        `;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

  });

}


/* =========================================================
   SMOOTH ANCHORS
========================================================= */

function initSmoothAnchors() {

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(anchor => {

    anchor.addEventListener("click", event => {

      const href =
        anchor.getAttribute("href");


      if (!href || href === "#") return;


      const target =
        document.querySelector(href);


      if (!target) return;


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

}


/* =========================================================
   MOUSE GLOW
========================================================= */

window.addEventListener("mousemove", event => {

  const glow =
    document.querySelector(".mouse-glow");

  if (!glow) return;


  glow.style.left =
    `${event.clientX}px`;

  glow.style.top =
    `${event.clientY}px`;

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

window.addEventListener("scroll", () => {

  const sections = [
    "home",
    "about",
    "academic"
  ];


  const scrollPosition =
    window.scrollY + window.innerHeight * .3;


  let active = "home";


  sections.forEach(id => {

    const section =
      document.getElementById(id);

    if (!section) return;


    if (
      scrollPosition >= section.offsetTop
    ) {
      active = id;
    }

  });


  document.querySelectorAll(".nav-link").forEach(link => {

    link.classList.remove("active");


    const href =
      link.getAttribute("href");


    if (
      href === `#${active}` ||
      (active === "home" && href === "#home")
    ) {
      link.classList.add("active");
    }

  });

});
