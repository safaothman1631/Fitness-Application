# Firebase Deployment Script for Windows PowerShell

# Navigate to project directory
Set-Location "c:\Users\SAFA\OneDrive\Desktop\code[2]"

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Green

# Deploy to Firebase
Write-Host "Deploying to Firebase..." -ForegroundColor Yellow
npx firebase deploy

Write-Host "Deployment complete!" -ForegroundColor Green
