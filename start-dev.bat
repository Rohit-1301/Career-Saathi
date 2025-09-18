@echo off
echo Starting Career Saathi Development Environment...
echo.

echo Starting Backend Server...
start /B cmd /c "cd backend && npm start"
timeout /t 3

echo Starting Frontend Server...
start cmd /c "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:8080
echo.
echo Press any key to exit...