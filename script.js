/**
 * A Few Little Things for Muku 🌷
 * Complete Interactive Script
 * - Background YouTube Music Player (Starts at main hook ~45s)
 * - Screen Navigation State Machine
 * - Animated Opening Envelopes & Letters
 * - Background Floating Particles Canvas
 * - Ending Confetti Explosion
 */

// ==================== PERSONALIZATION ====================
// Change herName to easily customize who this website is for!
const herName = "Muku";

// ==================== MUSIC PLAYER CONTROL ====================
// Start timestamp set to start=45 for the main chorus/vocal hook of Maiyya - Do Patti
const songYouTubeId = "Jm3X_a0_71E";
const songStartSeconds = 45; // Starts at main peak of song (~45s)

let isMuted = false;
let musicStarted = false;

function startWithMusic() {
  injectYouTube();
  dismissOverlay();
}

function startWithoutMusic() {
  dismissOverlay();
  const musicIcon = document.getElementById('music-icon');
  const musicBtn = document.getElementById('music-btn');
  if (musicIcon) musicIcon.textContent = '🔇';
  if (musicBtn) musicBtn.textContent = 'Play';
  isMuted = true;
}

function dismissOverlay() {
  const overlay = document.getElementById('music-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.4s ease';
    setTimeout(() => overlay.remove(), 420);
  }
}

function injectYouTube() {
  if (musicStarted) return;
  musicStarted = true;
  const container = document.getElementById('yt-container');
  if (!container) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${songYouTubeId}?autoplay=1&loop=1&playlist=${songYouTubeId}&controls=0&mute=0&enablejsapi=1&start=${songStartSeconds}&origin=` + encodeURIComponent(location.origin);
  iframe.allow = 'autoplay; encrypted-media';
  iframe.style.display = 'none';
  iframe.setAttribute('aria-hidden', 'true');
  container.appendChild(iframe);

  window._ytFrame = iframe;
}

function toggleMusic() {
  const btn = document.getElementById('music-btn');
  const icon = document.getElementById('music-icon');

  if (!musicStarted && !isMuted) {
    injectYouTube();
    isMuted = false;
    if (btn) btn.textContent = 'Mute';
    if (icon) {
      icon.textContent = '🎵';
      icon.classList.remove('paused');
    }
    return;
  }

  isMuted = !isMuted;
  if (window._ytFrame && window._ytFrame.contentWindow) {
    window._ytFrame.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: isMuted ? 'mute' : 'unMute', args: [] }),
      '*'
    );
  }
  if (btn) btn.textContent = isMuted ? 'Unmute' : 'Mute';
  if (icon) {
    icon.textContent = isMuted ? '🔇' : '🎵';
    icon.classList.toggle('paused', isMuted);
  }
}

// ==================== MESSAGES DATA ====================
// Edit any of these 10 messages to customize what the letters say!
const messages = [
  {
    category: "🌷 A little reminder",
    text: "You have a really nice energy. Talking to you somehow makes conversations feel easy and fun."
  },
  {
    category: "✨ Something I've noticed",
    text: "You have this way of making even random conversations feel interesting. And honestly, that's a pretty nice quality to have."
  },
  {
    category: "😂 Important information",
    text: "Your existence has already contributed an unreasonable amount of random conversations. Honestly, impressive. 😭"
  },
  {
    category: "🫶 Just saying",
    text: "I'm genuinely glad our paths crossed. You're a really nice person to have around, and I'm happy we became friends."
  },
  {
    category: "🌙 A small reminder",
    text: "I hope you never underestimate how much the little things you do can brighten someone's day."
  },
  {
    category: "💻 Technical explanation",
    text: "I could've just sent you a normal message... But apparently I chose to spend hours building a website instead. 😭 So technically, this is friendship with unnecessary engineering."
  },
  {
    category: "🌸 Something genuine",
    text: "You're still a relatively new friend, but you're already someone I'm really happy I got the chance to meet."
  },
  {
    category: "🧸 One thing I like",
    text: "Some people take a long time to feel comfortable talking to. Somehow, talking to you just feels easy."
  },
  {
    category: "✨ Keep this one",
    text: "Keep being yourself. You have your own little way of making people around you feel comfortable, and that's something worth appreciating."
  },
  {
    category: "😂 Final card before the final card",
    text: "If you actually opened every single card... Respect. 😭 You officially survived my unnecessarily complicated way of saying something simple."
  }
];

// ==================== STATE MANAGEMENT ====================
let currentCardIndex = 0;
let isCardOpen = false;
let confettiAnimationId = null;

// ==================== DOM ELEMENTS ====================
let screens = {};
let interactiveEnvelope, cardCategoryFront, cardCategoryBack, cardMessageText;
let cardCounter, counterPercentage, progressFill, progressBarElement, toastContainer;

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  screens = {
    welcome: document.getElementById("screen-welcome"),
    intro: document.getElementById("screen-intro"),
    messages: document.getElementById("screen-messages"),
    midway: document.getElementById("screen-midway"),
    finalCard: document.getElementById("screen-final-card"),
    finalMessage: document.getElementById("screen-final-message"),
    ending: document.getElementById("screen-ending")
  };

  interactiveEnvelope = document.getElementById("interactive-envelope");
  cardCategoryFront = document.getElementById("card-category-front");
  cardCategoryBack = document.getElementById("card-category-back");
  cardMessageText = document.getElementById("card-message-text");
  cardCounter = document.getElementById("card-counter");
  counterPercentage = document.getElementById("counter-percentage");
  progressFill = document.getElementById("progress-fill");
  progressBarElement = document.getElementById("progress-bar-element");
  toastContainer = document.getElementById("toast-container");

  updateDynamicNames();
  setupEventListeners();
  initBackgroundParticles();
});

function updateDynamicNames() {
  const nameElements = document.querySelectorAll(".dynamic-name");
  nameElements.forEach(el => {
    el.textContent = herName;
  });
}

function showScreen(screenKey) {
  Object.keys(screens).forEach(key => {
    const screen = screens[key];
    if (screen) {
      if (key === screenKey) {
        screen.classList.remove("hidden");
        void screen.offsetWidth;
        screen.classList.add("active");
      } else {
        screen.classList.remove("active");
        screen.classList.add("hidden");
      }
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupEventListeners() {
  const btnWelcomeStart = document.getElementById("btn-welcome-start");
  if (btnWelcomeStart) {
    btnWelcomeStart.addEventListener("click", () => showScreen("intro"));
  }

  const btnIntroNext = document.getElementById("btn-intro-next");
  if (btnIntroNext) {
    btnIntroNext.addEventListener("click", () => {
      currentCardIndex = 0;
      showMessagesScreen();
    });
  }

  const btnOpenCard = document.getElementById("btn-open-card");
  if (btnOpenCard) {
    btnOpenCard.addEventListener("click", (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  if (interactiveEnvelope) {
    interactiveEnvelope.addEventListener("click", () => {
      if (!isCardOpen) openEnvelope();
    });

    interactiveEnvelope.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && !isCardOpen) {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  const btnNextCard = document.getElementById("btn-next-card");
  if (btnNextCard) {
    btnNextCard.addEventListener("click", (e) => {
      e.stopPropagation();
      nextMessage();
    });
  }

  const btnMidwayContinue = document.getElementById("btn-midway-continue");
  if (btnMidwayContinue) {
    btnMidwayContinue.addEventListener("click", () => {
      currentCardIndex = 5;
      showMessagesScreen();
    });
  }

  const btnToFinalMessage = document.getElementById("btn-to-final-message");
  if (btnToFinalMessage) {
    btnToFinalMessage.addEventListener("click", () => showScreen("finalMessage"));
  }

  const btnToEnding = document.getElementById("btn-to-ending");
  if (btnToEnding) {
    btnToEnding.addEventListener("click", () => {
      showScreen("ending");
      triggerConfetti();
    });
  }

  const btnReplay = document.getElementById("btn-replay");
  if (btnReplay) {
    btnReplay.addEventListener("click", () => {
      currentCardIndex = 0;
      isCardOpen = false;
      if (interactiveEnvelope) interactiveEnvelope.classList.remove("open");
      showScreen("welcome");
    });
  }
}

function showMessagesScreen() {
  showScreen("messages");
  renderCurrentCardState();
}

function renderCurrentCardState() {
  const cardData = messages[currentCardIndex];
  isCardOpen = false;

  if (interactiveEnvelope) interactiveEnvelope.classList.remove("open");
  if (cardCategoryFront) cardCategoryFront.textContent = cardData.category;
  if (cardCategoryBack) cardCategoryBack.textContent = cardData.category;
  if (cardMessageText) cardMessageText.textContent = cardData.text;

  const stepNumber = currentCardIndex + 1;
  const total = messages.length;
  const percent = Math.round((stepNumber / total) * 100);

  if (cardCounter) cardCounter.textContent = `Little letter ${stepNumber} of ${total}`;
  if (counterPercentage) counterPercentage.textContent = `${percent}%`;
  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressBarElement) progressBarElement.setAttribute("aria-valuenow", stepNumber);
}

function openEnvelope() {
  if (isCardOpen) return;
  isCardOpen = true;
  if (interactiveEnvelope) interactiveEnvelope.classList.add("open");

  if (currentCardIndex === 2) {
    setTimeout(() => showToast("Okay, that one was important. 👀"), 700);
  } else if (currentCardIndex === 6) {
    setTimeout(() => showToast("I hope you're smiling right now. 😭"), 700);
  }
}

function nextMessage() {
  if (currentCardIndex === 4) {
    showScreen("midway");
    return;
  }
  if (currentCardIndex === 9) {
    showScreen("finalCard");
    return;
  }
  currentCardIndex++;
  renderCurrentCardState();
}

function showToast(messageText) {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = messageText;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3800);
}

function initBackgroundParticles() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const particleTypes = ["♡", "♥", "✦", "✧", "dot"];
  const particleCount = prefersReducedMotion ? 12 : 36;
  const colors = ["rgba(214,40,57,", "rgba(230,57,70,", "rgba(255,77,109,", "rgba(255,117,143,"];

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 14 + 10;
      this.speedY = Math.random() * 0.45 + 0.18;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      this.opacity = Math.random() * 0.45 + 0.25;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.angle = Math.random() * Math.PI * 2;
    }
    update() {
      if (prefersReducedMotion) return;
      this.y -= this.speedY;
      this.x += Math.sin(this.angle) * this.speedX;
      this.angle += 0.012;
      if (this.y < -30) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      if (this.type === "dot") {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 3.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ")";
        ctx.shadowColor = this.color + "0.6)";
        ctx.shadowBlur = 10;
        ctx.fill();
      } else {
        ctx.font = `${this.size}px sans-serif`;
        ctx.fillStyle = this.color + this.opacity + ")";
        ctx.textAlign = "center";
        ctx.fillText(this.type, this.x, this.y);
      }
      ctx.restore();
    }
  }

  const particles = Array.from({ length: particleCount }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function triggerConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const colors = ["#d62839", "#e63946", "#ff4d6d", "#ff758f", "#ffb3c1", "#ffffff", "#ffb703"];
  const pieces = [];

  for (let i = 0; i < 85; i++) {
    pieces.push({
      x: width / 2,
      y: height / 2 + 50,
      vx: (Math.random() - 0.5) * 13,
      vy: (Math.random() - 0.72) * 15,
      size: Math.random() * 9 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }

  let frame = 0;
  function renderConfetti() {
    ctx.clearRect(0, 0, width, height);
    let active = false;

    pieces.forEach(p => {
      if (p.opacity <= 0) return;
      active = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.26;
      p.vx *= 0.98;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.0075;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    frame++;
    if (active && frame < 300) {
      confettiAnimationId = requestAnimationFrame(renderConfetti);
    } else {
      ctx.clearRect(0, 0, width, height);
    }
  }

  if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  renderConfetti();
}
