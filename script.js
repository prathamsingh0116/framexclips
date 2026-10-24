/* FRAME//SHIFT — simple, editable portfolio configuration */
const SITE_CONFIG = {
  brand: "FRAME//SHIFT",
  instagramUrl: "https://instagram.com/",
  whatsappNumber: "", // Add country code + number, digits only. Example: 919876543210
  email: "",
  // Replace demoVideoUrl with a direct MP4 URL to play a real video in the modal.
  demoVideoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
};

const PROJECTS = {
  showreel: { title: "A Feeling in Every Frame", category: "SHOWREEL / DEMO", description: "A demo preview to show how the video viewer works. Replace this with your actual showreel.", instagramUrl: SITE_CONFIG.instagramUrl, videoUrl: SITE_CONFIG.demoVideoUrl },
  city: { title: "City After Dark", category: "CINEMATIC / DEMO CONCEPT", description: "A cinematic city edit concept. Replace the demo video and imagery with your own project.", instagramUrl: SITE_CONFIG.instagramUrl, videoUrl: SITE_CONFIG.demoVideoUrl },
  elsewhere: { title: "Find Your Elsewhere", category: "TRAVEL / DEMO CONCEPT", description: "A travel-story concept built around atmosphere, pacing, and a sense of place.", instagramUrl: SITE_CONFIG.instagramUrl, videoUrl: SITE_CONFIG.demoVideoUrl },
  "slow-mornings": { title: "Slow Mornings", category: "LIFESTYLE / DEMO CONCEPT", description: "A lifestyle reel concept with a quiet, intentional visual rhythm.", instagramUrl: SITE_CONFIG.instagramUrl, videoUrl: SITE_CONFIG.demoVideoUrl },
  objects: { title: "Objects of Desire", category: "BRAND FILM / DEMO CONCEPT", description: "A product film concept designed to make the details stand out.", instagramUrl: SITE_CONFIG.instagramUrl, videoUrl: SITE_CONFIG.demoVideoUrl },
  "after-hours": { title: "After Hours", category: "SOCIAL REEL / DEMO CONCEPT", description: "An energetic short-form edit concept for social-first storytelling.", instagramUrl: SITE_CONFIG.instagramUrl, videoUrl: SITE_CONFIG.demoVideoUrl },
  "form-feeling": { title: "Form & Feeling", category: "CINEMATIC / DEMO CONCEPT", description: "A fashion-led visual concept focused on movement, composition, and mood.", instagramUrl: SITE_CONFIG.instagramUrl, videoUrl: SITE_CONFIG.demoVideoUrl }
};

document.documentElement.classList.add("js-ready");
document.getElementById("year").textContent = new Date().getFullYear();

const menu = document.querySelector(".mobile-menu");
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
function setMenu(open) {
  menu.classList.toggle("open", open);
  menu.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
  if (open) menuClose.focus(); else menuToggle.focus();
}
menuToggle.addEventListener("click", () => setMenu(true));
menuClose.addEventListener("click", () => setMenu(false));
menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
});

// Portfolio category filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(b => b.classList.toggle("active", b === button));
  projectCards.forEach(card => {
    const show = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("is-hidden", !show);
  });
}));

// Accessible project viewer
const modal = document.getElementById("video-modal");
const modalMedia = document.getElementById("modal-media");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");
const modalInstagram = document.getElementById("modal-instagram");
const modalClose = document.querySelector(".modal-close");
let lastFocusedElement = null;

function openProject(key) {
  const project = PROJECTS[key];
  if (!project) return;
  lastFocusedElement = document.activeElement;
  modalTitle.textContent = project.title;
  modalCategory.textContent = project.category;
  modalDescription.textContent = project.description;
  modalInstagram.href = project.instagramUrl || SITE_CONFIG.instagramUrl || "https://instagram.com/";
  modalMedia.replaceChildren();

  if (project.videoUrl && project.videoUrl.trim()) {
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", project.title + " video");
    video.src = project.videoUrl;
    video.addEventListener("error", () => {
      modalMedia.replaceChildren();
      const message = document.createElement("div");
      message.className = "modal-placeholder";
      message.innerHTML = '<span class="modal-play-mark">!</span><p>VIDEO NOT AVAILABLE</p><small>Check the video URL in script.js or use the Instagram link.</small>';
      modalMedia.append(message);
    }, { once: true });
    modalMedia.append(video);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "modal-placeholder";
    placeholder.innerHTML = '<span class="modal-play-mark">▶</span><p>YOUR EDIT GOES HERE.</p><small>Add a direct MP4 URL to this project in <code>script.js</code>.</small>';
    modalMedia.append(placeholder);
  }
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();
}
function closeModal() {
  if (!modal.classList.contains("open")) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  const video = modalMedia.querySelector("video");
  if (video) { video.pause(); video.removeAttribute("src"); video.load(); }
  modalMedia.replaceChildren();
  if (lastFocusedElement) lastFocusedElement.focus();
}
document.querySelectorAll(".video-trigger").forEach(button => button.addEventListener("click", () => openProject(button.dataset.project)));
modalClose.addEventListener("click", closeModal);
modal.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
modal.addEventListener("keydown", e => {
  if (e.key !== "Tab") return;
  const focusable = [...modal.querySelectorAll("button,a[href],video[controls]")].filter(el => el.offsetParent !== null);
  if (!focusable.length) return;
  if (e.shiftKey && document.activeElement === focusable[0]) { e.preventDefault(); focusable[focusable.length - 1].focus(); }
  else if (!e.shiftKey && document.activeElement === focusable[focusable.length - 1]) { e.preventDefault(); focusable[0].focus(); }
});

// Contact configuration
const instagramLink = document.getElementById("instagram-link");
const whatsappCta = document.getElementById("whatsapp-cta");
instagramLink.href = SITE_CONFIG.instagramUrl || "https://instagram.com/";
function whatsappUrl(message) {
  const number = (SITE_CONFIG.whatsappNumber || "").replace(/\D/g, "");
  const query = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${query}` : `https://wa.me/?text=${query}`;
}
whatsappCta.href = whatsappUrl("Hi! I'd like to discuss a video editing project.");
document.getElementById("inquiry-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    "Hi! I'd like to discuss a video editing project.",
    "",
    `Name: ${data.get("name")}`,
    `Contact: ${data.get("contact")}`,
    `Service: ${data.get("service")}`,
    data.get("budget") ? `Budget: ${data.get("budget")}` : "",
    data.get("details") ? `Project details: ${data.get("details")}` : ""
  ].filter(Boolean).join("\n");
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});
