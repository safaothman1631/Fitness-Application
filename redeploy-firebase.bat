@echo off
echo ========================================
echo  Firebase Redeploy with Environment Fix
echo ========================================
echo.

cd /d "C:\Users\SAFA\OneDrive\Desktop\code[2]"

echo Current directory: %CD%
echo.

echo Redeploying to Firebase with environment variables...
echo This may take 5-10 minutes...
echo.

call npx firebase deploy

echo.
echo ========================================
echo  Deployment Complete!
echo ========================================
echo.
echo Your app is live at:
echo https://final-database-51935.web.app
echo.
pause
