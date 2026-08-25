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
  cursorY: window.innerHeight / 2,

  scrollY: 0,

  mobileMenuOpen: false,
  searchOpen: false

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
  initActiveNavigation();
  initMouseGlow();
  initKeyboardShortcuts();
  initImageLoadProtection();

});


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

  const loader =
    document.getElementById("loader");

  const percent =
    document.getElementById("loaderPercent");

  const line =
    document.querySelector(".loader-line span");


  if (!loader || !percent || !line) {

    finishLoading();

    return;

  }


  let value = 0;


  const timer = setInterval(() => {

    const increment =
      Math.floor(Math.random() * 8) + 2;

    value += increment;


    if (value >= 100) {

      value = 100;

      clearInterval(timer);

      percent.textContent = "100%";

      line.style.width = "100%";


      setTimeout(() => {

        finishLoading();

      }, 450);


    } else {

      percent.textContent =
        String(value).padStart(2, "0") + "%";

      line.style.width =
        value + "%";

    }

  }, 55);

}


function finishLoading() {

  if (state.loaded) return;

  const loader =
    document.getElementById("loader");


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

  const navbar =
    document.getElementById("navbar");


  if (!navbar) return;


  function updateNavbar() {

    if (window.scrollY > 60) {

      navbar.classList.add("scrolled");

    } else {

      navbar.classList.remove("scrolled");

    }

  }


  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );


  updateNavbar();

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

  const toggle =
    document.getElementById("menuToggle");

  const menu =
    document.getElementById("mobileMenu");


  if (!toggle || !menu) return;


  function setMenu(open) {

    state.mobileMenuOpen = open;

    menu.classList.toggle("open", open);

    toggle.classList.toggle("open", open);

    document.body.classList.toggle("loading", open);

    toggle.setAttribute(
      "aria-expanded",
      String(open)
    );

  }


  toggle.addEventListener("click", () => {

    setMenu(!state.mobileMenuOpen);

  });


  menu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      setMenu(false);

    });

  });


  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 900 &&
      state.mobileMenuOpen
    ) {

      setMenu(false);

    }

  });

}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

  const trigger =
    document.getElementById("searchTrigger");

  const overlay =
    document.getElementById("searchOverlay");

  const close =
    document.getElementById("searchClose");

  const input =
    document.getElementById("searchInput");

  const results =
    document.getElementById("searchResults");


  if (!trigger || !overlay || !input) return;


  const searchableContent = [

    {
      title: "Communication Research",
      category: "RESEARCH",
      url: "academic.html"
    },

    {
      title: "Sports Talk",
      category: "SPORTS MEDIA",
      url: "academic.html"
    },

    {
      title: "Civic Awareness",
      category: "SOCIAL",
      url: "academic.html"
    },

    {
      title: "Organic Farming Practice",
      category: "FIELD STUDY",
      url: "academic.html"
    },

    {
      title: "Early Sleeping Habits",
      category: "BEHAVIOR",
      url: "academic.html"
    },

    {
      title: "From Decay to Renewal",
      category: "CREATIVE",
      url: "academic.html"
    },

    {
      title: "Emergency Communication Plan",
      category: "COMMUNICATION",
      url: "academic.html"
    },

    {
      title:
        "Transforming Public Service Delivery through ICT",
      category: "ICT / COMMUNICATION",
      url: "academic.html"
    },

    {
      title: "The Familiar Stranger",
      category: "RESEARCH",
      url: "academic.html"
    },

    {
      title: "Sports Reporter",
      category: "CURRENT WORK",
      url: "#work"
    },

    {
      title: "Internship",
      category: "EXPERIENCE",
      url: "experience.html"
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

    state.searchOpen = true;

    overlay.classList.add("open");

    document.body.classList.add("loading");


    setTimeout(() => {

      input.focus();

    }, 350);

  }


  function closeSearch() {

    state.searchOpen = false;

    overlay.classList.remove("open");

    document.body.classList.remove("loading");

    input.value = "";


    if (results) {

      results.innerHTML = "";

    }

  }


  trigger.addEventListener(
    "click",
    openSearch
  );


  close?.addEventListener(
    "click",
    closeSearch
  );


  overlay.addEventListener("click", event => {

    if (event.target === overlay) {

      closeSearch();

    }

  });


  input.addEventListener("input", () => {

    const query =
      input.value.trim().toLowerCase();


    if (!results) return;


    if (!query) {

      results.innerHTML = "";

      return;

    }


    const matches =
      searchableContent.filter(item => {

        return (
          item.title
            .toLowerCase()
            .includes(query) ||

          item.category
            .toLowerCase()
            .includes(query)
        );

      });


    if (!matches.length) {

      results.innerHTML = `

        <div class="search-result">

          <span>
            No results found
          </span>

          <small>
            TRY AGAIN
          </small>

        </div>

      `;

      return;

    }


    results.innerHTML =
      matches.map(item => `

        <a
          href="${item.url}"
          class="search-result magnetic"
        >

          <span>
            ${item.title}
          </span>

          <small>
            ${item.category} ↗
          </small>

        </a>

      `).join("");


    initMagneticElements(results);


    results
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener("click", () => {

          closeSearch();

        });

      });

  });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCursor() {

  if (window.matchMedia("(pointer: coarse)").matches) {
    return;
  }


  const dot =
    document.querySelector(".cursor-dot");

  const ring =
    document.querySelector(".cursor-ring");

  const label =
    document.querySelector(".cursor-label");


  if (!dot || !ring) return;


  window.addEventListener(
    "mousemove",
    event => {

      state.mouseX =
        event.clientX;

      state.mouseY =
        event.clientY;

    },
    { passive: true }
  );


  function animateCursor() {

    state.cursorX +=
      (state.mouseX - state.cursorX) * .18;

    state.cursorY +=
      (state.mouseY - state.cursorY) * .18;


    dot.style.left =
      `${state.mouseX}px`;

    dot.style.top =
      `${state.mouseY}px`;


    ring.style.left =
      `${state.cursorX}px`;

    ring.style.top =
      `${state.cursorY}px`;


    if (label) {

      label.style.left =
        `${state.cursorX}px`;

      label.style.top =
        `${state.cursorY}px`;

    }


    requestAnimationFrame(
      animateCursor
    );

  }


  animateCursor();


  bindCursorInteractions();

}


function bindCursorInteractions() {

  const interactive =
    document.querySelectorAll(
      "a, button, input, .magnetic-card, .project-card, .principle-card"
    );


  interactive.forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {

        document.body.classList.add(
          "cursor-hover"
        );

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        document.body.classList.remove(
          "cursor-hover"
        );

      }
    );

  });


  document.querySelectorAll(
    ".project-card, .magnetic-card"
  ).forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {

        document.body.classList.add(
          "cursor-view"
        );

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        document.body.classList.remove(
          "cursor-view"
        );

      }
    );

  });

}


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

function initMagneticElements(
  root = document
) {

  const elements =
    root.querySelectorAll
      ? root.querySelectorAll(".magnetic")
      : [];


  elements.forEach(element => {

    if (
      element.dataset.magneticReady
    ) return;


    element.dataset.magneticReady =
      "true";


    element.addEventListener(
      "mousemove",
      event => {

        if (window.innerWidth <= 900) {
          return;
        }


        const rect =
          element.getBoundingClientRect();


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

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        element.style.transform = "";

      }
    );

  });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

  const elements =
    document.querySelectorAll(
      ".reveal-section, .reveal-text, .reveal-image"
    );


  if (!elements.length) return;


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.classList.add(
            "is-visible"
          );


          observer.unobserve(
            entry.target
          );

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

  const heroImage =
    document.querySelector(
      ".hero-image img"
    );

  const journalismImage =
    document.querySelector(
      ".journalism-image img"
    );

  const ulabImage =
    document.querySelector(
      ".ulab-image img"
    );


  let ticking = false;


  function updateParallax() {

    const scrollY =
      window.scrollY;


    if (heroImage) {

      const movement =
        Math.min(scrollY * .12, 100);


      heroImage.style.transform =
        `scale(1.08) translateY(${movement}px)`;

    }


    updateImageParallax(
      journalismImage,
      45
    );


    updateImageParallax(
      ulabImage,
      40
    );


    ticking = false;

  }


  function updateImageParallax(
    image,
    amount
  ) {

    if (!image) return;


    const rect =
      image.getBoundingClientRect();


    if (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    ) {

      const progress =
        (
          window.innerHeight -
          rect.top
        ) /
        (
          window.innerHeight +
          rect.height
        );


      image.style.transform =
        `scale(1.08) translateY(${progress * amount - amount / 2}px)`;

    }

  }


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        requestAnimationFrame(
          updateParallax
        );

        ticking = true;

      }

    },
    { passive: true }
  );


  updateParallax();

}


/* =========================================================
   PROJECT CARD 3D TILT
========================================================= */

function initProjectCards() {

  const cards =
    document.querySelectorAll(
      ".magnetic-card"
    );


  cards.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        if (window.innerWidth <= 900) {
          return;
        }


        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left;


        const y =
          event.clientY -
          rect.top;


        const rotateY =
          (
            x / rect.width -
            .5
          ) * 7;


        const rotateX =
          (
            y / rect.height -
            .5
          ) * -7;


        card.style.transform =
          `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-5px)
          `;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform =
          `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0)
          `;

      }
    );

  });

}


/* =========================================================
   SMOOTH ANCHORS
========================================================= */

function initSmoothAnchors() {

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(anchor => {

      anchor.addEventListener(
        "click",
        event => {

          const href =
            anchor.getAttribute("href");


          if (
            !href ||
            href === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              href
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });

}


/* =========================================================
   MOUSE GLOW
========================================================= */

function initMouseGlow() {

  const glow =
    document.querySelector(
      ".mouse-glow"
    );


  if (!glow) return;


  window.addEventListener(
    "mousemove",
    event => {

      glow.style.left =
        `${event.clientX}px`;

      glow.style.top =
        `${event.clientY}px`;

    },
    { passive: true }
  );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

  const sections = [

    {
      id: "home",
      selector: ".nav-link[href='#home']"
    },

    {
      id: "about",
      selector: ".nav-link[href='#about']"
    },

    {
      id: "work",
      selector: ".nav-link[href='#work']"
    },

    {
      id: "journey",
      selector: ".nav-link[href='#journey']"
    },

    {
      id: "contact",
      selector: ".nav-link[href='#contact']"
    }

  ];


  function updateActive() {

    const scrollPosition =
      window.scrollY +
      window.innerHeight * .35;


    let active =
      "home";


    sections.forEach(sectionData => {

      const section =
        document.getElementById(
          sectionData.id
        );


      if (!section) return;


      if (
        scrollPosition >=
        section.offsetTop
      ) {

        active =
          sectionData.id;

      }

    });


    document
      .querySelectorAll(".nav-link")
      .forEach(link => {

        link.classList.remove(
          "active"
        );


        if (
          link.getAttribute("href") ===
          `#${active}`
        ) {

          link.classList.add(
            "active"
          );

        }

      });

  }


  window.addEventListener(
    "scroll",
    updateActive,
    { passive: true }
  );


  updateActive();

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initKeyboardShortcuts() {

  document.addEventListener(
    "keydown",
    event => {

      const searchOverlay =
        document.getElementById(
          "searchOverlay"
        );


      const searchInput =
        document.getElementById(
          "searchInput"
        );


      if (
        event.key === "/" &&
        document.activeElement !==
        searchInput
      ) {

        event.preventDefault();

        document
          .getElementById(
            "searchTrigger"
          )
          ?.click();

      }


      if (
        event.key === "Escape"
      ) {

        if (
          searchOverlay?.classList
            .contains("open")
        ) {

          document
            .getElementById(
              "searchClose"
            )
            ?.click();

        }


        const menu =
          document.getElementById(
            "mobileMenu"
          );

        const toggle =
          document.getElementById(
            "menuToggle"
          );


        if (
          menu?.classList.contains(
            "open"
          )
        ) {

          menu.classList.remove(
            "open"
          );

          toggle?.classList.remove(
            "open"
          );

          document.body.classList.remove(
            "loading"
          );

          state.mobileMenuOpen =
            false;

        }

      }

    }
  );

}


/* =========================================================
   IMAGE ERROR PROTECTION
========================================================= */

function initImageLoadProtection() {

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener(
        "error",
        () => {

          image.style.opacity = "0";

          image.parentElement?.classList.add(
            "image-missing"
          );

        }
      );

    });

}


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      document.hidden
    ) {

      document.body.classList.add(
        "page-hidden"
      );

    } else {

      document.body.classList.remove(
        "page-hidden"
      );

    }

  }
);


/* =========================================================
   RESIZE SAFETY
========================================================= */

let resizeTimer;

window.addEventListener(
  "resize",
  () => {

    clearTimeout(resizeTimer);


    resizeTimer =
      setTimeout(() => {

        state.mouseX =
          window.innerWidth / 2;

        state.mouseY =
          window.innerHeight / 2;

      }, 150);

  },
  { passive: true }
);
