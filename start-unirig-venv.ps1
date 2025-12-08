# Start UniRig Server with Virtual Environment

Write-Host "Starting UniRig API Server..." -ForegroundColor Cyan
Write-Host ""

# Check if venv exists
if (-not (Test-Path ".\venv-unirig")) {
    Write-Host "Virtual environment not found!" -ForegroundColor Red
    Write-Host "Run: .\install-unirig-venv.ps1" -ForegroundColor Yellow
    exit 1
}

# Check if server file exists
if (-not (Test-Path ".\unirig-server.py")) {
    Write-Host "unirig-server.py not found!" -ForegroundColor Red
    exit 1
}

Write-Host "Activating virtual environment..." -ForegroundColor Green

# Activate venv
.\venv-unirig\Scripts\Activate.ps1

Write-Host "Starting server on http://localhost:8000" -ForegroundColor Green
Write-Host "API endpoints:" -ForegroundColor Cyan
Write-Host "   GET  http://localhost:8000/health" -ForegroundColor White
Write-Host "   POST http://localhost:8000/api/skeleton" -ForegroundColor White
Write-Host "   POST http://localhost:8000/api/skinning" -ForegroundColor White
Write-Host "   POST http://localhost:8000/api/rig/full" -ForegroundColor White
Write-Host "   POST http://localhost:8000/api/export" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Magenta
Write-Host ""

# Run server
python unirig-server.py
