# NambikkAI - 1-Click Launch Script for PowerShell
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Launching NambikkAI - AI Financial Safety Assistant" -ForegroundColor Green
Write-Host "  Sangyan 2026 Problem-Solving Hackathon" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$rootPath = $PSScriptRoot

Write-Host "[1/2] Starting FastAPI Backend on http://localhost:8000 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath\backend'; python -m uvicorn main:app --reload --port 8000"

Write-Host "[2/2] Starting Vite Frontend on http://localhost:5173 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath\frontend'; npm run dev"

Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "  Servers launched!" -ForegroundColor Green
Write-Host "  Web App:  http://localhost:5173" -ForegroundColor White
Write-Host "  API Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host "========================================================" -ForegroundColor Green
