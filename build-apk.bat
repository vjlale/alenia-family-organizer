@echo off
echo ========================================
echo  ALENIA FAMILY ORGANIZER - BUILD SCRIPT
echo ========================================
echo.

echo [1/5] Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo Error: Fallo la instalacion de dependencias
    pause
    exit /b 1
)

echo.
echo [2/5] Construyendo aplicacion React...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Fallo la construccion de React
    pause
    exit /b 1
)

echo.
echo [3/5] Sincronizando con Capacitor...
call npx cap sync
if %errorlevel% neq 0 (
    echo Error: Fallo la sincronizacion con Capacitor
    pause
    exit /b 1
)

echo.
echo [4/5] Copiando archivos a Android...
call npx cap copy android
if %errorlevel% neq 0 (
    echo Error: Fallo la copia a Android
    pause
    exit /b 1
)

echo.
echo [5/5] Generando APK...
cd android
call gradlew assembleDebug
if %errorlevel% neq 0 (
    echo Error: Fallo la generacion del APK
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ========================================
echo           BUILD COMPLETADO!
echo ========================================
echo.
echo El APK se ha generado en:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Para generar un APK firmado para produccion:
echo 1. Abrir Android Studio
echo 2. Build ^> Generate Signed Bundle / APK
echo 3. Seleccionar APK y seguir las instrucciones
echo.
pause
