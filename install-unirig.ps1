# UniRig Installation Script for Windows
# کۆدی دامەزراندنی UniRig بۆ ویندۆز

Write-Host "Starting UniRig Installation..." -ForegroundColor Cyan

# Check if conda is installed
$condaInstalled = Get-Command conda -ErrorAction SilentlyContinue
if (-not $condaInstalled) {
    Write-Host "ERROR: Conda not found! Please install Miniconda or Anaconda first:" -ForegroundColor Red
    Write-Host "   https://docs.conda.io/en/latest/miniconda.html" -ForegroundColor Yellow
    exit 1
}

Write-Host "OK: Conda found" -ForegroundColor Green

# Create conda environment
Write-Host "`nCreating conda environment 'UniRig'..." -ForegroundColor Cyan
conda create -n UniRig python=3.9 -y

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to create conda environment" -ForegroundColor Red
    exit 1
}

Write-Host "OK: Environment created" -ForegroundColor Green

# Activate environment and install packages
Write-Host "`nInstalling PyTorch and dependencies..." -ForegroundColor Cyan

# Check if CUDA is available
$cudaAvailable = nvidia-smi 2>$null
if ($cudaAvailable) {
    Write-Host "CUDA detected - Installing PyTorch with CUDA support" -ForegroundColor Green
    conda activate UniRig
    conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia -y
} else {
    Write-Host "WARNING: No CUDA detected - Installing CPU-only PyTorch" -ForegroundColor Yellow
    conda activate UniRig
    conda install pytorch torchvision torchaudio cpuonly -c pytorch -y
}

# Install other dependencies
Write-Host "`nInstalling other dependencies..." -ForegroundColor Cyan
conda run -n UniRig pip install flask flask-cors numpy

# Clone UniRig repository
Write-Host "`nCloning UniRig repository..." -ForegroundColor Cyan
if (Test-Path "UniRig") {
    Write-Host "WARNING: UniRig directory already exists - skipping clone" -ForegroundColor Yellow
} else {
    git clone https://github.com/VAST-AI-Research/UniRig.git
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to clone repository" -ForegroundColor Red
        exit 1
    }
    Write-Host "OK: Repository cloned" -ForegroundColor Green
}

# Install UniRig dependencies
Write-Host "`nInstalling UniRig dependencies..." -ForegroundColor Cyan
Set-Location UniRig
conda run -n UniRig pip install -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Some dependencies failed - this is often normal" -ForegroundColor Yellow
}

Set-Location ..

# Download pretrained model
Write-Host "`nDownloading pretrained model..." -ForegroundColor Cyan
$modelDir = "UniRig/pretrained"
if (-not (Test-Path $modelDir)) {
    New-Item -ItemType Directory -Path $modelDir -Force
}

Write-Host "NOTE: You may need to download the pretrained model manually from:" -ForegroundColor Yellow
Write-Host "   https://github.com/VAST-AI-Research/UniRig/releases" -ForegroundColor Yellow
Write-Host "   Place the model files in: $modelDir" -ForegroundColor Yellow

# Create start script
Write-Host "`nCreating start script..." -ForegroundColor Cyan
$startScriptPath = "start-unirig-auto.ps1"
$startScriptContent = @"
# Start UniRig Server
Write-Host '🚀 Starting UniRig API Server...' -ForegroundColor Cyan
conda activate UniRig
python unirig-server.py
"@

$startScriptContent | Out-File -FilePath $startScriptPath -Encoding UTF8
Write-Host "Start script created: $startScriptPath" -ForegroundColor Green

# Summary
Write-Host "`nInstallation Complete!" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "   1. Download pretrained model (if not auto-downloaded)" -ForegroundColor White
Write-Host "   2. Run: .\start-unirig.ps1" -ForegroundColor White
Write-Host "   3. Server will start on http://localhost:8000" -ForegroundColor White
Write-Host "`nTest the server:" -ForegroundColor Cyan
Write-Host "   Invoke-WebRequest -Uri 'http://localhost:8000/health'" -ForegroundColor White
Write-Host ""
