@echo off
echo ========================================================
echo   Launching NambikkAI - AI Financial Safety Assistant
echo   Built for Sangyan 2026 Problem-Solving Competition
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting FastAPI Backend on http://localhost:8000 ...
start "NambikkAI Backend" cmd /k "cd backend && python -m uvicorn main:app --reload --port 8000"

echo [2/2] Starting Vite Frontend on http://localhost:5173 ...
start "NambikkAI Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo   Both services are starting!
echo   Open your browser at: http://localhost:5173
echo   API Docs available at: http://localhost:8000/docs
echo ========================================================
echo.
pause
