@echo off
echo ================================================
echo   Daily Firebase Backup Script
echo ================================================
echo.
echo Starting backup process...
echo.

cd /d "%~dp0.."

node scripts\daily-backup.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================
    echo   Backup Completed Successfully!
    echo ================================================
    echo.
    echo Backup saved to: .\backups\
    echo.
) else (
    echo.
    echo ================================================
    echo   Backup Failed!
    echo ================================================
    echo.
    echo Check the error messages above.
    echo.
)

pause
