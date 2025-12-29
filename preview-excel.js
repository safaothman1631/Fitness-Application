const XLSX = require('xlsx');
const path = require('path');

// Read Excel file
const workbook = XLSX.readFile(path.join(__dirname, '1500+ exercise data.xlsx'));
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const exercises = XLSX.utils.sheet_to_json(worksheet);

console.log(`Total exercises: ${exercises.length}`);
console.log('\nFirst 3 exercises:');
exercises.slice(0, 3).forEach((ex, i) => {
  console.log(`\n${i + 1}. ${JSON.stringify(ex, null, 2)}`);
});

console.log('\nColumn names:');
if (exercises.length > 0) {
  console.log(Object.keys(exercises[0]));
}
