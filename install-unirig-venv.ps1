# UniRig Installation with pip/venv (without Conda)
# دامەزراندنی UniRig بە pip

Write-Host "Starting UniRig Installation (pip method)..." -ForegroundColor Cyan

# Check Python
$pythonInstalled = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonInstalled) {
    Write-Host "ERROR: Python not found! Please install Python 3.9+ first" -ForegroundColor Red
    Write-Host "Download from: https://www.python.org/downloads/" -ForegroundColor Yellow
    exit 1
}

$pythonVersion = python --version
Write-Host "OK: Python found - $pythonVersion" -ForegroundColor Green

# Create virtual environment
Write-Host "`nCreating virtual environment..." -ForegroundColor Cyan
if (Test-Path "venv-unirig") {
    Write-Host "WARNING: venv-unirig already exists - skipping" -ForegroundColor Yellow
} else {
    python -m venv venv-unirig
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to create virtual environment" -ForegroundColor Red
        exit 1
    }
    Write-Host "OK: Virtual environment created" -ForegroundColor Green
}

# Activate virtual environment
Write-Host "`nActivating virtual environment..." -ForegroundColor Cyan
& .\venv-unirig\Scripts\Activate.ps1

# Upgrade pip
Write-Host "`nUpgrading pip..." -ForegroundColor Cyan
python -m pip install --upgrade pip

# Install PyTorch
Write-Host "`nInstalling PyTorch..." -ForegroundColor Cyan
$cudaAvailable = nvidia-smi 2>$null
if ($cudaAvailable) {
    Write-Host "CUDA detected - Installing PyTorch with CUDA support" -ForegroundColor Green
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
} else {
    Write-Host "WARNING: No CUDA detected - Installing CPU-only PyTorch" -ForegroundColor Yellow
    pip install torch torchvision torchaudio
}

# Install Flask and other dependencies
Write-Host "`nInstalling Flask and dependencies..." -ForegroundColor Cyan
pip install flask flask-cors numpy

# Clone UniRig
Write-Host "`nCloning UniRig repository..." -ForegroundColor Cyan
if (Test-Path "UniRig") {
    Write-Host "WARNING: UniRig directory already exists - skipping clone" -ForegroundColor Yellow
} else {
    git clone https://github.com/VAST-AI-Research/UniRig.git
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to clone repository" -ForegroundColor Red
        Write-Host "Trying manual download..." -ForegroundColor Yellow
        Write-Host "Please download manually from: https://github.com/VAST-AI-Research/UniRig" -ForegroundColor Yellow
    } else {
        Write-Host "OK: Repository cloned" -ForegroundColor Green
    }
}

# Install UniRig dependencies
if (Test-Path "UniRig\requirements.txt") {
    Write-Host "`nInstalling UniRig dependencies..." -ForegroundColor Cyan
    Set-Location UniRig
    pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Host "WARNING: Some dependencies failed - this may be normal" -ForegroundColor Yellow
    }
    Set-Location ..
}

# Create simplified start script
Write-Host "`nCreating start script..." -ForegroundColor Cyan
$startScript = @'
# Start UniRig Server with venv
Write-Host "Starting UniRig API Server..." -ForegroundColor Cyan
& .\venv-unirig\Scripts\Activate.ps1
python unirig-server.py
'@

$startScript | Out-File -FilePath "start-unirig-venv.ps1" -Encoding UTF8
Write-Host "OK: Start script created: start-unirig-venv.ps1" -ForegroundColor Green

# Summary
Write-Host "`nInstallation Complete!" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "   1. Download pretrained model from:" -ForegroundColor White
Write-Host "      https://github.com/VAST-AI-Research/UniRig/releases" -ForegroundColor White
Write-Host "   2. Place model in: UniRig\pretrained\" -ForegroundColor White
Write-Host "   3. Run: .\start-unirig-venv.ps1" -ForegroundColor White
Write-Host "   4. Server will start on http://localhost:8000" -ForegroundColor White
Write-Host "`nTest command:" -ForegroundColor Cyan
Write-Host "   Invoke-WebRequest -Uri 'http://localhost:8000/health'" -ForegroundColor White
Write-Host ""
