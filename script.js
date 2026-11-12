const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const themeToggle = document.querySelector("#themeToggle");
const root = document.documentElement;

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Restore the visitor's theme choice, or use the dark theme by default.
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") root.dataset.theme = "light";
updateThemeButton();

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  if (nextTheme === "dark") delete root.dataset.theme;
  else root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeButton();
});

function updateThemeButton() {
  const isLight = root.dataset.theme === "light";
  themeToggle.textContent = isLight ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  document.querySelector('meta[name="theme-color"]').content = isLight ? "#f7f7fc" : "#0b0b16";
}

// Project details modal.
const projectInfo = {
  healthcare: {
    title: "Healthcare Expense Tracker",
    description: "A healthcare expense and medical cost management application concept. The project brings expense tracking, medical records, budget management, and report generation into one workflow.",
    stack: ["React", "Spring Boot", "MySQL", "JWT", "Charts", "CSV reports"]
  },
  audio: {
    title: "Noise Reduction in Audio Signals",
    description: "An academic digital signal processing project that explores audio denoising methods and a web interface for uploading and processing audio files.",
    stack: ["React", "Flask", "Python", "SciPy", "Librosa", "Digital Signal Processing"]
  },
  library: {
    title: "Library Management System",
    description: "A web-based library management project designed around maintaining library records and supporting common create, read, update, and delete workflows.",
    stack: ["React", "Vite", "Express", "MySQL"]
  },
  auction: {
    title: "Online Auction System",
    description: "A web application project focused on auction listings and bidding workflows, with a database-backed application structure.",
    stack: ["JavaScript", "Backend development", "MySQL"]
  },
  brain: {
    title: "Brain Tumor XAI",
    description: "An AI and deep-learning project exploring brain MRI image classification and explainability. Add your exact model details and evaluation results when ready.",
    stack: ["Python", "TensorFlow", "Deep Learning", "Explainable AI"]
  }
};

const dialog = document.querySelector("#projectDialog");
document.querySelectorAll(".project-details").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projectInfo[button.dataset.project];
    if (!project) return;
    document.querySelector("#dialogTitle").textContent = project.title;
    document.querySelector("#dialogDescription").textContent = project.description;
    const stack = document.querySelector("#dialogStack");
    stack.replaceChildren(...project.stack.map((item) => {
      const tag = document.createElement("span");
      tag.textContent = item;
      return tag;
    }));
    dialog.showModal();
  });
});

document.querySelector("#dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

document.querySelector("#year").textContent = new Date().getFullYear();

// IMPORTANT: Replace this placeholder with your real email before publishing.
const emailAddress = "";
if (emailAddress) {
  const emailButton = document.querySelector("#emailButton");
  emailButton.href = `mailto:${emailAddress}`;
  document.querySelector("#contactPlaceholder").hidden = true;
}
