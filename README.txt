# 黃泰喻｜個人履歷與作品集網站 (CyberSec & Tech Edition)

## 檔案說明
- `index.html`：個人履歷結構、賽博龐克風格版面、專案經歷與核心能力
- `style.css`：暗黑科技風、霓虹發光漸層、3D 傾斜卡片、HUD 與響應式排版
- `script.js`：互動式駭客終端機 (Interactive Terminal)、神經網絡粒子與 Matrix 綠色代碼雨 Canvas 動畫、Web Audio 科幻音效、打字機動效、色彩主題切換

## 備份檔案
- `index.html.bak`：修改前的原始備份
- `style.css.bak`：修改前的原始備份

## 本機預覽
直接以瀏覽器開啟 `index.html`，或在該目錄下執行：
```bash
python3 -m http.server 8080
```
然後在瀏覽器開啟 `http://192.168.2.151:8080` 或本機 `http://localhost:8080` 預覽。

## 部署至 GitHub Pages
1. 將更新後的 `index.html`、`style.css`、`script.js` 提交並推播至 GitHub Repository：
   ```bash
   git add index.html style.css script.js README.txt
   git commit -m "feat: upgrade portfolio with cybersec terminal, matrix rain, and interactive canvas"
   git push origin main
   ```
2. 在 GitHub 倉儲的 Settings → Pages，確認 Branch 為 `main` / `root`。
