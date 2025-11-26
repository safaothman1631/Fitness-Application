@echo off
cd /d "%~dp0"
echo.
echo ========================================
echo   Firebase Rules Deployment
echo ========================================
echo.
echo Current directory: %CD%
echo.
echo This will deploy OPEN rules (development only)
echo.
echo Creating backup of current rules...
copy firestore.rules firestore.rules.backup
echo.
echo Deploying open development rules...
echo.

firebase deploy --only firestore:rules

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Rules deployed.
    echo ========================================
    echo.
    echo Wait 10-15 seconds for rules to propagate.
    echo Then try registration again.
    echo.
) else (
    echo.
    echo ========================================
    echo   DEPLOYMENT FAILED!
    echo ========================================
    echo.
    echo Please deploy manually via Firebase Console:
    echo https://console.firebase.google.com/project/final-database-51935/firestore/rules
    echo.
)

pause
