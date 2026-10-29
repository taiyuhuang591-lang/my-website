# 黃泰喻｜個人履歷與作品集網站 (CyberSec & Tech Edition)
網站網址：https://taiyuhuang591-lang.github.io/my-website/
原始碼庫：https://github.com/taiyuhuang591-lang/my-website

## 檔案說明
- `index.html`：個人履歷核心結構、賽博龐克資安終端機風格、務實求職專案 (ARKAI, Metis) 與分級技術能力清單。
- `style.css`：暗黑科技主題、霓虹發光漸層、3D 傾斜卡片、HUD、程度標籤與 375px 手機無溢出響應式排版。
- `script.js`：履歷導覽模擬終端機（含 XSS 安全轉義過濾）、神經網絡粒子與 Matrix 綠色代碼雨 Canvas 動畫、打字機動效、色彩主題切換與多重剪貼簿複製備援。

## 備份檔案
- `index.html.bak`：修改前的原始備份
- `style.css.bak`：修改前的原始備份

## 本機預覽
直接以瀏覽器開啟 `index.html`，或在該目錄下執行：
```bash
python -m http.server 8080
```
然後在瀏覽器開啟 `http://localhost:8080` 預覽。

## 模擬終端機支援指令
- `help`：列出可用指令清單
- `whoami`：輸出個人履歷簡介與求職方向
- `skills`：盤點技術能力庫（依實際操作、專案使用、正在學習分級）
- `projects`：顯示精選專案 (ARKAI, Metis)
- `contact`：顯示 GitHub 與 Email 聯絡管道
- `sudo hire terry`：觸發錄用邀請與聯絡資訊
- `clear`：清除終端機畫面
- `matrix`：切換 Matrix 視覺代碼雨模式

## 部署至 GitHub Pages
```bash
git add index.html style.css script.js README.txt
git commit -m "refactor: optimize resume content, skill tiers, real case studies, and terminal security"
git push origin main
```
在 GitHub 倉儲的 Settings → Pages，確認 Branch 為 `main` / `root`。
