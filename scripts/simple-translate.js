/**
 * ⚡ Simple Translation Script
 * کارکردوو و ئامادەی بەکارهێنان - تەنها OpenAI API Key پێویستە
 */

const fs = require('fs');
const path = require('path');

// ===============================================
// تێبینی: پێویستە OpenAI package دابمەزرێنیت:
// npm install openai
// ===============================================

async function simpleTranslate() {
  try {
    // بەکارهێنانی dynamic import بۆ ESM modules
    const { OpenAI } = await import('openai');

    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('\n❌ ERROR: OPENAI_API_KEY نەدۆزرایەوە!\n');
      console.log('📝 تکایە API key زیاد بکە بە یەکێک لەم ڕێگایانە:\n');
      console.log('1. لە فایلی .env.local:');
      console.log('   OPENAI_API_KEY=sk-proj-...\n');
      console.log('2. یان لە terminal:');
      console.log('   set OPENAI_API_KEY=sk-proj-...\n');
      console.log('3. وەرگرتنی API key لە: https://platform.openai.com/api-keys\n');
      process.exit(1);
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    console.log('\n🤖 Starting AI Translation...\n');
    console.log('📁 Reading translations.ts...\n');

    // خوێندنەوەی فایل
    const translationsPath = path.join(__dirname, '../lib/translations.ts');
    
    if (!fs.existsSync(translationsPath)) {
      console.error('❌ translations.ts نەدۆزرایەوە!');
      process.exit(1);
    }

    const content = fs.readFileSync(translationsPath, 'utf8');

    // دۆزینەوەی translation keys کە بەتاڵن
    const keys = [];
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // دۆزینەوەی key name
      const keyMatch = line.match(/(\w+):\s*{/);
      if (keyMatch && i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const transMatch = nextLine.match(/en:\s*"([^"]+)",\s*ku:\s*"([^"]*)",\s*ar:\s*"([^"]*)",\s*tr:\s*"([^"]*)"/);
        
        if (transMatch) {
          const [, en, ku, ar, tr] = transMatch;
          
          // ئەگەر هەر کام لە وەرگێڕانەکان بەتاڵ بن
          if (!ku || !ar || !tr) {
            keys.push({
              key: keyMatch[1],
              en,
              lineNumber: i,
              needsKu: !ku,
              needsAr: !ar,
              needsTr: !tr
            });
          }
        }
      }
    }

    if (keys.length === 0) {
      console.log('✅ هەموو وەرگێڕانەکان تەواون!\n');
      return;
    }

    console.log(`📊 ${keys.length} translation key دۆزرایەوە کە پێویستیان بە وەرگێڕانە\n`);

    // وەرگێڕانی هەر key-یەک
    let newContent = content;
    let translatedCount = 0;

    for (const item of keys) {
      console.log(`\n🔄 [${translatedCount + 1}/${keys.length}] Translating: "${item.key}"`);
      console.log(`   📝 EN: "${item.en}"`);

      try {
        const translations = {};

        // وەرگێڕان بۆ کوردی
        if (item.needsKu) {
          console.log('   ⏳ Translating to Kurdish...');
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a professional translator. Translate ONLY the text to Kurdish (Sorani). Output only the translation, no explanations, no quotation marks."
              },
              {
                role: "user",
                content: item.en
              }
            ],
            temperature: 0.3,
            max_tokens: 200
          });
          translations.ku = response.choices[0].message.content.trim();
          console.log(`   ✅ KU: "${translations.ku}"`);
        }

        // وەرگێڕان بۆ عەرەبی
        if (item.needsAr) {
          console.log('   ⏳ Translating to Arabic...');
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a professional translator. Translate ONLY the text to Arabic. Output only the translation, no explanations, no quotation marks."
              },
              {
                role: "user",
                content: item.en
              }
            ],
            temperature: 0.3,
            max_tokens: 200
          });
          translations.ar = response.choices[0].message.content.trim();
          console.log(`   ✅ AR: "${translations.ar}"`);
        }

        // وەرگێڕان بۆ تورکی
        if (item.needsTr) {
          console.log('   ⏳ Translating to Turkish...');
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a professional translator. Translate ONLY the text to Turkish. Output only the translation, no explanations, no quotation marks."
              },
              {
                role: "user",
                content: item.en
              }
            ],
            temperature: 0.3,
            max_tokens: 200
          });
          translations.tr = response.choices[0].message.content.trim();
          console.log(`   ✅ TR: "${translations.tr}"`);
        }

        // گۆڕینی فایلەکە
        const oldLine = new RegExp(
          `${item.key}:\\s*{\\s*en:\\s*"${item.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",\\s*ku:\\s*"[^"]*",\\s*ar:\\s*"[^"]*",\\s*tr:\\s*"[^"]*"`
        );

        const newLine = `${item.key}: { en: "${item.en}", ku: "${translations.ku || ''}", ar: "${translations.ar || ''}", tr: "${translations.tr || ''}"`;

        newContent = newContent.replace(oldLine, newLine);
        translatedCount++;

        // چاوەڕوانکردنی 1 چرکە بۆ ئەوەی rate limit نەخوات
        if (translatedCount < keys.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

      } catch (error) {
        console.error(`   ❌ Error: ${error.message}`);
        if (error.code === 'insufficient_quota') {
          console.error('\n💰 API quota تەواو بووە! تکایە credit زیاد بکە لە:');
          console.error('   https://platform.openai.com/account/billing\n');
          break;
        }
      }
    }

    // نووسینی فایلی نوێ
    if (translatedCount > 0) {
      fs.writeFileSync(translationsPath, newContent, 'utf8');
      console.log('\n\n✅ Translation تەواو بوو!');
      console.log(`📊 ${translatedCount} key وەرگێڕا`);
      console.log(`📁 فایل نوێ کرایەوە: ${translationsPath}`);
      
      // حیسابی نرخ
      const estimatedTokens = translatedCount * 50; // تێکڕا هەر وەرگێڕانێک ~50 token
      const estimatedCost = (estimatedTokens / 1000000) * 0.50;
      console.log(`💰 نرخی تێکڕایی: $${estimatedCost.toFixed(4)} (${estimatedTokens} tokens)\n`);
    }

  } catch (error) {
    console.error('\n❌ هەڵەیەک ڕوویدا:', error.message);
    
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('\n📦 تکایە OpenAI package دابمەزرێنە:');
      console.log('   npm install openai\n');
    }
  }
}

// ===============================================
// چۆنیەتی بەکارهێنان:
// ===============================================
// 
// 1. دامەزراندن:
//    npm install openai
// 
// 2. API key زیادکردن:
//    لە .env.local: OPENAI_API_KEY=sk-proj-...
//    یان لە terminal: set OPENAI_API_KEY=sk-proj-...
// 
// 3. ڕێپێدان:
//    node scripts/simple-translate.js
// 
// ===============================================

if (require.main === module) {
  // Load .env.local if exists
  const envPath = path.join(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value;
        }
      }
    });
  }

  simpleTranslate().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { simpleTranslate };
