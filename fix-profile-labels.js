const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', 'profile', 'page.tsx');

console.log('🔧 Fixing profile labels...');

// Read file
let content = fs.readFileSync(filePath, 'utf8');

// Replace all text-slate-400 text-xs with text-gray-200 text-sm font-medium
const before = content.match(/text-slate-400 text-xs/g);
content = content.replace(/text-slate-400 text-xs/g, 'text-gray-200 text-sm font-medium');
const after = content.match(/text-gray-200 text-sm font-medium/g);

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log(`✅ Updated ${before ? before.length : 0} labels`);
console.log(`✅ All labels are now: text-gray-200 text-sm font-medium`);
console.log('✅ Profile labels are now more visible!');
