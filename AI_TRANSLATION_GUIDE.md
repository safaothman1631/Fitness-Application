# 🤖 چۆنیەتی زیادکردنی AI Translation بۆ پرۆژەکەت

## 📋 پێرستی ناوەڕۆک
1. [بەراوردکردنی API-کان](#-بەراوردکردنی-api-کان)
2. [ڕاسپاردەی دامەزراندن](#-ڕاسپاردەی-دامەزراندن)
3. [بەکارهێنانی OpenAI (باشترین بۆ کوردی)](#-openai-باشترین-بۆ-کوردی)
4. [بەکارهێنانی Google Translate (بەلاش)](#-google-translate-بەلاش)
5. [بەکارهێنانی DeepL (باشترین کوالیتی)](#-deepl-باشترین-کوالیتی)

---

## 🎯 بەراوردکردنی API-کان

| API | نرخ (بەلاش) | نرخ (بە پارە) | کوالیتی کوردی | کوالیتی گشتی | باشترینە بۆ |
|-----|-------------|---------------|---------------|--------------|------------|
| **OpenAI** | $5 credit (یەکجار) | $0.50 / 1M tokens | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | **کوردی** |
| **Google Translate** | 500K/مانگ | $20 / 1M chars | ⭐⭐⭐ | ⭐⭐⭐⭐ | بەکارهێنانی زۆر |
| **DeepL** | 500K/مانگ | €4.99 / مانگ | ❌ کوردی نییە | ⭐⭐⭐⭐⭐ | عەرەبی/تورکی |
| **LibreTranslate** | بەلاش | بەلاش | ⭐⭐ | ⭐⭐ | self-hosted |

### 🏆 پێشنیارم بۆ تۆ: **OpenAI**
- باشترین کوالیتی بۆ کوردی
- $5 credit بەلاش بۆ سەرەتا (~10,000 وەرگێڕان)
- دوای ئەوە تەنها ~$0.50 بۆ هەموو پرۆژەکەت

---

## 🚀 ڕاسپاردەی دامەزراندن

### Step 1: دامەزراندنی Packages

```bash
# بۆ OpenAI (پێشنیار دەکرێت)
npm install openai

# یان بۆ Google Translate (بەلاش)
npm install google-translate-api-x

# یان بۆ DeepL
npm install deepl-node
```

### Step 2: وەرگرتنی API Key

#### بۆ OpenAI:
1. بڕۆ بۆ: https://platform.openai.com/signup
2. دروستکردنی Account (هەر ئیمەیڵێک کار دەکات)
3. بڕۆ بۆ: https://platform.openai.com/api-keys
4. کلیک لەسەر "Create new secret key"
5. کۆپی بکە: `sk-proj-...`

#### بۆ Google Translate:
1. بڕۆ بۆ: https://console.cloud.google.com
2. دروستکردنی پرۆژەیەکی نوێ
3. چالاککردنی "Cloud Translation API"
4. دروستکردنی API Key لە "Credentials"

#### بۆ DeepL:
1. بڕۆ بۆ: https://www.deepl.com/pro-api
2. Sign up بۆ Free plan (500K بەلاش)
3. کۆپیکردنی API Key

### Step 3: زیادکردنی API Key بۆ .env.local

```bash
# لە فایلی .env.local (دروستی بکە ئەگەر نەبێت)
OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE

# یان
GOOGLE_TRANSLATE_API_KEY=YOUR_KEY_HERE

# یان
DEEPL_API_KEY=YOUR_KEY_HERE
```

### Step 4: ڕێپێدانی Script

```bash
# ڕێپێدانی auto-translation
node scripts/auto-translate.js
```

---

## 🤖 OpenAI (باشترین بۆ کوردی)

### نرخەکان:
- **GPT-3.5-turbo**: $0.50 / 1M tokens (ارزانترین)
- **GPT-4o-mini**: $0.15 / 1M tokens (باشتر)
- $5 credit بەلاش بۆ سەرەتا

### حیسابی نرخ بۆ پرۆژەکەت:
```
تێکستی پرۆژەکەت ≈ 50,000 وشە
= ~70,000 tokens
= $0.035 (3.5 سەنت تەنها!)
```

### کۆدی بەکارهێنان:

```javascript
// scripts/translate-openai.js
const { OpenAI } = require('openai');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function translate(text, toLang) {
  const langMap = {
    'ku': 'Kurdish (Sorani)',
    'ar': 'Arabic',
    'tr': 'Turkish'
  };

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Translate to ${langMap[toLang]}. Only output the translation, no explanations.`
      },
      {
        role: "user",
        content: text
      }
    ],
    temperature: 0.3
  });

  return response.choices[0].message.content.trim();
}

// بەکارهێنان
translate("Welcome to your fitness journey", "ku")
  .then(result => console.log(result));
// Output: "بەخێربێیت بۆ گەشتی تەندروستیت"
```

---

## 🌐 Google Translate (بەلاش)

### نرخەکان:
- **500,000 کاراکتەر / مانگ**: بەلاش
- دوای ئەوە: $20 / 1M کاراکتەر

### کۆدی بەکارهێنان:

```javascript
// scripts/translate-google.js
const translate = require('google-translate-api-x');

async function translateGoogle(text, toLang) {
  const result = await translate(text, { to: toLang });
  return result.text;
}

// بەکارهێنان
translateGoogle("Welcome", "ku")
  .then(result => console.log(result));
// Output: "بەخێربێن"
```

---

## 🔷 DeepL (باشترین کوالیتی)

### نرخەکان:
- **500,000 کاراکتەر / مانگ**: بەلاش
- **Unlimited**: €4.99 / مانگ

### کێشە: DeepL هیچ کوردی نییە! 😢
بەڵام باشە بۆ عەرەبی و تورکی.

### کۆدی بەکارهێنان:

```javascript
// scripts/translate-deepl.js
const deepl = require('deepl-node');

const translator = new deepl.Translator(process.env.DEEPL_API_KEY);

async function translateDeepL(text, toLang) {
  const result = await translator.translateText(text, null, toLang);
  return result.text;
}

// بەکارهێنان
translateDeepL("Welcome", "AR")
  .then(result => console.log(result));
// Output: "مرحبا"
```

---

## ⚡ Quick Start (5 خولەک)

```bash
# 1. دامەزراندن
npm install openai

# 2. زیادکردنی API key بۆ .env.local
echo "OPENAI_API_KEY=sk-proj-YOUR_KEY" >> .env.local

# 3. ڕێپێدان
node scripts/auto-translate.js

# ✅ تەواو! هەموو translations دەکرێت بە ئۆتۆماتیک
```

---

## 🎨 دروستکردنی Translation Component بە AI

دەتوانیت component-ێک دروست بکەیت کە لە ڕاستەوخۆ وەردەگێڕێت:

```tsx
// components/ai-translator.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function AITranslator() {
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const translate = async (lang: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang: lang })
      })
      const data = await response.json()
      setResult(data.translation)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter English text..."
      />
      <div className="flex gap-2">
        <Button onClick={() => translate('ku')}>
          🇮🇶 Kurdish
        </Button>
        <Button onClick={() => translate('ar')}>
          🇸🇦 Arabic
        </Button>
        <Button onClick={() => translate('tr')}>
          🇹🇷 Turkish
        </Button>
      </div>
      {result && (
        <div className="p-4 bg-slate-800 rounded-lg">
          {result}
        </div>
      )}
    </div>
  )
}
```

```typescript
// app/api/translate/route.ts
import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  const { text, targetLang } = await request.json()

  const langMap = {
    'ku': 'Kurdish (Sorani)',
    'ar': 'Arabic',
    'tr': 'Turkish'
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Translate to ${langMap[targetLang]}. Only output the translation.`
      },
      {
        role: "user",
        content: text
      }
    ],
    temperature: 0.3
  })

  return NextResponse.json({
    translation: response.choices[0].message.content.trim()
  })
}
```

---

## 💰 خوێندنەوەی نرخەکان

### بۆ پرۆژەی تۆ (تێکستی ئێستا):
```
Translation Keys: ~200
وشەی هەر key: ~5 وشە
کۆی گشتی: 200 × 5 × 3 زمان = 3,000 وشە
= ~4,000 tokens

نرخ لەگەڵ OpenAI:
$0.50 / 1M tokens
= $0.002 (دوو هەزارەمی دۆلار!)
```

### بۆ پرۆژەیەکی گەورە:
```
10,000 translation keys
= ~150,000 وشە
= ~200,000 tokens
= $0.10 (10 سەنت تەنها!)
```

---

## ✅ پێشنیاری کۆتایی

1. **ئێستا**: بەکار بهێنە **OpenAI** بەلاش ($5 credit)
2. **دواتر**: ئەگەر تەواو بوو، بڕۆ بۆ **Google Translate** (500K بەلاش)
3. **پرۆداکشن**: ئەگەر زۆر بەکارهێنانت هەیە، بمێنەرەوە لەسەر **OpenAI** (ارزانترینە)

---

## 🎯 دواتر چی؟

دوای دامەزراندنی AI translation، دەتوانیت:

1. **Auto-translate on save**: کاتێک key-یەکی نوێ زیاد دەکەیت، ئۆتۆماتیک وەردەگێڕێت
2. **Translation review UI**: component-ێک بۆ پێداچوونەوە و ڕاستکردنەوەی وەرگێڕانەکان
3. **Context-aware translation**: وەرگێڕانی بەپێی context (بۆ نموونە "workout" لە gym vs "workout" لە planning)
4. **Translation memory**: پاشەکەوتکردنی وەرگێڕانە باوەکان بۆ خێراتر بوون

---

**ئایا ئامادەیت دەست پێ بکەیت؟** 🚀

بڵێ ئامادەم، با یەکەم ستێپەکان بۆت جێبەجێ بکەم!
