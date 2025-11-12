@echo off
cd /d "C:\Users\SAFA\OneDrive\Desktop\code[2]"
if exist .next rmdir /s /q .next
if exist .firebase rmdir /s /q .firebase
npm run build
