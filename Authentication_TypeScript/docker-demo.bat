@echo off
title Docker Demo - TypeScript Authentication App

:main
cls
echo.
echo 🐳 Docker Demo for TypeScript Authentication App
echo ================================================
echo.
echo 1. Run Full Demo
echo 2. Show Logs  
echo 3. Cleanup
echo 4. Exit
echo.
set /p choice="Choose an option (1-4): "

if "%choice%"=="1" goto run_demo
if "%choice%"=="2" goto show_logs
if "%choice%"=="3" goto cleanup
if "%choice%"=="4" goto exit
goto main

:run_demo
echo.
echo 🚀 Starting Docker Demo...
echo ==========================

REM Check if Docker is running
docker version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop.
    pause
    goto main
)

echo ✅ Docker is running

REM Setup environment file
if not exist .env (
    echo 📝 Setting up environment file...
    copy .env.docker .env
    echo ✅ Environment file created. Please edit .env with your actual values.
) else (
    echo ✅ Environment file already exists
)

REM Stop any running containers
echo 🛑 Stopping any existing containers...
docker-compose down

REM Build and start services
echo 🏗️  Building and starting services...
docker-compose up --build -d

REM Wait for services to start
echo ⏳ Waiting for services to start...
timeout /t 10 /nobreak >nul

REM Check service status
echo 📊 Service Status:
docker-compose ps

echo.
echo 🎉 Docker Demo is running!
echo =========================
echo 🌐 Application URL: http://localhost:5000
echo 🔄 Nginx Proxy: http://localhost:80
echo 🗄️  MongoDB: localhost:27017
echo.
echo 📋 Useful Commands:
echo    docker-compose logs -f        # View logs
echo    docker-compose down           # Stop services
echo    docker-compose ps             # Check status
echo.

REM Test the application
echo 🧪 Testing application...
curl -s http://localhost:5000/ >nul 2>&1
if errorlevel 1 (
    echo ❌ Application is not responding. Check logs with: docker-compose logs
) else (
    echo ✅ Application is responding correctly!
)

pause
goto main

:show_logs
echo.
echo 📋 Application Logs:
echo ===================
docker-compose logs auth-app
pause
goto main

:cleanup
echo.
echo 🧹 Cleaning up...
docker-compose down
echo ✅ Cleanup completed
pause
goto main

:exit
echo.
echo 👋 Goodbye!
pause
exit
