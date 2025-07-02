# INSTALACIÓN COMPLETA - ALENIA FAMILY ORGANIZER

Esta guía te ayudará a instalar todo lo necesario para generar el APK de la aplicación.

## 📋 PRERREQUISITOS

### 1. Node.js
- Descargar desde: https://nodejs.org/
- Instalar la versión LTS (recomendada)
- Verificar instalación: `node --version` y `npm --version`

### 2. Java Development Kit (JDK)
- Descargar JDK 11 desde: https://adoptium.net/
- Instalar y configurar JAVA_HOME:
  - Ir a Variables de Entorno (Sistema)
  - Agregar nueva variable: 
    - Nombre: `JAVA_HOME`
    - Valor: Ruta de instalación de Java (ej: `C:\Program Files\Eclipse Adoptium\jdk-11.0.19.7-hotspot`)
  - Agregar a PATH: `%JAVA_HOME%\bin`

### 3. Android Studio
- Descargar desde: https://developer.android.com/studio
- Durante la instalación, asegúrate de instalar:
  - Android SDK
  - Android SDK Platform-Tools
  - Android SDK Build-Tools
  - Android Emulator (opcional)

### 4. Configurar Variables de Entorno para Android
Agregar estas variables de entorno:
- `ANDROID_HOME`: Ruta del SDK de Android (ej: `C:\Users\TuUsuario\AppData\Local\Android\Sdk`)
- Agregar a PATH:
  - `%ANDROID_HOME%\platform-tools`
  - `%ANDROID_HOME%\tools`
  - `%ANDROID_HOME%\tools\bin`

## 🚀 PASOS PARA GENERAR EL APK

### 1. Verificar Instalación
Abre una nueva terminal (PowerShell/CMD) y verifica:
```bash
java -version
node --version
npm --version
adb version
```

### 2. Navegar al Proyecto
```bash
cd c:\family-organizer-app
```

### 3. Instalar Dependencias (si aún no lo has hecho)
```bash
npm install
```

### 4. Construir la Aplicación
```bash
npm run build
```

### 5. Sincronizar con Capacitor
```bash
npx cap sync
```

### 6. Generar APK
**Opción A - Usar el script automático:**
```bash
# En Windows
.\build-apk.bat

# En Linux/Mac
chmod +x build-apk.sh
./build-apk.sh
```

**Opción B - Manual:**
```bash
cd android
.\gradlew assembleDebug
```

### 7. Encontrar el APK
El APK se generará en:
`android\app\build\outputs\apk\debug\app-debug.apk`

## 📱 INSTALACIÓN EN DISPOSITIVO

### Instalar en Dispositivo Android:
1. Habilitar "Desarrollo USB" en Configuración → Acerca del teléfono (tocar 7 veces en "Número de compilación")
2. Ir a Configuración → Opciones de desarrollo → Activar "Depuración USB"
3. Conectar el dispositivo por USB
4. Ejecutar: `adb install android\app\build\outputs\apk\debug\app-debug.apk`

### Instalar APK Directamente:
1. Copiar el archivo APK al dispositivo
2. Habilitar "Fuentes desconocidas" en Configuración → Seguridad
3. Abrir el archivo APK y seguir las instrucciones

## 🔧 CONFIGURACIÓN DE FIREBASE

Antes de usar la aplicación, configura Firebase:

1. **Crear proyecto en Firebase:**
   - Ir a https://console.firebase.google.com
   - Crear nuevo proyecto: "alenia-family-organizer"

2. **Agregar aplicación web:**
   - Clic en icono web (</>)
   - Registrar app con nombre "Alenia Family Organizer"

3. **Copiar configuración:**
   - Copiar el objeto `firebaseConfig`
   - Reemplazar en `src/App.js` líneas 49-56

4. **Habilitar servicios:**
   - Authentication → Sign-in method → Anónimo (activar)
   - Firestore Database → Crear base de datos → Modo de prueba

## 🎯 PASOS FINALES

### Para Desarrollo:
- Usar Android Studio para debugging
- Conectar dispositivo físico para pruebas
- Usar Chrome DevTools para debugging web

### Para Producción:
1. Generar APK firmado en Android Studio:
   - Build → Generate Signed Bundle / APK
   - Crear keystore
   - Generar APK de release

2. Publicar en Google Play Store:
   - Crear cuenta de desarrollador ($25 USD)
   - Subir APK firmado
   - Completar información de la app
   - Enviar para revisión

## 🆘 SOLUCIÓN DE PROBLEMAS

### Error: JAVA_HOME not set
- Instalar JDK y configurar JAVA_HOME correctamente
- Reiniciar terminal después de configurar variables

### Error: Android SDK not found
- Instalar Android Studio completamente
- Configurar ANDROID_HOME correctamente

### Error: Gradle build failed
- Verificar que tienes espacio suficiente en disco
- Ejecutar: `cd android && .\gradlew clean`

### Error: Firebase no funciona
- Verificar configuración en `src/App.js`
- Habilitar Authentication y Firestore en Firebase Console

## 📞 CONTACTO

Si tienes problemas, verifica:
1. Todas las variables de entorno están configuradas
2. Java y Android SDK están instalados correctamente
3. Firebase está configurado correctamente
4. El dispositivo tiene "Fuentes desconocidas" habilitado

¡La aplicación debería funcionar perfectamente una vez completados estos pasos!
