@echo off
echo.
echo ============================================
echo   Deploying Firestore Rules
echo ============================================
echo.
echo This will deploy security rules with:
echo - Public user registration enabled
echo - Role-based access control
echo - Public read for workouts and exercises
echo.

firebase deploy --only firestore:rules --project final-database-51935

echo.
echo ============================================
echo   Deployment Complete!
echo ============================================
echo.
echo Your registration should work now.
echo Users can register without authentication.
echo.
pause
