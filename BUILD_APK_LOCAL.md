# 📱 Guía para Generar APK Localmente

## ⚠️ Si GitHub Actions sigue fallando, puedes generar el APK en tu computadora

### 📋 Requisitos Previos:

1. **Java JDK 17** (obligatorio)
   - Descarga desde: https://adoptium.net/temurin/releases/
   - Instala la versión 17 LTS para Windows x64

2. **Android Studio** (recomendado)
   - Descarga desde: https://developer.android.com/studio
   - Durante la instalación, asegúrate de instalar:
     - Android SDK
     - Android SDK Platform-Tools
     - Android SDK Build-Tools

### 🛠️ Pasos para Generar APK:

```bash
# 1. Instalar dependencias
npm install

# 2. Construir la app React
npm run build

# 3. Sincronizar con Capacitor
npx cap sync android

# 4. Abrir en Android Studio
npx cap open android
```

### 📱 En Android Studio:

1. **Espera** a que se abra Android Studio
2. **Espera** a que termine de indexar y sincronizar
3. En el menú, ve a: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
4. **Espera** a que termine el build (puede tomar 5-10 minutos)
5. Cuando termine, haz clic en **locate** para encontrar el APK
6. El APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

### 🚀 Instalación en el Teléfono:

1. **Copia** el archivo `app-debug.apk` a tu teléfono
2. **Habilita** "Orígenes desconocidos" en Configuración → Seguridad
3. **Abre** el archivo APK en tu teléfono
4. **Instala** la aplicación

### 🔧 Solución de Problemas:

#### Si no tienes Android Studio:
```bash
# Usar Gradle directamente (requiere Java JDK 17)
cd android
./gradlew assembleDebug
```

#### Si gradlew no es ejecutable:
```bash
chmod +x android/gradlew
```

### 📊 Estado Actual:

- ✅ **App React:** Funcionando en http://localhost:3000
- ✅ **Capacitor:** Configurado correctamente
- ✅ **Repositorio:** Subido a GitHub
- ⏳ **GitHub Actions:** Intentando build automático
- 📱 **APK Local:** Pendiente (requiere instalación de herramientas)

### 🎯 Recomendación:

1. **Espera** 10-15 minutos más para ver si el nuevo workflow de GitHub funciona
2. Si sigue fallando, **instala Android Studio** para generar el APK localmente
3. **Mientras tanto**, puedes usar la app web en http://localhost:3000

---

## 🌐 Enlaces Útiles:

- **Java JDK 17:** https://adoptium.net/temurin/releases/
- **Android Studio:** https://developer.android.com/studio
- **Capacitor Docs:** https://capacitorjs.com/docs/android
- **Repositorio:** https://github.com/vjlale/alenia-family-organizer
