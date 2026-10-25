document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // 1. TEMA GELAP DAN TERANG
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  function setTheme(theme) {
    const selectedTheme = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", selectedTheme);
    if (themeIcon) {
      themeIcon.textContent = selectedTheme === "dark" ? "☀" : "☾";
    }
    if (themeToggle) {
      const nextTheme = selectedTheme === "dark" ? "terang" : "gelap";
      themeToggle.setAttribute("aria-label", `Aktifkan tema ${nextTheme}`);
      themeToggle.setAttribute("title", `Ganti ke tema ${nextTheme}`);
    }
  }
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("dewi-portfolio-theme");
  } catch (error) {
    // Tetap bisa mengganti tema jika localStorage dibatasi.
  }
  setTheme(savedTheme === "light" ? "light" : "dark");
  if (themeToggle) {
    themeToggle.addEventListener("click", (event) => {
      event.preventDefault();
      const currentTheme = root.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      try {
        localStorage.setItem("dewi-portfolio-theme", nextTheme);
      } catch (error) {
        // Tema tetap berubah untuk sesi ini.
      }
    });
  }

  // 2. NAVBAR MOBILE

  const navCollapse = document.getElementById("mainNav");
  const navToggle = document.getElementById("navToggle");
  const menuIcon = document.getElementById("menuIcon");
  const siteHeader = document.querySelector(".site-header");

  function setNavOpen(open) {
    if (!navCollapse || !navToggle) return;

    navCollapse.classList.toggle("is-open", open);

    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute(
      "aria-label",
      open ? "Tutup navigasi" : "Buka navigasi"
    );

    if (menuIcon) {
      menuIcon.textContent = open ? "×" : "☰";
    }

    if (siteHeader) {
      siteHeader.classList.toggle("menu-open", open);
    }
  }

  if (navToggle && navCollapse) {
    navToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const currentlyOpen = navCollapse.classList.contains("is-open");
      setNavOpen(!currentlyOpen);
    });

    // Tutup menu setelah tautan dipilih.
    navCollapse.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        setNavOpen(false);
      });
    });

    // Tutup menu jika mengeklik di luar navbar.
    document.addEventListener("click", (event) => {
      if (
        window.innerWidth < 1200 &&
        navCollapse.classList.contains("is-open") &&
        siteHeader &&
        !siteHeader.contains(event.target)
      ) {
        setNavOpen(false);
      }
    });

    // Tutup menggunakan tombol Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setNavOpen(false);
      }
    });

    // Atur ulang menu saat ukuran layar berubah.
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1200) {
        setNavOpen(false);
      }
    });
  }

  // =====================================
  // 3. EFEK MENGETIK
  // =====================================
  const typedText = document.getElementById("typedText");
  const roles = [
    "Information Systems Student",
    "Aspiring Web Developer",
    "UI/UX Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = true;

  function typeRole() {
    if (!typedText) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typedText.textContent = roles[0];
      return;
    }

    const role = roles[roleIndex];

    charIndex += deleting ? -1 : 1;
    typedText.textContent = role.slice(0, charIndex);

    let delay = deleting ? 35 : 65;

    if (!deleting && charIndex >= role.length) {
      deleting = true;
      delay = 1500;
    } else if (deleting && charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }

    window.setTimeout(typeRole, delay);
  }

  window.setTimeout(typeRole, 1400);

  // 4. ANIMASI REVEAL

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // 5. MENU AKTIF SESUAI SECTION

  const navLinks = document.querySelectorAll("#mainNav .nav-link");
  const pageSections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${id}`;

          link.classList.toggle("active", active);

          if (active) {
            link.setAttribute("aria-current", "page");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, {
      rootMargin: "-25% 0px -65% 0px"
    });

    pageSections.forEach((section) => sectionObserver.observe(section));
  }
 
  // 6. TAHUN FOOTER

  const year = document.getElementById("currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // 7. LINK SERTIFIKAT PLACEHOLDER

  document.querySelectorAll(".placeholder-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("href") === "#") {
        event.preventDefault();
      }
    });
  });


  //  PRATINJAU SERTIFIKAT

const certificateModal = document.getElementById("certificateModal");
const certificateFullImage = document.getElementById("certificateFullImage");
const certificateModalTitle = document.getElementById("certificateModalTitle");
const closeCertificateModal = document.getElementById("closeCertificateModal");

const certificateButtons = document.querySelectorAll("[data-certificate]");

function openCertificate(imagePath, title) {
  if (!certificateModal || !certificateFullImage) return;

  certificateFullImage.src = imagePath;
  certificateFullImage.alt = title;
  certificateModalTitle.textContent = title;

  certificateModal.classList.add("is-open");
  certificateModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCertificate() {
  if (!certificateModal || !certificateFullImage) return;

  certificateModal.classList.remove("is-open");
  certificateModal.setAttribute("aria-hidden", "true");
  certificateFullImage.src = "";
  document.body.style.overflow = "";
}


certificateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openCertificate(
      button.dataset.certificate,
      button.dataset.title || "Pratinjau Sertifikat"
    );
  });
});

closeCertificateModal?.addEventListener("click", closeCertificate);

certificateModal?.addEventListener("click", (event) => {
  if (event.target === certificateModal) {
    closeCertificate();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCertificate();
  }
});

  // 8. FOTO PROFIL

  const photo = document.getElementById("profilePhoto");
  const placeholder = document.getElementById("photoPlaceholder");

  function showPhotoPlaceholder() {
    if (!photo || !placeholder) return;

    photo.style.display = "none";
    placeholder.style.display = "flex";
  }

  if (photo && placeholder) {
    photo.addEventListener("error", showPhotoPlaceholder);

    if (photo.complete && photo.naturalWidth === 0) {
      showPhotoPlaceholder();
    }
  } 
  
/* =====================================
   SCROLL-LINKED REVEAL
   Animasi selesai sekali saja
===================================== */

(() => {
    function initScrollReveal() {
        const elements = document.querySelectorAll(".scroll-reveal");

        if (
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            elements.forEach((element) => {
                element.classList.add("is-revealed");
            });
            return;
        }

        // Fallback untuk browser tanpa CSS scroll-driven animation
        if (!CSS.supports("animation-timeline: view()")) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-revealed");
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15
            });

            elements.forEach((element) => observer.observe(element));
            return;
        }

        // Tandai elemen sebagai selesai setelah masuk cukup jauh.
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const rect = element.getBoundingClientRect();

                    // Tunggu sampai bagian atas elemen masuk
                    // sekitar 35% tinggi viewport.
                    if (rect.top < window.innerHeight * 0.65) {
                        element.classList.add("is-revealed");
                        observer.unobserve(element);
                    }
                }
            });
        }, {
            threshold: 0
        });

        elements.forEach((element) => observer.observe(element));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initScrollReveal);
    } else {
        initScrollReveal();
    }
})();

});