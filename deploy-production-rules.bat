@echo off
echo.
echo ================================================
echo   Deploying Production Firestore Security Rules
echo ================================================
echo.
echo Project: final-database-51935
echo Current Rules: firestore.rules (DEVELOPMENT - INSECURE!)
echo New Rules: firestore-production.rules (PRODUCTION - SECURE)
echo.
echo ⚠️  WARNING: This will replace your current rules!
echo.
pause

echo.
echo Backing up current rules...
firebase firestore:rules:get > firestore-backup-%date:~-4%%date:~-10,2%%date:~-7,2%.rules
echo ✅ Backup saved

echo.
echo Copying production rules...
copy /Y firestore-production.rules firestore.rules
echo ✅ Production rules copied

echo.
echo Deploying to Firebase...
firebase deploy --only firestore:rules --project final-database-51935

echo.
echo ================================================
echo   Deployment Complete!
echo ================================================
echo.
echo ✅ New security rules are now active
echo.
echo 🔍 Next Steps:
echo    1. Test your app thoroughly
echo    2. Check Firebase Console for denied requests
echo    3. Monitor: https://console.firebase.google.com/project/final-database-51935/firestore/rules
echo.
echo 📋 If something breaks:
echo    1. Restore backup: firebase deploy --only firestore:rules
echo    2. Or manually in Firebase Console
echo.
pause
