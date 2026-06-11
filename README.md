# LV Long 绿陇 — Exhibition Product Guide (PWA)

Single-file bilingual (中文 / English) product guide and WhatsApp order pad for
**LV Long Sdn Bhd**, built for exhibition use.

**Live URL (after enabling Pages):**
`https://stanleywoosweeleong.github.io/LvLongexpo/`

## What's in this repo
| File | Purpose |
|------|---------|
| `index.html` | The entire app (57 products, search, dosage calculator, cart, customer capture, WhatsApp export). All product data and images are inlined. |
| `manifest.json` | PWA manifest (installable "Add to Home Screen"). |
| `sw.js` | Service worker — offline support + update-on-load. |
| `icon-192.png`, `icon-512.png` | App icons (home screen / install). |
| `apple-touch-icon.png` | iOS home-screen icon. |
| `favicon.png` | Browser tab icon. |

All internal paths are **relative** (`./...`), so it works under any repo name
without editing.

## Exhibition notes
- All orders (中文 + English) route to one WhatsApp number: **010-863 3931**
  (`wa.me/60108633931`) — 绿陇马来西亚总代理 / Lv Long Sdn Bhd.
- Visitors enter their **name + Malaysian mobile**; the app normalizes the number
  (accepts `012-345 6789`, `0123456789`, `+60...`, `60...`, `0060...`, 011 numbers).
- Name + number are saved **on the visitor's device** and pre-filled next time.
  A **"Reset my info" / 清除我的资料** link clears it.
- On a **shared kiosk**, tap Reset between visitors. For self-service, prefer a
  **QR code** pointing at the live URL so each visitor uses their own phone.
- The layout is **responsive**: phones get the compact mobile view; on a
  desktop/tablet booth screen the header is larger and the category filters
  display as larger tiles for easier tapping.

## How to publish on GitHub Pages
1. Create a new repo named **`LvLongexpo`** under `stanleywoosweeleong`.
2. Upload **all files in this folder** to the repo root (keep filenames exactly).
3. Repo **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**,
   Branch: **`main`**, folder: **`/ (root)`**, Save.
4. Wait ~1 minute, then open
   `https://stanleywoosweeleong.github.io/LvLongexpo/`.
5. Generate a QR code for that URL for your booth banner.

> Tip: if you update `index.html` later, also bump `CACHE_VERSION` in `sw.js`
> (e.g. `v1.0.1`) so phones fetch the new version.
