/**
 * Auto Translation Script
 * ئەم سکریپتە بە ئۆتۆماتیک هەموو translation keys وەردەگێڕێت
 */

const fs = require('fs');
const path = require('path');

// ===============================================
// چەند API Option هەیە:
// ===============================================

// 1️⃣ Google Translate API (بەلاش تا 500K کاراکتەر مانگانە)
// npm install google-translate-api-x

// 2️⃣ DeepL API (بەلاش تا 500K کاراکتەر مانگانە - باشترین کوالیتی)
// npm install deepl-node

// 3️⃣ OpenAI API (باشترین کوالیتی بۆ کوردی، بەڵام بە پارەیە)
// npm install openai

// ===============================================
// باشترین ڕێگا بۆ تۆ: OpenAI (چونکە کوردی باش وەردەگێڕێت)
// ===============================================

async function translateWithOpenAI(text, targetLang) {
  const { OpenAI } = require('openai');
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // خانەی API Key لە .env.local
  });

  const langMap = {
    'ku': 'Kurdish (Sorani)',
    'ar': 'Arabic',
    'tr': 'Turkish',
    'en': 'English'
  };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // ارزانترین مۆدێل ($0.5 / 1M tokens)
      messages: [
        {
          role: "system",
          content: `You are a professional translator. Translate ONLY the text, no explanations. Keep formatting, keep technical terms if needed. Target language: ${langMap[targetLang]}`
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error(`❌ Error translating to ${targetLang}:`, error.message);
    return text; // ئەگەر هەڵە ڕووبدات، تێکستی ئەسڵی دەگەڕێنێتەوە
  }
}

// ===============================================
// ڕێگای بەلاش: Google Translate
// ===============================================

async function translateWithGoogle(text, targetLang) {
  const translate = require('google-translate-api-x');
  
  const langMap = {
    'ku': 'ku', // Kurdish
    'ar': 'ar', // Arabic
    'tr': 'tr', // Turkish
    'en': 'en'  // English
  };

  try {
    const result = await translate(text, { to: langMap[targetLang] });
    return result.text;
  } catch (error) {
    console.error(`❌ Error translating to ${targetLang}:`, error.message);
    return text;
  }
}

// ===============================================
// ڕێگای ناوەڕاست: DeepL (باشترین کوالیتی، بەلاش تا 500K)
// ===============================================

async function translateWithDeepL(text, targetLang) {
  const deepl = require('deepl-node');
  
  const translator = new deepl.Translator(process.env.DEEPL_API_KEY);
  
  const langMap = {
    'ku': 'TR', // DeepL هیچ کوردی نییە، بەڵام تورکی نزیکە
    'ar': 'AR',
    'tr': 'TR',
    'en': 'EN-US'
  };

  try {
    const result = await translator.translateText(text, null, langMap[targetLang]);
    return result.text;
  } catch (error) {
    console.error(`❌ Error translating to ${targetLang}:`, error.message);
    return text;
  }
}

// ===============================================
// Main Translation Function
// ===============================================

async function autoTranslate() {
  console.log('🚀 Starting Auto Translation...\n');

  // خوێندنەوەی فایلی translations.ts
  const translationsPath = path.join(__dirname, '../lib/translations.ts');
  const content = fs.readFileSync(translationsPath, 'utf8');

  // دۆزینەوەی هەموو translation keys کە تەنها بە ئینگلیزی نووسراون
  const translationRegex = /(\w+):\s*{\s*en:\s*"([^"]+)",\s*ku:\s*"([^"]*)",\s*ar:\s*"([^"]*)",\s*tr:\s*"([^"]*)"/g;

  let match;
  const missingTranslations = [];

  while ((match = translationRegex.exec(content)) !== null) {
    const [, key, en, ku, ar, tr] = match;
    
    if (!ku || !ar || !tr) {
      missingTranslations.push({
        key,
        en,
        needsKu: !ku,
        needsAr: !ar,
        needsTr: !tr
      });
    }
  }

  if (missingTranslations.length === 0) {
    console.log('✅ All translations are complete!\n');
    return;
  }

  console.log(`📝 Found ${missingTranslations.length} keys with missing translations\n`);

  // هەڵبژاردنی API (بیگۆڕە بەپێی ئەوەی دەتەوێت)
  const USE_API = 'openai'; // 'openai' | 'google' | 'deepl'

  let translateFunc;
  switch(USE_API) {
    case 'openai':
      translateFunc = translateWithOpenAI;
      console.log('🤖 Using OpenAI API (Best for Kurdish)\n');
      break;
    case 'deepl':
      translateFunc = translateWithDeepL;
      console.log('🔷 Using DeepL API (Best quality, but no Kurdish)\n');
      break;
    case 'google':
    default:
      translateFunc = translateWithGoogle;
      console.log('🌐 Using Google Translate API (Free)\n');
      break;
  }

  // وەرگێڕانی هەر key-یەک
  let updatedContent = content;

  for (const item of missingTranslations) {
    console.log(`\n🔄 Translating: ${item.key}`);
    console.log(`   EN: "${item.en}"`);

    const translations = {
      ku: item.needsKu ? await translateFunc(item.en, 'ku') : null,
      ar: item.needsAr ? await translateFunc(item.en, 'ar') : null,
      tr: item.needsTr ? await translateFunc(item.en, 'tr') : null
    };

    if (translations.ku) console.log(`   ✅ KU: "${translations.ku}"`);
    if (translations.ar) console.log(`   ✅ AR: "${translations.ar}"`);
    if (translations.tr) console.log(`   ✅ TR: "${translations.tr}"`);

    // گۆڕینی کۆدەکە
    const oldPattern = new RegExp(
      `${item.key}:\\s*{\\s*en:\\s*"${item.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",\\s*ku:\\s*"[^"]*",\\s*ar:\\s*"[^"]*",\\s*tr:\\s*"[^"]*"`
    );

    const newTranslation = `${item.key}: { en: "${item.en}", ku: "${translations.ku || ''}", ar: "${translations.ar || ''}", tr: "${translations.tr || ''}"`;

    updatedContent = updatedContent.replace(oldPattern, newTranslation);

    // چاوەڕوانکردنی 500ms بۆ ئەوەی API limit نەخورێ
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // نووسینی فایلی نوێ
  fs.writeFileSync(translationsPath, updatedContent, 'utf8');

  console.log('\n\n✅ Translation completed successfully!');
  console.log(`📝 Updated ${missingTranslations.length} translations`);
  console.log(`📁 File: ${translationsPath}\n`);
}

// ===============================================
// ڕێگای جێبەجێکردن
// ===============================================

// بەکارهێنان:
// 1. دامەزراندنی پێویستەکان:
//    npm install openai
//    # یان
//    npm install google-translate-api-x
//    # یان
//    npm install deepl-node

// 2. زیادکردنی API key لە .env.local:
//    OPENAI_API_KEY=sk-...
//    # یان
//    DEEPL_API_KEY=...

// 3. ڕێپێدان:
//    node scripts/auto-translate.js

if (require.main === module) {
  autoTranslate().catch(console.error);
}

module.exports = { autoTranslate };
