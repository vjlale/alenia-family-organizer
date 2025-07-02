# 📱 Guía para Generar APK Localmente

## ⚠️ Si GitHub Actions sigue fallando, puedes generar el APK en tu computadora

### � PASO 1: Instalar Java JDK 17

#### Para Windows:

1. **Descarga Java JDK 17:**
   - Ve a: https://adoptium.net/temurin/releases/
   - Selecciona: **Version: 17 - LTS**
   - Operating System: **Windows**
   - Architecture: **x64**
   - Package Type: **JDK**
   - Haz clic en **⬇️ Download**

2. **Instala Java:**
   - Ejecuta el archivo `.msi` descargado
   - Sigue el asistente de instalación
   - **IMPORTANTE:** Durante la instalación, marca la opción "Set JAVA_HOME variable"
   - Completa la instalación

3. **Verifica la instalación:**
   ```bash
   java -version
   ```
   Deberías ver algo como: `openjdk version "17.0.x"`

#### Si java -version no funciona:

4. **Configurar JAVA_HOME manualmente:**
   - Abre "Variables de entorno" en Windows
   - Agrega nueva variable del sistema:
     - Nombre: `JAVA_HOME`
     - Valor: `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\`
   - Edita la variable `Path` y agrega:
     - `%JAVA_HOME%\bin`
   - Reinicia PowerShell y prueba `java -version` nuevamente

### 🤖 PASO 2: Instalar Android Studio (Recomendado)

1. **Descarga Android Studio:**
   - Ve a: https://developer.android.com/studio
   - Haz clic en **Download Android Studio**
   - Acepta los términos y descarga

2. **Instala Android Studio:**
   - Ejecuta el instalador
   - Sigue el asistente de configuración
   - Durante la instalación, asegúrate de instalar:
     - ✅ Android SDK
     - ✅ Android SDK Platform-Tools  
     - ✅ Android SDK Build-Tools
     - ✅ Android Emulator (opcional)

3. **Configuración inicial:**
   - Abre Android Studio
   - Completa la configuración inicial
   - Acepta las licencias del SDK

### 📱 PASO 3: Generar el APK

#### Método 1 - Con Android Studio (Recomendado):

```bash
# 1. Navega al proyecto
cd c:\family-organizer-app

# 2. Instalar dependencias (si no están)
npm install

# 3. Construir la app React
npm run build

# 4. Sincronizar con Capacitor
npx cap sync android

# 5. Abrir en Android Studio
npx cap open android
```

**En Android Studio:**
1. Espera a que termine de indexar (barra de progreso abajo)
2. Ve al menú: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Espera 5-10 minutos (primera vez puede tomar más)
4. Cuando termine, haz clic en **locate** o **find**
5. El APK estará en: `android\app\build\outputs\apk\debug\app-debug.apk`

#### Método 2 - Línea de comandos (Si ya tienes Java configurado):

```bash
# 1-4. Mismos pasos de arriba

# 5. Compilar directamente con Gradle
cd android
.\gradlew assembleDebug
```

### 📲 PASO 4: Instalar en tu Teléfono

1. **Copia el APK** a tu teléfono Android
2. **En tu teléfono:**
   - Ve a Configuración → Seguridad
   - Habilita "Orígenes desconocidos" o "Instalar apps desconocidas"
3. **Instala:**
   - Abre el archivo `app-debug.apk` en tu teléfono
   - Toca "Instalar"
   - ¡Listo! 🎉

### 🔧 Solución de Problemas Comunes

#### Error: "JAVA_HOME not set"
```bash
# Verifica JAVA_HOME
echo $env:JAVA_HOME
# Debería mostrar: C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot\
```

#### Error: "SDK location not found"
- Abre Android Studio
- Ve a File → Settings → Appearance & Behavior → System Settings → Android SDK
- Copia la ruta del SDK (ej: `C:\Users\...\AppData\Local\Android\Sdk`)
- En tu proyecto, crea archivo `android\local.properties`:
  ```
  sdk.dir=C:\\Users\\TuUsuario\\AppData\\Local\\Android\\Sdk
  ```

#### Error: "gradlew: command not found"
```bash
# Dar permisos al script (en Git Bash o WSL)
chmod +x android/gradlew

# O usar el .bat en Windows
cd android
.\gradlew.bat assembleDebug
```

### 📊 Estado Actual del Proyecto

- ✅ **Logos corporativos:** Integrados en toda la app
- ✅ **App React:** Funcionando en http://localhost:3000  
- ✅ **Capacitor:** Configurado para Android
- ✅ **Repositorio:** Actualizado en GitHub
- ⏳ **GitHub Actions:** Intentando build automático
- 📱 **APK Local:** Listo para generar

### 🎯 Próximos Pasos

1. **Instala Java JDK 17** siguiendo los pasos de arriba
2. **Instala Android Studio** para facilitar el proceso
3. **Genera el APK** usando el método que prefieras
4. **Instala en tu teléfono** y disfruta la app

### 🌐 Enlaces de Descarga

- **Java JDK 17:** https://adoptium.net/temurin/releases/
- **Android Studio:** https://developer.android.com/studio
- **Repositorio:** https://github.com/vjlale/alenia-family-organizer
- **App Web:** http://localhost:3000

---

## 🆘 ¿Necesitas ayuda?

Si tienes problemas, comparte el error exacto que te aparece y te ayudo a solucionarlo paso a paso.
