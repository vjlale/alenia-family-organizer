#!/bin/bash

echo "========================================"
echo " ALENIA FAMILY ORGANIZER - BUILD SCRIPT"
echo "========================================"
echo

echo "[1/5] Instalando dependencias..."
npm install
if [ $? -ne 0 ]; then
    echo "Error: Falló la instalación de dependencias"
    exit 1
fi

echo
echo "[2/5] Construyendo aplicación React..."
npm run build
if [ $? -ne 0 ]; then
    echo "Error: Falló la construcción de React"
    exit 1
fi

echo
echo "[3/5] Sincronizando con Capacitor..."
npx cap sync
if [ $? -ne 0 ]; then
    echo "Error: Falló la sincronización con Capacitor"
    exit 1
fi

echo
echo "[4/5] Copiando archivos a Android..."
npx cap copy android
if [ $? -ne 0 ]; then
    echo "Error: Falló la copia a Android"
    exit 1
fi

echo
echo "[5/5] Generando APK..."
cd android
./gradlew assembleDebug
if [ $? -ne 0 ]; then
    echo "Error: Falló la generación del APK"
    cd ..
    exit 1
fi
cd ..

echo
echo "========================================"
echo "           BUILD COMPLETADO!"
echo "========================================"
echo
echo "El APK se ha generado en:"
echo "android/app/build/outputs/apk/debug/app-debug.apk"
echo
echo "Para generar un APK firmado para producción:"
echo "1. Abrir Android Studio"
echo "2. Build > Generate Signed Bundle / APK"
echo "3. Seleccionar APK y seguir las instrucciones"
echo
