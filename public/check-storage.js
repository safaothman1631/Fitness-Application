// Simple test script to check localStorage
console.log("🔍 Checking localStorage for user data...\n");

console.log("Available keys in localStorage:");
console.log("- userId:", localStorage.getItem("userId") || "❌ Not found");
console.log("- userEmail:", localStorage.getItem("userEmail") || "❌ Not found");
console.log("- userName:", localStorage.getItem("userName") || "❌ Not found");
console.log("- userRole:", localStorage.getItem("userRole") || "❌ Not found");

console.log("\n📋 All localStorage keys:");
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`  ${key}: ${localStorage.getItem(key)}`);
}
