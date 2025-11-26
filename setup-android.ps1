# Android Environment Setup Script for Windows
# Run this script to set up ANDROID_HOME and ANDROID_SDK_ROOT

Write-Host "Setting up Android Development Environment..." -ForegroundColor Cyan
Write-Host ""

# Define Android SDK path
$androidSdkPath = "$env:LOCALAPPDATA\Android\Sdk"

# Check if SDK exists
if (Test-Path $androidSdkPath) {
    Write-Host "Android SDK found at: $androidSdkPath" -ForegroundColor Green
    
    # Set environment variables for current session
    Write-Host ""
    Write-Host "Setting environment variables for current session..." -ForegroundColor Yellow
    $env:ANDROID_HOME = $androidSdkPath
    $env:ANDROID_SDK_ROOT = $androidSdkPath
    
    # Add to PATH
    $env:PATH = "$androidSdkPath\platform-tools;$androidSdkPath\tools;$androidSdkPath\tools\bin;$env:PATH"
    
    Write-Host "ANDROID_HOME set to: $env:ANDROID_HOME" -ForegroundColor Green
    Write-Host "ANDROID_SDK_ROOT set to: $env:ANDROID_SDK_ROOT" -ForegroundColor Green
    Write-Host "Added Android tools to PATH" -ForegroundColor Green
    
    # Set permanently for user
    Write-Host ""
    Write-Host "Setting environment variables permanently..." -ForegroundColor Yellow
    
    try {
        [System.Environment]::SetEnvironmentVariable('ANDROID_HOME', $androidSdkPath, 'User')
        [System.Environment]::SetEnvironmentVariable('ANDROID_SDK_ROOT', $androidSdkPath, 'User')
        
        # Get current user PATH
        $currentPath = [System.Environment]::GetEnvironmentVariable('PATH', 'User')
        
        # Add Android paths if not already present
        $pathsToAdd = @(
            "$androidSdkPath\platform-tools",
            "$androidSdkPath\tools",
            "$androidSdkPath\tools\bin"
        )
        
        foreach ($pathToAdd in $pathsToAdd) {
            if ($currentPath -notlike "*$pathToAdd*") {
                $currentPath = $pathToAdd + ";" + $currentPath
            }
        }
        
        [System.Environment]::SetEnvironmentVariable('PATH', $currentPath, 'User')
        
        Write-Host "Environment variables set permanently!" -ForegroundColor Green
        Write-Host ""
        Write-Host "IMPORTANT: You need to restart VS Code for changes to take effect!" -ForegroundColor Yellow
        Write-Host ""
    }
    catch {
        Write-Host "Error setting permanent environment variables" -ForegroundColor Red
        Write-Host "You may need to run this script as Administrator" -ForegroundColor Yellow
    }
    
    # Verify installation
    Write-Host "Verifying Android tools..." -ForegroundColor Cyan
    Write-Host ""
    
    if (Test-Path "$androidSdkPath\platform-tools\adb.exe") {
        Write-Host "ADB found" -ForegroundColor Green
    } else {
        Write-Host "ADB not found - you may need to install it via Android Studio SDK Manager" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "Setup Complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Restart VS Code" -ForegroundColor White
    Write-Host "2. Install Android emulator extension from VS Code marketplace" -ForegroundColor White
    Write-Host "3. Create an AVD (Android Virtual Device) in Android Studio" -ForegroundColor White
    Write-Host "4. Run your emulator from VS Code!" -ForegroundColor White
    Write-Host ""
    
} else {
    Write-Host "Android SDK not found at: $androidSdkPath" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Android Studio and SDK Manager from:" -ForegroundColor Yellow
    Write-Host "https://developer.android.com/studio" -ForegroundColor Cyan
    Write-Host ""
}
