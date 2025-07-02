# 🚀 GUÍA RÁPIDA: INSTALAR JAVA JDK PARA GENERAR APK

## ⚠️ SITUACIÓN ACTUAL
- ✅ Aplicación React: FUNCIONANDO
- ✅ Capacitor configurado: LISTO
- ✅ Código sincronizado: COMPLETO
- ❌ Java JDK: NO INSTALADO (requerido para APK)

## 📥 INSTALACIÓN DE JAVA JDK

### Opción 1: Adoptium (Recomendada)
1. **Descargar:**
   - Ir a: https://adoptium.net/
   - Seleccionar: JDK 11 (LTS)
   - Plataforma: Windows x64
   - Descargar el .msi

2. **Instalar:**
   - Ejecutar el archivo descargado
   - ✅ Marcar "Set JAVA_HOME variable"
   - ✅ Marcar "Add to PATH"
   - Completar instalación

### Opción 2: Oracle JDK
1. **Descargar:**
   - Ir a: https://www.oracle.com/java/technologies/downloads/
   - Seleccionar JDK 11 o superior
   - Descargar para Windows

2. **Configurar manualmente:**
   - Instalar JDK
   - Configurar variables de entorno (ver abajo)

## ⚙️ CONFIGURACIÓN DE VARIABLES DE ENTORNO

Si la instalación no configuró automáticamente:

1. **Abrir Variables de Entorno:**
   - Windows + R → `sysdm.cpl` → Enter
   - Pestaña "Opciones avanzadas"
   - "Variables de entorno"

2. **Crear JAVA_HOME:**
   - Variables del sistema → "Nueva"
   - Nombre: `JAVA_HOME`
   - Valor: `C:\Program Files\Eclipse Adoptium\jdk-11.0.19.7-hotspot` (o ruta de instalación)

3. **Actualizar PATH:**
   - Seleccionar "Path" → "Editar"
   - "Nuevo" → `%JAVA_HOME%\bin`

## 🧪 VERIFICACIÓN

Abrir nueva terminal (PowerShell/CMD) y ejecutar:
```bash
java -version
javac -version
```

Debería mostrar algo como:
```
openjdk version "11.0.19" 2023-04-18
```

## 🎯 DESPUÉS DE INSTALAR JAVA

1. **Cerrar y abrir nueva terminal**
2. **Navegar al proyecto:**
   ```bash
   cd c:\family-organizer-app
   ```

3. **Generar APK:**
   ```bash
   .\build-apk.bat
   ```

## 📱 UBICACIÓN DEL APK

Una vez generado, el APK estará en:
```
android\app\build\outputs\apk\debug\app-debug.apk
```

## 🔧 INSTALACIÓN EN DISPOSITIVO

### Método 1: USB (Recomendado)
1. Habilitar "Opciones de desarrollador" en Android
2. Activar "Depuración USB"
3. Conectar dispositivo
4. ```bash
   adb install android\app\build\outputs\apk\debug\app-debug.apk
   ```

### Método 2: Archivo directo
1. Copiar APK al dispositivo
2. Habilitar "Fuentes desconocidas"
3. Instalar desde explorador de archivos

## ⏱️ TIEMPO ESTIMADO
- Descargar JDK: 2-5 minutos
- Instalar JDK: 2 minutos
- Generar APK: 3-5 minutos
- **Total: ~10 minutos**

## 🆘 SI TIENES PROBLEMAS

1. **Java no reconocido después de instalar:**
   - Reiniciar terminal completamente
   - Verificar variables de entorno

2. **Gradle falla:**
   - Verificar que JAVA_HOME apunte a la carpeta correcta
   - Usar JDK 11 (no JRE)

3. **APK no se genera:**
   - Ejecutar: `cd android && .\gradlew clean`
   - Intentar de nuevo: `.\build-apk.bat`

## 🎉 ¡CASI LISTO!

Una vez instalado Java, tu aplicación **Alenia Family Organizer** se convertirá en APK y estará lista para instalar en cualquier dispositivo Android.

**¡Solo falta Java JDK y tendrás tu aplicación móvil funcionando! 📱✨**
