const fs = require('fs');
const path = require('path');

console.log('🔧 Migrating API routes to use Admin SDK...\n');

const routesToFix = [
  'app/api/users/route.ts',
  'app/api/users/[id]/route.ts',
  'app/api/workouts/route.ts',
  'app/api/workouts/[id]/route.ts',
  'app/api/access-keys/route.ts',
  'app/api/access-keys/[id]/route.ts',
  'app/api/settings/[userId]/route.ts',
  'app/api/physiotherapist/profile/route.ts',
];

// Mapping of Client SDK to Admin SDK
const replacements = [
  // Import statement
  {
    from: 'import { db } from "@/lib/firebase"',
    to: 'import { adminDb } from "@/lib/firebase-admin"'
  },
  // Import Firestore functions (remove them)
  {
    from: /import \{[^}]+\} from "firebase\/firestore"/g,
    to: '// Firestore functions not needed with Admin SDK'
  },
  // collection() usage
  {
    from: /collection\(db, "([^"]+)"\)/g,
    to: 'adminDb.collection("$1")'
  },
  // doc() usage
  {
    from: /doc\(db, "([^"]+)", ([^)]+)\)/g,
    to: 'adminDb.collection("$1").doc($2)'
  },
  // getDocs() -> get()
  {
    from: /await getDocs\(/g,
    to: 'await ('
  },
  // getDoc() -> get()
  {
    from: /await getDoc\(/g,
    to: 'await ('
  },
  // addDoc() -> add()
  {
    from: /await addDoc\(([^,]+),\s*(\{[^}]+\})\)/g,
    to: 'await $1.add($2)'
  },
  // updateDoc() -> update()
  {
    from: /await updateDoc\(/g,
    to: 'await ('
  },
  // deleteDoc() -> delete()
  {
    from: /await deleteDoc\(/g,
    to: 'await ('
  },
  // query() usage
  {
    from: /const q = query\(([^,]+), where\(([^)]+)\)\)/g,
    to: 'const q = $1.where($2)'
  },
  // doc.data()
  {
    from: /\.docs\.map\(\(doc\) => \(\{ id: doc\.id, \.\.\.doc\.data\(\) \}\)\)/g,
    to: '.docs.map(doc => ({ id: doc.id, ...doc.data() }))'
  },
];

let totalChanges = 0;

routesToFix.forEach(routePath => {
  const fullPath = path.join(__dirname, routePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${routePath}`);
    return;
  }
  
  console.log(`📝 Processing: ${routePath}`);
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changes = 0;
  
  // Apply all replacements
  replacements.forEach(({ from, to }) => {
    const before = content;
    content = content.replace(from, to);
    if (content !== before) {
      changes++;
    }
  });
  
  if (changes > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`   ✅ Applied ${changes} changes`);
    totalChanges += changes;
  } else {
    console.log(`   ℹ️  No changes needed`);
  }
});

console.log(`\n🎉 Migration complete!`);
console.log(`Total changes: ${totalChanges}`);
console.log(`\n⚠️  IMPORTANT: Please review the changes manually!`);
console.log(`Some complex queries may need manual adjustment.`);
