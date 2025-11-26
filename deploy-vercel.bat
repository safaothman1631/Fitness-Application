@echo off
cd /d "C:\Users\SAFA\OneDrive\Desktop\code[2]"
echo Current directory: %CD%
echo.
echo Deploying to Vercel...
echo.
vercel --yes
echo.
echo Deployment complete!
pause
