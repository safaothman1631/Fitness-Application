@echo off
cd /d "c:\Users\SAFA\OneDrive\Desktop\code[2]"
echo Current directory: %CD%
echo.
echo Deploying to Firebase...
echo.
call npx firebase deploy
echo.
echo Deployment complete!
pause
