/**
 * TERRY HUANG — CYBERSEC & BACKEND PORTFOLIO INTERACTION ENGINE
 * Features:
 * - Dynamic Particle Network & Matrix Code Rain Canvas (with Prefers-Reduced-Motion check)
 * - Safe Interactive Hacker Shell with Command Parser (XSS Sanitized, Non-root Resume Guide)
 * - Web Audio API Sci-Fi Synthesizer Sound Effects
 * - 3D Card Tilt with Pointer Detection
 * - Dynamic Typewriter, HUD Clock & Color Themes
 * - Robust One-Click Copy Email with Fallback
 */

document.addEventListener("DOMContentLoaded", () => {
  initHUDClock();
  initThemeSwitcher();
  initTypewriter();
  initTiltCards();
  initCopyEmail();
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
      showToast(`已切換色彩架構: [${theme.toUpperCase()}]`);
    });
  });
}

/* ==========================================================================
   3. Dynamic Typewriter Effect (Pragmatic & Honest Copy)
   ========================================================================== */
function initTypewriter() {
  const textEl = document.getElementById("typewriter-text");
  if (!textEl) return;

  const phrases = [
    "資安防禦 · 後端開發 · Linux 系統維運。",
    "重視排查根因，日誌分析與環境隔離驗證。",
    "FastAPI × Docker 容器化微服務實作經驗。",
    "藍隊實戰攻防 · 弱點加固與惡意 IP 阻擋。"
  ];

  // Respect user preference for reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    textEl.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 90;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      textEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      delay = 35;
    } else {
      textEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      delay = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      delay = 2400; // Pause at end of sentence
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 450;
    }

    setTimeout(type, delay);
  }
  type();
}

/* ==========================================================================
   4. 3D Tilt Effect on Cards
   ========================================================================== */
function initTiltCards() {
  // Only apply tilt on desktop devices with fine pointer and no reduced-motion
  if (window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const cards = document.querySelectorAll(".tilt-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

/* ==========================================================================
   5. One-Click Copy Email & Cyber Toast (With Robust Fallback)
   ========================================================================== */
function initCopyEmail() {
  const buttons = [
    document.getElementById("copy-email-btn"),
    document.getElementById("footer-copy-email-btn")
  ];

  buttons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      const email = btn.dataset.email || "taiyuhuang591@gmail.com";
      copyEmailToClipboard(email);
    });
  });
}

function copyEmailToClipboard(email) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => {
      showToast(`聯絡 Email [${email}] 已成功複製至剪貼簿！`);
    }).catch(() => {
      fallbackCopyText(email);
    });
  } else {
    fallbackCopyText(email);
  }
}

function fallbackCopyText(text) {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    textArea.setAttribute("readonly", "");
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    if (successful) {
      showToast(`聯絡 Email [${text}] 已成功複製至剪貼簿！`);
    } else {
      showToast(`Email: ${text}`);
    }
  } catch (err) {
    showToast(`Email: ${text}`);
  }
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "cyber-toast";
  toast.innerHTML = `<span style="color:var(--neon-primary)">[NOTICE]</span> ${message}`;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(15px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   6. Cyber Canvas: Particle Mesh & Matrix Rain Engine
   ========================================================================== */
let isMatrixMode = false;

function initCyberCanvas() {
  const canvas = document.getElementById("cyber-canvas");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle Mesh setup
  const particleCount = Math.min(Math.floor((width * height) / 15000), 70);
  const particles = [];
  const mouse = { x: null, y: null, radius: 130 };

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
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.8;
          this.y -= (dy / dist) * force * 1.8;
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
      showToast(isMatrixMode ? "MATRIX 視覺代碼雨已啟動" : "切換回神經網絡粒子模式");
    });
  }

  function render() {
    if (!isMatrixMode) {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 105) {
            ctx.strokeStyle = `rgba(0, 245, 212, ${0.15 * (1 - dist / 105)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    } else {
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
   8. Safe Interactive Hacker Shell (Resume Interactive Simulator)
   ========================================================================== */
function escapeHTML(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

  function appendLine(safeHTMLContent, className = "") {
    const line = document.createElement("div");
    line.className = `term-line ${className}`;
    line.innerHTML = safeHTMLContent;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function appendUserEcho(cmdStr) {
    const line = document.createElement("div");
    line.className = "term-line";
    const promptSpan = document.createElement("span");
    promptSpan.className = "prompt-text";
    promptSpan.textContent = "terry@sec:~$ ";
    line.appendChild(promptSpan);
    // Use createTextNode to ensure user input is strictly sanitized from HTML injection
    line.appendChild(document.createTextNode(cmdStr));
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function executeCommand(cmdStr) {
    appendUserEcho(cmdStr);

    const lower = cmdStr.toLowerCase().trim();

    switch (lower) {
      case "help":
        appendLine(`
          <div style="color:var(--neon-primary)">[履歷導覽模擬終端機 · 可用指令集]</div>
          • <span class="highlight-cyan">whoami</span> : 顯示黃泰喻個人履歷與求職方向<br>
          • <span class="highlight-cyan">skills</span> : 盤點技術核心能力及程度標示<br>
          • <span class="highlight-cyan">projects</span> : 顯示 ARKAI 與 Metis 專案摘要<br>
          • <span class="highlight-cyan">contact</span> : 顯示 GitHub 與 Email 聯絡管道<br>
          • <span class="highlight-cyan">sudo hire terry</span> : 觸發快速聯絡與聘用確認 🚀<br>
          • <span class="highlight-cyan">clear</span> : 清除目前終端機畫面<br>
          • <span class="highlight-cyan">matrix</span> : 切換 Matrix 代碼雨視覺模式
        `);
        break;

      case "whoami":
        appendLine(`
          <strong>[IDENTITY] 黃泰喻 (Terry Huang)</strong><br>
          - 學歷：國立臺中科技大學 資訊工程系畢業<br>
          - 簡介：在學期間接觸 Python、Linux、Docker 等技術，曾參與 ARKAI 照護系統及 Metis 紅藍隊攻防演練，從專案中累積系統開發、環境建置與資安實作的經驗。<br>
          - 求職方向：<span class="highlight-cyan">資安工程師 ｜ 後端工程師 ｜ MIS 工程師</span>
        `);
        break;

      case "skills":
        appendLine(`
          <strong>[ARSENAL / 技術能力與程度分級]</strong><br>
          <span style="color:#00ff66;">● [有實際操作經驗]</span><br>
          &nbsp;&nbsp;• Linux (Ubuntu/Debian 系統維運、Systemd、Bash、權限劃分)<br>
          &nbsp;&nbsp;• Python 3 後端開發、FastAPI 框架、RESTful API、Pydantic<br>
          &nbsp;&nbsp;• Docker / Docker Compose 容器編排、服務網路互通排查<br>
          &nbsp;&nbsp;• Git / GitHub 分支管理與版本協同<br>
          &nbsp;&nbsp;• 本地敏感資料去識別化遮罩、日誌排查 (Journal/Syslog)<br>
          <span style="color:var(--neon-primary);">▲ [專案中曾使用]</span><br>
          &nbsp;&nbsp;• PostgreSQL 資料庫串接與連線池排查、Nginx 反向代理<br>
          &nbsp;&nbsp;• 藍隊實戰防守、iptables/UFW 惡意 IP 阻擋、GCP VM 建置<br>
          <span style="color:var(--neon-warning);">◆ [正在學習 / 持續精進]</span><br>
          &nbsp;&nbsp;• Redis 快取架構、GitHub Actions CI/CD、SIEM 日誌關聯分析
        `);
        break;

      case "cat projects":
      case "projects":
        appendLine(`
          <div style="color:var(--neon-primary)">[PROJ_01] ARKAI 照護方舟 ｜ 智慧醫療去識別化</div>
          - 團隊專案：醫療院所本地端個資去識別化遮罩，防範敏感資料外洩<br>
          - 負責範疇：敏感特徵置換、送出前檢核、FastAPI/AI 串接、Docker Compose 部署排錯<br>
          - 關鍵排查：解決容器連線資料庫相依順序 (healthcheck retry loop)<br><br>
          <div style="color:var(--neon-primary)">[PROJ_02] Metis 紅藍隊攻防演練 ｜ 藍隊防守加固</div>
          - 藍隊防守：Linux VM 目標環境建置、未授權目錄與敏感檔 (.env) 封閉<br>
          - 實戰驗證：高頻探測 IP 阻擋 (iptables/UFW)、資料庫定時備份與災難復原演練
        `);
        break;

      case "education":
        appendLine(`
          [DEGREE] 國立臺中科技大學 - 資訊工程系 (學士學位畢業)<br>
          扎實課程：計算機組織、資料結構、演算法、作業系統、計算機網路、資料庫系統。
        `);
        break;

      case "contact":
        appendLine(`
          [CONTACT INFORMATION 聯絡管道]<br>
          - GitHub : <a href="https://github.com/taiyuhuang591-lang" target="_blank" rel="noopener noreferrer" style="color:var(--neon-primary)">https://github.com/taiyuhuang591-lang</a><br>
          - Email  : <a href="mailto:taiyuhuang591@gmail.com" style="color:var(--neon-primary)">taiyuhuang591@gmail.com</a><br>
          - 提示   : 點擊頁面上「一鍵複製 Email」按鈕可直接複製到剪貼簿。
        `);
        break;

      case "sudo hire terry":
      case "sudo hire":
      case "hire":
        appendLine(`
          <span style="color:#00ff66; font-size:1.02rem; font-weight:700;">
          🎉 [PERMISSION GRANTED] 感謝您的關注與肯定！
          </span><br>
          黃泰喻 (Terry Huang) 具備踏實的資安防護與後端維運戰力，積極尋求全職職缺：<br>
          <strong>資安工程師 ｜ 後端工程師 ｜ MIS 工程師</strong><br>
          歡迎來信聯繫：<a href="mailto:taiyuhuang591@gmail.com" style="color:var(--neon-warning); font-weight:bold;">taiyuhuang591@gmail.com</a>
        `);
        break;

      case "matrix":
        const matrixBtn = document.getElementById("matrix-toggle");
        if (matrixBtn) matrixBtn.click();
        appendLine(`<span class="success-text">[OK] Matrix 視覺模式狀態已反轉！</span>`);
        break;

      case "clear":
        terminalBody.innerHTML = `
          <div class="term-line welcome-line"><span class="highlight-cyan">[TERRY-OS v3.8.4]</span> 履歷導覽終端機已重置 (輸入 <span class="highlight-cyan">help</span> 查看指令)</div>
        `;
        break;

      default:
        const safeCmd = escapeHTML(cmdStr);
        appendLine(`<span style="color:#ff5f56;">bash: command not found: ${safeCmd}.</span> 輸入 <span class="highlight-cyan">help</span> 查看可用指令。`);
        break;
    }
  }
}
