# Start UniRig Server
# دەستپێکردنی UniRig API Server

Write-Host "🚀 Starting UniRig API Server..." -ForegroundColor Cyan
Write-Host ""

# Check if conda is available
$condaInstalled = Get-Command conda -ErrorAction SilentlyContinue
if (-not $condaInstalled) {
    Write-Host "❌ Conda not found! Run install-unirig.ps1 first" -ForegroundColor Red
    exit 1
}

# Check if environment exists
$envExists = conda env list | Select-String "UniRig"
if (-not $envExists) {
    Write-Host "❌ UniRig environment not found! Run install-unirig.ps1 first" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Activating UniRig environment..." -ForegroundColor Green

# Activate and run server
& conda activate UniRig

Write-Host "✅ Starting server on http://localhost:8000" -ForegroundColor Green
Write-Host "📡 API endpoints:" -ForegroundColor Cyan
Write-Host "   GET  http://localhost:8000/health" -ForegroundColor White
Write-Host "   POST http://localhost:8000/api/rig/full" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

python unirig-server.py
