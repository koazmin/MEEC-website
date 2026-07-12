# MEEC Website — Technical & Maintenance Guide

> **meec.edu.mm** ရဲ့ တည်ဆောက်ပုံ၊ အလုပ်လုပ်ပုံနဲ့ နောက်ပိုင်း ထိန်းသိမ်း/ပြင်ဆင်နည်း အပြည့်အစုံ။
> နောက်ဆုံး update: July 2026

---

## 1. Overview — စနစ်တစ်ခုလုံး အလုပ်လုပ်ပုံ

```
ကိုယ့်စက် (~/Developer/MEEC website)
        │  git push
        ▼
GitHub (koazmin/MEEC-website)  ←— code အားလုံးရဲ့ တရားဝင် အရင်းအမြစ် + backup
        │  auto-deploy (push တိုင်း ၁-၂ မိနစ်)
        ▼
Vercel (meec-website.vercel.app)  ←— site ကို build + host
        │
        ▼
https://www.meec.edu.mm  ←— domain (DNS: Worldwide Myanmar ရဲ့ Cloudflare)

Contact form → cPanel SMTP (mail.meec.edu.mm) → inquiry@meec.edu.mm
```

**အဓိက သဘောတရား:** Code ကို ဘယ်နေရာက ပြင်ပြင် — **GitHub `main` branch ကို push ရောက်မှ** live site ပြောင်းတယ်။ Vercel မှာ ကိုယ်တိုင် ဘာမှ လုပ်စရာမလို။

---

## 2. Tech Stack

| အပိုင်း | Technology | Version |
|---|---|---|
| Framework | **Next.js** (App Router) | 15.x |
| UI | **React** + **TypeScript** | 19 / 5.7 |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | 4.x |
| Animation | **Framer Motion** | 11.x |
| Email | **nodemailer** (cPanel SMTP) | 9.x |
| Fonts | Fraunces (ခေါင်းစဉ်) · Plus Jakarta Sans (စာကိုယ်) · Noto Sans Myanmar | — |
| Hosting | Vercel (free Hobby plan) | — |
| Node.js (local dev) | v22 LTS (`/opt/homebrew/opt/node@22`) | 22.x |

⚠️ **Tailwind v4 သတိပြုရန်:** gradient class တွေက `bg-gradient-to-r` မဟုတ်တော့ဘဲ **`bg-linear-to-r`** ဖြစ်တယ်။ အဟောင်းနာမည်သုံးရင် gradient မပေါ်ဘဲ silent fail ဖြစ်တယ်။

---

## 3. Project Structure — ဘယ်ဖိုင်က ဘာအတွက်လဲ

```
app/                    ← page တစ်ခုချင်း (URL နဲ့ folder နာမည် တိုက်ရိုက်ဆိုင်)
  page.tsx              ← Home
  about/page.tsx        ← /about
  programs/page.tsx     ← /programs
  japanese/page.tsx     ← /japanese
  oes/page.tsx          ← /oes
  mvi/page.tsx          ← /mvi
  blog/page.tsx         ← /blog (list)
  blog/[slug]/page.tsx  ← blog post တစ်ခုချင်း
  recruitments/page.tsx ← /recruitments
  contact/page.tsx      ← /contact
  api/inquiry/route.ts  ← contact form ရဲ့ email ပို့တဲ့ backend
  globals.css           ← color tokens, keyframe animations
lib/
  content.ts            ★ စာသား/data အားလုံး ဒီတစ်ဖိုင်တည်းမှာ ★
components/             ← UI component တွေ (Hero, PageHero, Programs, ...)
  effects/              ← animation effect တွေ (SakuraDrift, FlightPath, ...)
public/meec/            ← ပုံ/video အားလုံး (URL: /meec/...)
.env.local              ← local secrets (git ထဲမပါ) — SMTP password
```

**အရေးကြီးဆုံး ဖိုင် = `lib/content.ts`** — စာသားပြင်တာ၊ program/course/trainer/blog ထည့်နှုတ်တာ အားလုံးက ဒီဖိုင်ထဲမှာပဲ။ Design မထိဘဲ content ပြင်လို့ရအောင် သီးသန့်ခွဲထားတာ။

---

## 4. Content ပြင်နည်း — အသုံးများဆုံး လုပ်ငန်းများ

> အလွယ်ဆုံးနည်း — **Claude Code ကို မြန်မာလိုပြောရုံ။** အောက်ကတွေက ကိုယ်တိုင်ပြင်ချင်ရင် ဘယ်နေရာကို ကြည့်ရမလဲ ဆိုတာပါ။ ပြင်ပြီးတိုင်း commit + push လုပ်မှ live ရောက်မယ်။

### Blog မှာ YouTube video post ထည့်ရန်
`lib/content.ts` ရဲ့ `blogPosts` array ထိပ်ဆုံးမှာ:
```ts
{
  slug: "my-new-video",                      // URL ဖြစ်မယ့် နာမည် (English, dash)
  title: "My New Video Title",
  date: "August 2026",
  excerpt: "တိုတိုတုတ်တုတ် ဖော်ပြချက်",
  image: "/meec/blog/thumbnail.jpg",         // thumbnail ပုံ (public/meec/blog/ ထဲထည့်)
  youtube: "https://youtu.be/VIDEO_ID",      // watch/share/shorts link အကုန်ရ
},
```
- YouTube **Shorts** link ဆိုရင် ဒေါင်လိုက် (9:16) player အလိုအလျောက် ဖြစ်မယ်
- Video ကို YouTube မှာ **Unlisted** တင်ထားလို့ရတယ်။ Hover မှာပေါ်တဲ့ title က YouTube က title မို့ YouTube Studio မှာ လှလှရေးထားပါ

### Program card ပြင်/ထည့်ရန် (Programs page)
`lib/content.ts` → `programs` array။ Card တစ်ခုမှာ `name, track, duration, blurb, detail` + popup အတွက် `info` (overview, entry, subjects, levels, groups)။ Track အသစ်ထည့်ရင် `programTracks` နဲ့ `components/Programs.tsx` ရဲ့ `trackIcon` မှာပါ ထည့်ရမယ်။

### MVI course / trainer ပြင်ရန်
`lib/content.ts` → `mvi.courses` (name + body) နဲ့ `mvi.trainerProfiles` (name, role, photo, quals[])။ Trainer ပုံအသစ်ကို `public/meec/mvi/` ထဲထည့် — **စတုရန်း (square) crop, ခေါင်းနဲ့ပခုံး ပြည့်အောင်** ဖြတ်ထားတာ အကောင်းဆုံး။

### ဆက်သွယ်ရန် ဖုန်း/လိပ်စာ/social link ပြင်ရန်
`lib/content.ts` → အပေါ်ဆုံး `site` object။

### ပုံ ထည့်/လဲရန်
ပုံကို `public/meec/...` ထဲထည့်ပြီး code ထဲမှာ `/meec/...` path နဲ့ ညွှန်း။ Web အတွက် 1200px အကျယ်လောက် ချုံ့ထားရင် အကောင်းဆုံး။

---

## 5. Local Development — ကိုယ့်စက်မှာ run နည်း

```bash
cd ~/Developer/"MEEC website"          # ⚠️ ဒီ path ကိုပဲသုံး — iCloud ထဲက အဟောင်းကို မသုံးရ
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
npm install                            # ပထမတစ်ကြိမ် / package ပြောင်းရင်
npm run dev                            # http://localhost:3000
npx tsc --noEmit                       # type error စစ် (push မလုပ်ခင် အမြဲစစ်ပါ)
```

ပြင်ပြီးရင် live တင်ဖို့:
```bash
git add -A
git commit -m "describe the change"
git push origin main                   # ← ဒါနဲ့ Vercel auto-deploy ဖြစ်ပြီ
```

### ⚠️ iCloud အန္တရာယ် (ဖြစ်ခဲ့ဖူးတဲ့ ပြဿနာ)
Project အဟောင်းက `~/Documents/Antigravity/` (iCloud sync) ထဲမှာရှိပြီး iCloud "Optimize Mac Storage" က ဖိုင်တွေကို offload လုပ်လို့ **git/npm/dev server တွေ ခဏခဏ ပျက်ခဲ့တယ်** (`.git` ထဲထိ ပျက်တာ ကြုံခဲ့)။ ဒါကြောင့် **2026-07-09 မှာ `~/Developer/` ကို ရွှေ့ပြီးပြီ** — iCloud မ sync တဲ့နေရာမို့ ပြဿနာမရှိတော့ဘူး။ Folder ဟောင်းကို ဖျက်လို့ရတယ် (GitHub မှာ အကုန်ရှိ)။

### Git credentials
စက်ထဲမှာ GitHub account ၂ခု ရှိတယ် — **koazmin** (ဒီ repo ပိုင်ရှင်) နဲ့ captazm။ ဒီ repo မှာ koazmin credential သုံးအောင် local git config နဲ့ ချိတ်ပြီးသား။ `gh auth setup-git` ကို ဒီ repo ထဲမှာ **မ run ပါနဲ့** (credential ရှုပ်သွားမယ်)။

---

## 6. Hosting, Domain & Email အသေးစိတ်

### Vercel
- Project: **meec-website** (Hobby plan, အခမဲ့)
- GitHub `main` push တိုင်း auto-build + deploy (~၁-၂ မိနစ်)
- Build ကျိုးရင် — Vercel dashboard → Deployments → error log ကြည့်။ ကျိုးရင် live site က **အဟောင်းအတိုင်း ဆက်ရှိတယ်** (down မဖြစ်ဘူး)

### Domain (meec.edu.mm)
- DNS zone က **Worldwide Myanmar (hosting provider) ရဲ့ Cloudflare account** ထဲမှာ — ကိုယ်တိုင် ဝင်ပြင်လို့မရ၊ ပြင်ချင်ရင် WWM ကို တောင်းဆိုရမယ်
- လက်ရှိ setup: `meec.edu.mm` A → `76.76.21.21` (Vercel), `www` CNAME → `fee1343a12f1eba8.vercel-dns-017.com`, နှစ်ခုစလုံး **Proxy OFF (DNS only)**
- `mail`, `MX`, SPF/DKIM record တွေက cPanel server (95.111.200.15) ဆီ ညွှန်နေတယ် — **ဘယ်တော့မှ မပြင်ရ** (email ပျက်မယ်)
- ⚠️ **Domain/hosting သက်တမ်းတိုးဖို့ မမေ့ပါနဲ့** — expire ရင် site ရော email ရော အကုန်ရပ်မယ်

### Contact Form Email
- Route: `app/api/inquiry/route.ts` — nodemailer နဲ့ cPanel SMTP ကနေ ပို့တယ်
- ရောက်တဲ့နေရာ: **inquiry@meec.edu.mm** (cPanel webmail / ဖုန်း mail app နဲ့ ဖတ်)
- Reply-to က ဖောင်ဖြည့်သူ email မို့ တိုက်ရိုက် Reply လို့ရ
- **Env variables** (Vercel → Settings → Environment Variables + local `.env.local`):

| Variable | Value |
|---|---|
| `SMTP_HOST` | `mail.meec.edu.mm` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `inquiry@meec.edu.mm` |
| `SMTP_PASS` | (mailbox password — Vercel/env.local ထဲမှာသာ) |
| `INQUIRY_TO_EMAIL` | optional, မထည့်ရင် SMTP_USER |

- inquiry@meec.edu.mm ရဲ့ **password ပြောင်းရင်** Vercel env var ကိုပါ လိုက်ပြောင်းပြီး Redeploy လုပ်ရမယ်

---

## 7. Accounts စာရင်း

| Service | Account / နေရာ | ဘာအတွက် |
|---|---|---|
| GitHub | `koazmin/MEEC-website` | code + backup |
| Vercel | koazmin GitHub login | hosting, env vars, domain |
| cPanel | cpanel.meec.edu.mm (Worldwide Myanmar) | email (inquiry@), DNS zone ဟောင်း |
| Cloudflare | **WWM ပိုင်** — ကိုယ့် access မရှိ | တကယ့် DNS |
| YouTube | personal channel | blog video တွေ (Unlisted ရ) |

---

## 8. Troubleshooting — ပြဿနာဖြစ်ရင်

| ပြဿနာ | ဖြေရှင်းနည်း |
|---|---|
| Push ပြီးပေမယ့် site မပြောင်း | ၂-၃ မိနစ် စောင့် → browser hard refresh (Cmd+Shift+R)။ မရရင် Vercel Deployments မှာ build error စစ် |
| Local dev မှာ 500 / ENOENT ဆန်းဆန်း error | `rm -rf .next` ပြီး `npm run dev` ပြန်စ |
| `npm` / module error | `rm -rf node_modules && npm install` |
| Contact form "inbox isn't configured" | Vercel env var ၄ခု ရှိမရှိ + Redeploy လုပ်ပြီးပြီလား စစ် |
| Contact form 502 | SMTP password မှား/ပြောင်းထား — cPanel password နဲ့ Vercel `SMTP_PASS` တိုက်စစ် |
| Gradient တွေ မပေါ် | class နာမည် `bg-linear-to-*` (v4) ဖြစ်ရမယ်၊ `bg-gradient-to-*` မဟုတ် |
| git push 403 (captazm denied) | repo ထဲ `git config --local credential.helper ""` + `git config --local --add credential.helper store` ရှိမရှိ စစ် |
| အားလုံး ပျက်သွားရင် | GitHub မှာ code အကုန်ရှိတယ် — `git clone https://github.com/koazmin/MEEC-website.git` နဲ့ ပြန်စလို့ရ |

---

## 9. Maintenance Checklist

**လစဉ် (~၅ မိနစ်)**
- [ ] Contact form တစ်ခါ စမ်းတင် → inquiry@meec.edu.mm ရောက်လား
- [ ] Site ကို ဖုန်း + computer မှာ တစ်ချက်ဖွင့်ကြည့်

**၃–၆ လ တစ်ကြိမ်**
- [ ] `npm audit` ကြည့်ပြီး dependency update (`npm update` → `npx tsc --noEmit` → local စမ်း → push)
- [ ] cPanel hosting + domain သက်တမ်း စစ်

**နှစ်စဉ်**
- [ ] Content တွေ (program, fees, ဖုန်းနံပါတ်, trainer) update ဖြစ်နေလား ပြန်စစ်

**မလုပ်ရသေးတဲ့ အကြံပြုချက်များ (optional)**
- [ ] `sitemap.xml` + `robots.txt` ထည့်ပြီး Google Search Console မှာ submit (SEO)
- [ ] WordPress URL ဟောင်းတွေ (ဥပမာ `/our-programs/`) ကို path အသစ်ဆီ redirect
- [ ] Vercel Analytics ဖွင့် (visitor စာရင်း)
- [ ] Uptime monitor (UptimeRobot အခမဲ့)

---

## 10. Claude Code နဲ့ ဆက်လက် ပြင်ဆင်နည်း

ဒီ site ကို Claude Code နဲ့ ဆောက်/ထိန်းထားတာ။ ပြင်ချင်တာရှိရင်:

1. **ကိုယ့်စက်မှာ** — Claude Code ကို `~/Developer/MEEC website` မှာဖွင့်ပြီး မြန်မာလို ပြောရုံ (ပြင် → စစ် → push အကုန်လုပ်ပေးတယ်)
2. **ဖုန်း/ဘယ်နေရာကမဆို** — [claude.ai/code](https://claude.ai/code) မှာ `koazmin/MEEC-website` repo ချိတ်ပြီး cloud session နဲ့ ပြင်ခိုင်း (Mac ပိတ်ထားလည်းရ)
3. ဖုန်းကနေ ပြင်ပြီးရင် — Mac မှာ ပြန်လုပ်ခင် **`git pull` အရင်လုပ်ပါ**
