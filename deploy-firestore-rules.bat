@echo off
echo Deploying Firestore rules to Firebase...
firebase deploy --only firestore:rules
echo Done!
pause
