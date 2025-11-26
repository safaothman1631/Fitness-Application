@echo off
echo Setting Firebase environment variables...
echo.

cd /d "C:\Users\SAFA\OneDrive\Desktop\code[2]"

echo Setting NEXT_PUBLIC_FIREBASE_API_KEY...
call npx firebase functions:config:set nextpublic.firebase_api_key="AIzaSyBUXCaDOwPuO5GGwHlGJiwpnrFaFL22Nfg"

echo Setting NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN...
call npx firebase functions:config:set nextpublic.firebase_auth_domain="final-database-51935.firebaseapp.com"

echo Setting NEXT_PUBLIC_FIREBASE_PROJECT_ID...
call npx firebase functions:config:set nextpublic.firebase_project_id="final-database-51935"

echo Setting NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET...
call npx firebase functions:config:set nextpublic.firebase_storage_bucket="final-database-51935.firebasestorage.app"

echo Setting NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID...
call npx firebase functions:config:set nextpublic.firebase_messaging_sender_id="683176019395"

echo Setting NEXT_PUBLIC_FIREBASE_APP_ID...
call npx firebase functions:config:set nextpublic.firebase_app_id="1:683176019395:web:2b95be616ef73fe9406976"

echo.
echo Environment variables set! Now redeploy with:
echo npx firebase deploy
echo.
pause
