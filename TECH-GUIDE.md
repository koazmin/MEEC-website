# MEEC Website — နည်းပညာနဲ့ ဖိုင်တည်ဆောက်ပုံ လမ်းညွှန်

ဒီစာတမ်းက meec.edu.mm website ကို ဘာနည်းပညာတွေနဲ့ ဆောက်ထားလဲ၊ ဖိုင်တွေက ဘယ်လိုစီစဉ်ထားလဲ ဆိုတာကို နားလည်လွယ်အောင် ရှင်းပြထားတာပါ။ (နေ့စဉ်ပြင်ဆင်နည်းတွေအတွက်ကတော့ `MAINTENANCE.md` ကိုကြည့်ပါ။)

---

## ၁။ အသုံးပြုထားတဲ့ နည်းပညာများ (Tech Stack)

| နည်းပညာ | ဗားရှင်း | ဘာအတွက်လဲ |
|---|---|---|
| **Next.js** | 15 | Website ရဲ့ အခြေခံ framework — စာမျက်နှာတွေဆောက်တာ၊ လိပ်စာ (URL) ခွဲတာ၊ ပုံတွေကို အလိုအလျောက် ချုံ့ပေးတာ |
| **React** | 19 | UI (မျက်နှာပြင်) ကို component အပိုင်းလေးတွေနဲ့ ဆောက်တဲ့ library |
| **TypeScript** | 5.7 | JavaScript ရဲ့ အမှားစစ်ပေးတဲ့ ဗားရှင်း — code မှာ typo ရှိရင် deploy မလုပ်ခင် ကြိုသိရတယ် |
| **Tailwind CSS** | 4 | ဒီဇိုင်း (အရောင်၊ အကွာအဝေး၊ font) ကို class နာမည်လေးတွေနဲ့ ရေးတဲ့စနစ် |
| **Framer Motion** | 11 | Animation တွေ — scroll လုပ်ရင် ပေါ်လာတာ၊ hover လုပ်ရင် လှုပ်တာတွေ |
| **Nodemailer** | 9 | Contact form ကနေ email ပို့ပေးတဲ့ library (cPanel SMTP နဲ့ချိတ်ထား) |

### ဝန်ဆောင်မှုများ (Services)

| ဝန်ဆောင်မှု | ဘာအတွက်လဲ |
|---|---|
| **GitHub** (`koazmin/MEEC-website`) | Code သိမ်းတဲ့နေရာ + backup + ပြင်ဆင်မှုမှတ်တမ်း (history) |
| **Vercel** | Website ကို hosting လုပ်ပေးတဲ့နေရာ — GitHub ကို push လုပ်လိုက်တာနဲ့ ၁-၂ မိနစ်အတွင်း အလိုအလျောက် deploy ဖြစ်တယ် |
| **cPanel SMTP** (`inquiry@meec.edu.mm`) | Contact form ရဲ့ email ပို့စနစ် — password က Vercel ရဲ့ Environment Variables ထဲမှာပဲရှိတယ် (git ထဲမှာ မရှိဘူး) |

### အလုပ်လုပ်ပုံ အဆင့်ဆင့်

```
ကွန်ပျူတာမှာ code ပြင်  →  git commit  →  git push (GitHub)
                                              ↓ (အလိုအလျောက်)
                                    Vercel က build + deploy
                                              ↓
                                       meec.edu.mm မှာ live
```

---

## ၂။ ဖိုင်တည်ဆောက်ပုံ (File Structure)

```
MEEC website/
├── app/                  ← စာမျက်နှာတွေ (URL တစ်ခုစီအတွက် folder တစ်ခု)
│   ├── page.tsx          ← Home page (meec.edu.mm/)
│   ├── layout.tsx        ← စာမျက်နှာအားလုံးရဲ့ အပြင်ဘောင် (font, header, footer)
│   ├── globals.css       ← အရောင် theme နဲ့ CSS စည်းမျဉ်းများ
│   ├── about/page.tsx    ← /about
│   ├── programs/page.tsx ← /programs
│   ├── japanese/page.tsx ← /japanese
│   ├── oes/page.tsx      ← /oes
│   ├── mvi/page.tsx      ← /mvi
│   ├── blog/             ← /blog နဲ့ /blog/[post-name]
│   ├── recruitments/     ← /recruitments
│   ├── contact/          ← /contact
│   └── api/inquiry/route.ts ← Contact form ရဲ့ email ပို့တဲ့ server code
│
├── components/           ← ပြန်သုံးလို့ရတဲ့ UI အစိတ်အပိုင်းများ
│   ├── SiteHeader.tsx    ← အပေါ်က navigation bar
│   ├── SiteFooter.tsx    ← အောက်ခြေ footer
│   ├── Hero.tsx          ← Home ရဲ့ ထိပ်ဆုံး video section
│   ├── Gallery.tsx       ← Campus life polaroid ဓါတ်ပုံပြခန်း
│   ├── EventsGallery.tsx ← "Moments from our community" (View all ခလုတ်ပါ)
│   ├── ZoomImage.tsx     ← ဓါတ်ပုံနှိပ်ရင် အကြီးချဲ့ပြတဲ့ lightbox
│   ├── Reveal.tsx        ← scroll လုပ်ရင် ဖြည်းဖြည်းပေါ်လာတဲ့ animation
│   ├── PageHero.tsx      ← စာမျက်နှာတိုင်းရဲ့ ထိပ်ဆုံး banner
│   └── effects/          ← အလှဆင် animation များ (sakura, particles, flight path)
│
├── lib/
│   └── content.ts        ★ အရေးအကြီးဆုံးဖိုင် — စာသားနဲ့ ဓါတ်ပုံလမ်းကြောင်း
│                           အားလုံးကို ဒီတစ်ဖိုင်တည်းမှာ စုသိမ်းထားတယ်
│
├── public/               ← ဓါတ်ပုံ၊ video၊ logo ဖိုင်အစစ်များ
│   └── meec/
│       ├── activity/     ← Campus life ဓါတ်ပုံများ
│       ├── moments/      ← Moments ဓါတ်ပုံ ၃၃ ပုံ
│       ├── about/  japanese/  oes/  mvi/  programs/  blog/ ...
│       └── logo.png, hero.mp4 စသည်
│
├── package.json          ← ဘယ် library တွေသုံးထားလဲ စာရင်း
├── next.config.mjs       ← Next.js ချိန်ညှိချက်
├── tsconfig.json         ← TypeScript ချိန်ညှိချက်
├── MAINTENANCE.md        ← နေ့စဉ်ထိန်းသိမ်းရေး လမ်းညွှန် (မြန်မာလို)
└── TECH-GUIDE.md         ← ဒီဖိုင်
```

---

## ၃။ သိထားသင့်တဲ့ အချက်အဓိကများ

### (က) စာသားပြင်ချင်ရင် `lib/content.ts` တစ်ဖိုင်တည်းကြည့်ပါ

Website ပေါ်က စာသားအားလုံး (ခေါင်းစဉ်၊ ဖော်ပြချက်၊ ဖုန်းနံပါတ်၊ ဆရာ/ဝန်ထမ်းအမည်၊ blog post၊ ဓါတ်ပုံလမ်းကြောင်း) က `lib/content.ts` ထဲမှာ စုထားတယ်။ ဒီဇိုင်းမပြင်ဘဲ စာသားပဲပြင်ချင်ရင် ဒီဖိုင်တစ်ခုတည်းပြင်ရုံပါပဲ။

ဥပမာ — ဖုန်းနံပါတ်ပြောင်းချင်ရင် `content.ts` ထဲက `phones` ကိုရှာပြီးပြင်၊ blog အသစ်တင်ချင်ရင် `blogPosts` array ထဲ ထပ်ထည့်။

### (ခ) ဓါတ်ပုံအသစ်ထည့်နည်း အကျဉ်း

1. ပုံကို `public/meec/(သက်ဆိုင်ရာ folder)/` ထဲကူးထည့်
2. `lib/content.ts` ထဲမှာ လမ်းကြောင်း (ဥပမာ `"/meec/activity/activity-17.jpg"`) ထည့်
3. commit + push → Vercel က အလိုအလျောက် deploy

### (ဂ) စာမျက်နှာတစ်ခုရဲ့ ဒီဇိုင်း/အခင်းအကျင်းပြင်ချင်ရင်

`app/(စာမျက်နှာနာမည်)/page.tsx` ကိုပြင်ပါ။ ဥပမာ OES page ရဲ့ section အစီအစဉ်ပြောင်းချင်ရင် `app/oes/page.tsx`။

### (ဃ) Password တွေ ဘယ်မှာလဲ

SMTP password လို လျှို့ဝှက်ချက်တွေက **git ထဲမှာ လုံးဝမရှိပါဘူး**။ Vercel Dashboard → Project Settings → Environment Variables ထဲမှာပဲ သိမ်းထားတယ်။ Local မှာစမ်းချင်ရင် `.env.local` ဖိုင် (git-ignore လုပ်ထား) ထဲမှာထည့်တယ်။

### (င) ပြင်ပြီးတိုင်း စစ်ဆေးတဲ့အဆင့်များ

```bash
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"
npx tsc --noEmit     # အမှားရှိမရှိ စစ် (TSC OK ဆိုရင် အဆင်ပြေ)
npm run dev          # localhost:3000 မှာ စမ်းကြည့်
git add -A && git commit -m "ပြင်ဆင်ချက် ဖော်ပြချက်"
git push origin main # → Vercel အလိုအလျောက် deploy
```

---

## ၄။ မကြာခဏမေးလေ့ရှိတဲ့ မေးခွန်းများ

**Q: Website က ဘယ်မှာ backup ရှိလဲ?**
A: ၃ နေရာ — (1) GitHub မှာ code + ပုံ + history အပြည့်၊ (2) Vercel မှာ deploy လုပ်ခဲ့သမျှ ဗားရှင်းတိုင်း (rollback လုပ်လို့ရ)၊ (3) ကွန်ပျူတာထဲက `~/Developer/MEEC website`။

**Q: တစ်ခုခုမှားသွားရင် ဘယ်လိုပြန်ပြင်လဲ?**
A: Vercel Dashboard ကနေ အရင် deployment ကို "Promote to Production" နဲ့ ချက်ချင်း rollback လုပ်လို့ရတယ်။ ဒါမှမဟုတ် git ကနေ အရင် commit ကို ပြန် checkout လုပ်လို့ရတယ်။

**Q: ဖိုင်တွေက iCloud ထဲမှာလား?**
A: အလုပ်လုပ်တဲ့ copy က `~/Developer/MEEC website` မှာပါ — iCloud sync မလုပ်တဲ့နေရာ ဖြစ်လို့ ဖိုင်ပျက်စီးမှုမရှိပါဘူး။ (iCloud ထဲက Documents copy ဟောင်းကို မသုံးပါနဲ့။)
