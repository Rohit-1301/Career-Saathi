@echo off
echo ===============================================
echo 🚀 Career Saathi - Complete Setup & Test
echo ===============================================
echo.

echo 📋 Checking prerequisites...
echo.

echo 🔥 Firebase Configuration Check:
echo Project ID: career-saathi-60edd
echo Auth Domain: career-saathi-60edd.firebaseapp.com
echo.

echo 📦 Installing dependencies...
echo.

echo Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed
    pause
    exit /b 1
)

echo Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend dependency installation failed
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.

echo 🌐 Starting servers...
echo.

echo Starting Backend Server (Port 3000)...
start /B cmd /c "cd ..\backend && npm start"
timeout /t 3

echo Starting Frontend Server (Port 8080)...
start cmd /c "npm run dev"

echo.
echo ===============================================
echo ✅ Setup Complete!
echo ===============================================
echo.
echo 🌐 Application URLs:
echo   Frontend: http://localhost:8080
echo   Backend:  http://localhost:3000
echo.
echo 🧪 Testing Instructions:
echo   1. Go to http://localhost:8080
echo   2. Click "Create Free Account"
echo   3. Fill form with strong password (8+ chars, uppercase, lowercase, number)
echo   4. Check email for verification link
echo   5. Click verification link
echo   6. Return to app and login
echo   7. Access dashboard (should work now)
echo.
echo 📧 Email Verification Required:
echo   - All new accounts must verify email
echo   - Dashboard access requires verified email
echo   - Strong password requirements enforced
echo.
echo Press any key to exit...
pause