# Daily Automatic Backup System for Firebase

This system automatically backs up your entire Firebase Firestore database every day.

## ✅ What Gets Backed Up

All collections:
- ✅ Users & Profiles (users, trainers, physiotherapists)
- ✅ Medical Data (patients, physio-requests, appointments)
- ✅ Content (workouts, exercises, programs, videos)
- ✅ User Data (settings, notifications, logs, progress)
- ✅ Business Data (payments, subscriptions, access-keys)
- ✅ Community (posts, comments)
- ✅ System (system-logs)

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install @google-cloud/storage
```

### 2. Test Manual Backup

Run once to test:
```bash
node scripts/daily-backup.js
```

Or use the batch file:
```bash
.\run-backup.bat
```

### 3. Schedule Daily Backups

#### Option A: Windows Task Scheduler (Recommended for Windows)

1. Open **Task Scheduler** (تاسک شێدیولەر)
2. Click **Create Basic Task**
3. Name: `Firebase Daily Backup`
4. Trigger: **Daily** at 3:00 AM (یان کاتێکی تر)
5. Action: **Start a program**
   - Program: `cmd.exe`
   - Arguments: `/c "C:\A\run-backup.bat"`
   - Start in: `C:\A`
6. ✅ Save and test

**PowerShell Command to Create Task:**
```powershell
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument '/c "C:\A\run-backup.bat"' -WorkingDirectory "C:\A"
$trigger = New-ScheduledTaskTrigger -Daily -At 3:00AM
Register-ScheduledTask -TaskName "Firebase Daily Backup" -Action $action -Trigger $trigger -Description "Daily backup of Firebase Firestore database"
```

#### Option B: Cron Job (For Linux/Mac)

Add to crontab:
```bash
crontab -e

# Add this line (runs at 3 AM daily)
0 3 * * * cd /path/to/A && node scripts/daily-backup.js >> logs/backup.log 2>&1
```

#### Option C: Firebase Cloud Functions (Best for Production)

Deploy as a scheduled Cloud Function:

1. Create `functions/scheduled-backup.js`:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.dailyBackup = functions.pubsub
  .schedule('0 3 * * *') // Every day at 3 AM
  .timeZone('Asia/Baghdad') // Your timezone
  .onRun(async (context) => {
    // Copy backup logic from daily-backup.js
    console.log('Running scheduled backup...');
    // ... backup code ...
  });
```

2. Deploy:
```bash
firebase deploy --only functions
```

### 4. Cloud Storage Setup (Optional but Recommended)

Backups are automatically uploaded to Firebase Storage at:
```
gs://your-project.appspot.com/backups/backup_YYYY-MM-DD_HH-MM.json
```

Enable Storage in Firebase Console:
1. Go to Firebase Console
2. Storage → Get Started
3. Choose location
4. Done!

## 📁 Backup Locations

### Local Backups
```
C:\A\backups\
├── backup_2025-12-08_03-00.json
├── backup_2025-12-09_03-00.json
└── backup_2025-12-10_03-00.json
```

**Retention**: Last 7 days (older ones auto-deleted)

### Cloud Backups (Firebase Storage)
```
gs://final-database-51935.appspot.com/backups/
├── backup_2025-12-08_03-00.json
├── backup_2025-12-09_03-00.json
└── backup_2025-12-10_03-00.json
```

**Retention**: Manual deletion (keep as long as needed)

## 🔄 Restore from Backup

### Restore Script

Create `scripts/restore-backup.js`:

```javascript
const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Admin
// ... (same as daily-backup.js)

async function restoreBackup(backupFile) {
  console.log(`🔄 Restoring from: ${backupFile}`);
  
  const backup = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
  
  for (const collection of backup.collections) {
    console.log(`📦 Restoring ${collection.collection}...`);
    
    const batch = admin.firestore().batch();
    let count = 0;
    
    for (const doc of collection.documents) {
      const ref = admin.firestore()
        .collection(collection.collection)
        .doc(doc.id);
      
      batch.set(ref, doc.data);
      count++;
      
      // Commit batch every 500 documents
      if (count % 500 === 0) {
        await batch.commit();
      }
    }
    
    await batch.commit();
    console.log(`   ✅ ${count} documents restored`);
  }
  
  console.log('\n✅ Restore complete!');
}

// Usage
const backupFile = process.argv[2];
if (!backupFile) {
  console.error('Usage: node restore-backup.js <backup-file>');
  process.exit(1);
}

restoreBackup(backupFile);
```

### Restore Command

```bash
# Restore from local backup
node scripts/restore-backup.js backups/backup_2025-12-08_03-00.json

# Or download from cloud first
gsutil cp gs://your-project.appspot.com/backups/backup_2025-12-08_03-00.json backups/
node scripts/restore-backup.js backups/backup_2025-12-08_03-00.json
```

## 📊 Monitoring Backups

### Check Backup Status

Create `scripts/check-backups.js`:

```javascript
const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, '..', 'backups');
const files = fs.readdirSync(backupDir)
  .filter(f => f.startsWith('backup_'))
  .sort()
  .reverse();

console.log('📦 Recent Backups:\n');
files.forEach((file, i) => {
  const filePath = path.join(backupDir, file);
  const stats = fs.statSync(filePath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  
  console.log(`${i + 1}. ${file}`);
  console.log(`   Size: ${sizeMB} MB`);
  console.log(`   Date: ${stats.mtime.toLocaleString()}\n`);
});
```

Run: `node scripts/check-backups.js`

### Email Notifications (Optional)

Add email notification to backup script using nodemailer:

```bash
npm install nodemailer
```

```javascript
// Add to daily-backup.js
const nodemailer = require('nodemailer');

async function sendBackupNotification(backup) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'admin@yourapp.com',
    subject: `✅ Daily Backup Complete - ${backup.date}`,
    html: `
      <h2>Firebase Backup Summary</h2>
      <p><strong>Date:</strong> ${backup.date}</p>
      <p><strong>Collections:</strong> ${backup.summary.successfulCollections}/${backup.summary.totalCollections}</p>
      <p><strong>Documents:</strong> ${backup.summary.totalDocuments}</p>
      <p><strong>Status:</strong> ${backup.summary.failedCollections === 0 ? '✅ Success' : '⚠️ Partial'}</p>
    `
  });
}
```

## 🔧 Troubleshooting

### Backup Failed

1. **Check credentials**: Verify `.env.local` has correct Firebase keys
2. **Check permissions**: Firebase service account needs Firestore read access
3. **Check disk space**: Ensure enough space in `backups/` folder
4. **Check logs**: Look for error messages in console

### Scheduled Task Not Running

**Windows Task Scheduler:**
1. Open Task Scheduler
2. Find "Firebase Daily Backup"
3. Right-click → Run
4. Check "Last Run Result" column

**Fix Common Issues:**
- ✅ Task must run whether user is logged on or not
- ✅ Run with highest privileges
- ✅ Start in correct directory (`C:\A`)

### Large Backup Files

If backups are too large:
- Consider backing up only critical collections
- Compress backups: `npm install archiver`
- Use incremental backups (only changed documents)

## 📋 Backup Verification

### Daily Checklist

Add this to your morning routine:

```bash
# Check if backup ran
node scripts/check-backups.js

# Verify latest backup
node scripts/verify-backup.js backups/backup_2025-12-08_03-00.json
```

### Verification Script

Create `scripts/verify-backup.js`:

```javascript
const fs = require('fs');

const backupFile = process.argv[2];
const backup = JSON.parse(fs.readFileSync(backupFile, 'utf8'));

console.log('🔍 Verifying Backup...\n');
console.log(`📅 Date: ${backup.date}`);
console.log(`📦 Collections: ${backup.collections.length}`);
console.log(`📄 Documents: ${backup.summary.totalDocuments}`);

// Check for errors
const errors = backup.collections.filter(c => c.error);
if (errors.length > 0) {
  console.log(`\n⚠️  Errors found in ${errors.length} collections:`);
  errors.forEach(e => console.log(`   - ${e.collection}: ${e.error}`));
} else {
  console.log('\n✅ Backup is valid!');
}
```

## 🎯 Best Practices

1. **✅ Test restores monthly**: Don't wait for emergency
2. **✅ Keep multiple backups**: Cloud + Local
3. **✅ Monitor backup size**: Growing too fast?
4. **✅ Verify backup data**: Run verification script
5. **✅ Document restore process**: Practice makes perfect
6. **✅ Set up alerts**: Email on backup failure
7. **✅ Secure backups**: Encrypt sensitive data

## 💰 Cost Considerations

### Firebase Storage Pricing (Free Tier)
- ✅ 5GB storage free
- ✅ 1GB download/day free
- 💡 Typical backup: 1-10MB
- 💡 30 days of backups: ~300MB (well within free tier)

### Paid Tier (if needed)
- $0.026/GB/month storage
- $0.12/GB download

**Recommendation**: Free tier is plenty for most apps!

## 📞 Support

If backups fail consistently:
1. Check Firebase Console → Firestore → Data
2. Verify service account permissions
3. Check system clock (scheduled tasks)
4. Review error logs in `backups/` folder

---

## ✅ Quick Start Checklist

- [ ] Install dependencies: `npm install @google-cloud/storage`
- [ ] Test manual backup: `node scripts/daily-backup.js`
- [ ] Schedule daily task (Windows Task Scheduler or cron)
- [ ] Enable Firebase Storage in Console
- [ ] Test restore process once
- [ ] Set up monitoring/alerts (optional)

**Your database is now automatically backed up every day!** 🎉
