const cursor = document.getElementById("cursor");
const cursorDot = document.getElementById("cursorDot");

document.addEventListener("mousemove", function (e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
});

const hoverTargets = document.querySelectorAll("a, button, .project-card, .tool-badge, .skill-category");
hoverTargets.forEach(function (el) {
  el.addEventListener("mouseenter", function () { cursor.classList.add("hovered"); });
  el.addEventListener("mouseleave", function () { cursor.classList.remove("hovered"); });
});

function createParticles() {
  const container = document.getElementById("particles");
  const colors = ["#ff6b35", "#ff3cac", "#2b86c5", "#39ff14", "#feca57", "#a29bfe"];
  const count = 20;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.classList.add("particle");

    const size = Math.random() * 10 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = Math.random() * 10 + 8;

    dot.style.width = size + "px";
    dot.style.height = size + "px";
    dot.style.background = color;
    dot.style.left = left + "%";
    dot.style.animationDuration = duration + "s";
    dot.style.animationDelay = delay + "s";
    dot.style.boxShadow = "0 0 " + (size * 2) + "px " + color;

    container.appendChild(dot);
  }
}
createParticles();

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", function () {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

const navItems = document.querySelectorAll(".nav-link");
navItems.forEach(function (link) {
  link.addEventListener("click", function () {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

function setActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 100;

  sections.forEach(function (section) {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(".nav-link[href='#" + id + "']");

    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll(".nav-link").forEach(function (l) { l.classList.remove("active"); });
        link.classList.add("active");
      }
    }
  });
}
window.addEventListener("scroll", setActiveLink);

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const html = document.documentElement;

const savedTheme = localStorage.getItem("cfTheme") || "light";
html.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", function () {
  const current = html.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  localStorage.setItem("cfTheme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
}

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach(function (card) {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animation = "fadeInCard 0.4s ease both";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

const revealElements = document.querySelectorAll(
  ".section-header, .about-card, .profile-card, .about-info, .skill-category, .project-card, .contact-info, .contact-form, .tool-badge"
);

revealElements.forEach(function (el) {
  el.classList.add("reveal");
});

function checkReveal() {
  revealElements.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkReveal);
checkReveal(); 

function animateSkillBars() {
  const bars = document.querySelectorAll(".bar-fill");
  bars.forEach(function (bar) {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      const width = bar.getAttribute("data-width");
      if (!bar.style.width || bar.style.width === "0px") {
        bar.style.width = width + "%";
      }
    }
  });
}

window.addEventListener("scroll", animateSkillBars);
animateSkillBars(); 

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


var EMAILJS_PUBLIC_KEY  = "3kfcl1OWBxa-z4Fcc";   
var EMAILJS_SERVICE_ID  = "service_qe7m9ou";   
var EMAILJS_TEMPLATE_ID = "template_xxh4fsa";  

emailjs.init(EMAILJS_PUBLIC_KEY);


const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name    = document.getElementById("name");
  const email   = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  const nameError    = document.getElementById("nameError");
  const emailError   = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  clearError(name,    nameError);
  clearError(email,   emailError);
  clearError(subject, subjectError);
  clearError(message, messageError);
  formSuccess.classList.remove("show");

  var valid = true;

  if (name.value.trim().length < 2) {
    showError(name, nameError, "Please enter your full name (at least 2 characters).");
    valid = false;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    showError(email, emailError, "Please enter a valid email address.");
    valid = false;
  }

  if (subject.value.trim().length < 3) {
    showError(subject, subjectError, "Subject must be at least 3 characters.");
    valid = false;
  }

  if (message.value.trim().length < 10) {
    showError(message, messageError, "Message must be at least 10 characters.");
    valid = false;
  }

  if (valid) {
    var btnText = document.getElementById("btnText");
    btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    var templateParams = {
      name:    name.value.trim(),
      email:   email.value.trim(),
      title:   subject.value.trim(),
      message:    message.value.trim()
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(function () {
        btnText.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        formSuccess.classList.add("show");
        contactForm.reset();
      })
      .catch(function (error) {
        btnText.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        alert("Oops! Something went wrong. Please try again.\nError: " + JSON.stringify(error));
        console.error("EmailJS error:", error);
      });
  }
});

function showError(input, errorEl, message) {
  input.classList.add("error");
  errorEl.textContent = message;
}

function clearError(input, errorEl) {
  input.classList.remove("error");
  errorEl.textContent = "";
}

["name", "email", "subject", "message"].forEach(function (id) {
  const el = document.getElementById(id);
  const errEl = document.getElementById(id + "Error");
  el.addEventListener("input", function () {
    clearError(el, errEl);
  });
});

window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(function () {
    document.body.style.opacity = "1";
  }, 50);
});