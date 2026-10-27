/**
 * TERRY HUANG — CYBERSEC PORTFOLIO INTERACTION ENGINE
 * Features:
 * - Dynamic Particle Network & Matrix Code Rain Canvas
 * - Real Interactive Hacker Shell with Command Parser
 * - Web Audio API Sci-Fi Synthesizer Sound Effects
 * - 3D Card Tilt with Dynamic Specular Reflection
 * - Dynamic Typewriter, HUD Clock & Color Themes
 */

document.addEventListener("DOMContentLoaded", () => {
  initHUDClock();
  initThemeSwitcher();
  initTypewriter();
  initTiltCards();
  initCopyEmail();
  initWebAudio();
  initCyberCanvas();
  initInteractiveTerminal();
});

/* ==========================================================================
   1. Real-time HUD Clock (Taiwan Time UTC+8)
   ========================================================================== */
function initHUDClock() {
  const clockEl = document.getElementById("hud-clock");
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const options = {
      timeZone: "Asia/Taipei",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    clockEl.textContent = `${now.toLocaleTimeString("zh-TW", options)} UTC+8`;
  }
  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   2. Theme Switcher (Cyan, Emerald Matrix, Cyber Violet)
   ========================================================================== */
function initThemeSwitcher() {
  const buttons = document.querySelectorAll(".theme-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const theme = btn.dataset.color;
      document.documentElement.setAttribute("data-theme", theme);
      playCyberSound("click");
      showToast(`已切換色彩架構: [${theme.toUpperCase()}]`);
    });
  });
}

/* ==========================================================================
   3. Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
  const textEl = document.getElementById("typewriter-text");
  if (!textEl) return;

  const phrases = [
    "守護數據安全，落實防禦架構與加固。",
    "FastAPI × Docker 容器化後端微服務。",
    "重視排查根因，日誌分析與可重複驗證。",
    "Blue Team 攻防演練 · 弱點修補與 IP 監控。"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      textEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      delay = 40;
    } else {
      textEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      delay = 85;
    }

    if (!isDeleting && charIndex === current.length) {
      delay = 2200; // Pause at end of sentence
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 500;
    }

    setTimeout(type, delay);
  }
  type();
}

/* ==========================================================================
   4. 3D Tilt Effect on Cards
   ========================================================================== */
function initTiltCards() {
  // Only apply tilt on desktop devices with fine pointer
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cards = document.querySelectorAll(".tilt-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

/* ==========================================================================
   5. One-Click Copy Email & Cyber Toast
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", () => {
    const email = copyBtn.dataset.email || "taiyuhuang591@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      playCyberSound("success");
      showToast(`聯絡 Email [${email}] 已複製至剪貼簿！`);
    }).catch(() => {
      showToast(`Email: ${email}`);
    });
  });
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "cyber-toast";
  toast.innerHTML = `<span style="color:var(--neon-primary)">[ALERT]</span> ${message}`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   6. Web Audio API Sci-Fi Synthesizer (No external assets required!)
   ========================================================================== */
let audioCtx = null;
let sfxEnabled = false;

function initWebAudio() {
  const sfxBtn = document.getElementById("sfx-toggle");
  const sfxIcon = document.getElementById("sfx-icon");
  if (!sfxBtn) return;

  sfxBtn.addEventListener("click", () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    sfxEnabled = !sfxEnabled;
    sfxIcon.textContent = sfxEnabled ? "🔊" : "🔇";
    if (sfxEnabled) {
      playCyberSound("boot");
      showToast("科幻介面音效已啟動 [SFX ON]");
    } else {
      showToast("音效已靜音 [SFX OFF]");
    }
  });
}

function playCyberSound(type) {
  if (!sfxEnabled || !audioCtx) return;
  if (audioCtx.state === "suspended") audioCtx.resume();

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "success") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.setValueAtTime(780, now + 0.08);
      osc.frequency.setValueAtTime(1040, now + 0.16);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "boot") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    // Audio context issue fallback
  }
}

/* ==========================================================================
   7. Cyber Canvas: Particle Mesh & Matrix Rain Engine
   ========================================================================== */
let isMatrixMode = false;

function initCyberCanvas() {
  const canvas = document.getElementById("cyber-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle Mesh setup
  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const particles = [];
  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }
    draw() {
      ctx.fillStyle = "rgba(0, 245, 212, 0.4)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Matrix Rain Setup
  const matrixChars = "0101010101ABCDEFターミナルセキュリティーLINUXDOCKERFASTAPIPYTHON";
  const fontSize = 14;
  let columns = Math.floor(width / fontSize);
  let drops = Array(columns).fill(1);

  window.addEventListener("resize", () => {
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
  });

  const matrixToggleBtn = document.getElementById("matrix-toggle");
  if (matrixToggleBtn) {
    matrixToggleBtn.addEventListener("click", () => {
      isMatrixMode = !isMatrixMode;
      matrixToggleBtn.classList.toggle("active", isMatrixMode);
      playCyberSound("boot");
      showToast(isMatrixMode ? "MATRIX 代碼雨模式已啟動" : "切換回神經網絡粒子模式");
    });
  }

  function render() {
    if (!isMatrixMode) {
      // Normal Particle Mesh Mode
      ctx.clearRect(0, 0, width, height);

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(0, 245, 212, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    } else {
      // Matrix Rain Mode
      ctx.fillStyle = "rgba(6, 9, 14, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff66";
      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   8. Real Interactive Hacker Terminal Engine
   ========================================================================== */
function initInteractiveTerminal() {
  const terminalBody = document.getElementById("terminal-output");
  const form = document.getElementById("terminal-form");
  const input = document.getElementById("terminal-input");
  const chips = document.querySelectorAll(".preset-chip");
  if (!terminalBody || !form || !input) return;

  const commandHistory = [];
  let historyIndex = -1;

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const cmd = chip.dataset.cmd;
      executeCommand(cmd);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cmd = input.value.trim();
    if (cmd) {
      executeCommand(cmd);
      commandHistory.push(cmd);
      historyIndex = commandHistory.length;
      input.value = "";
    }
  });

  // History navigation with up/down arrows
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        input.value = "";
      }
    }
  });

  function appendLine(content, className = "") {
    const line = document.createElement("div");
    line.className = `term-line ${className}`;
    line.innerHTML = content;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function executeCommand(cmdStr) {
    playCyberSound("click");
    appendLine(`<span class="prompt-text">terry@sec:~$</span> ${cmdStr}`);

    const lower = cmdStr.toLowerCase().trim();

    switch (lower) {
      case "help":
        appendLine(`
          <div style="color:var(--neon-primary)">可用指令列表 (AVAILABLE COMMANDS):</div>
          • <span class="highlight-cyan">whoami</span> : 輸出履歷主角身分與核心簡介<br>
          • <span class="highlight-cyan">projects / cat projects</span> : 顯示精選專案 (ARKAI, Metis)<br>
          • <span class="highlight-cyan">skills</span> : 盤點技術能力庫 (Security, Linux, Docker, FastAPI)<br>
          • <span class="highlight-cyan">education</span> : 查看畢業學校與資工背景<br>
          • <span class="highlight-cyan">contact</span> : 顯示 GitHub 與 Email 聯絡管道<br>
          • <span class="highlight-cyan">matrix</span> : 切換 Matrix 代碼雨模式<br>
          • <span class="highlight-cyan">sudo hire terry</span> : 觸發最佳錄用指令 🚀<br>
          • <span class="highlight-cyan">clear</span> : 清除終端機畫面
        `);
        break;

      case "whoami":
        appendLine(`
          <strong>[IDENTITY] 黃泰喻 (Terry Huang)</strong><br>
          - 國立臺中科技大學 資訊工程系畢業<br>
          - 專長領域：資訊安全防禦、後端 API 開發 (FastAPI)、Linux 系統管理、Docker 容器化<br>
          - 核心特質：重視根本原因剖析、以 Log 驗證數據、具備藍隊實戰防守思維
        `);
        break;

      case "cat projects":
      case "projects":
        appendLine(`
          <div style="color:var(--neon-primary)">[PROJ_01] ARKAI 照護方舟 (AI × 資安 × 醫療)</div>
          - 本地敏感病歷去識別化，防止個資洩漏<br>
          - FastAPI 後端 + Docker Compose 多容器編排<br><br>
          <div style="color:var(--neon-primary)">[PROJ_02] Metis 校務門戶攻防演練 (Blue Team)</div>
          - 藍隊防守：未授權目錄清查、弱密碼與敏感檔加固<br>
          - 惡意 IP 阻擋、存取日誌監控與容災備份
        `);
        break;

      case "skills":
        appendLine(`
          <strong>[ARSENAL / 技術清單]</strong><br>
          [OS & System] : Linux (Ubuntu), Bash, Nginx, Systemd, Logging<br>
          [Backend Dev] : Python 3, FastAPI, RESTful APIs, PostgreSQL, Redis<br>
          [DevOps/Ops]  : Docker, Docker Compose, Git / GitHub<br>
          [Security]    : Blue Team Defense, Data Anonymization, Hardening
        `);
        break;

      case "education":
        appendLine(`
          [DEGREE] 國立臺中科技大學 - 資訊工程系 (學士畢業)<br>
          紮實核心：計算機組織、資料結構、演算法、作業系統、計算機網路、資料庫。
        `);
        break;

      case "contact":
        appendLine(`
          [CONTACT INFORMATION]<br>
          - GitHub : <a href="https://github.com/taiyuhuang591" target="_blank" style="color:var(--neon-primary)">https://github.com/taiyuhuang591</a><br>
          - Email  : taiyuhuang591@gmail.com
        `);
        break;

      case "matrix":
        const matrixBtn = document.getElementById("matrix-toggle");
        if (matrixBtn) matrixBtn.click();
        appendLine(`<span class="success-text">[OK] Matrix 視覺模式狀態已反轉！</span>`);
        break;

      case "sudo hire terry":
      case "sudo hire":
        playCyberSound("success");
        appendLine(`
          <span style="color:#00ff66; font-size:1.05rem; font-weight:700;">
          🎉 [PERMISSION GRANTED] 恭喜解鎖最佳技術夥伴！
          </span><br>
          Terry 具備踏實的排錯態度與資安防禦思維，已準備好全力投入您的專案！<br>
          請寄信至：<span style="color:var(--neon-warning)">taiyuhuang591@gmail.com</span>
        `);
        break;

      case "clear":
        terminalBody.innerHTML = `
          <div class="term-line welcome-line"><span class="highlight-cyan">[TERRY-OS v3.8.4]</span> Terminal Cleared.</div>
        `;
        break;

      default:
        appendLine(`<span style="color:#ff5f56;">bash: command not found: ${cmdStr}.</span> 輸入 <span class="highlight-cyan">help</span> 查看指令。`);
        break;
    }
  }
}
