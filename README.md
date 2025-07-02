# Alenia Family Organizer

Una aplicación móvil para organización familiar desarrollada con React y Capacitor.

## Características

- 📱 Aplicación nativa para Android e iOS
- 🔥 Integración con Firebase
- 📅 Calendario familiar compartido
- 🤖 Asistente IA para organización
- 🎨 Diseño moderno y responsivo
- ⚡ Optimizada para dispositivos móviles

## Tecnologías Utilizadas

- React 18
- Capacitor 5
- Firebase
- Tailwind CSS
- JavaScript ES6+

## Instalación y Configuración

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Android Studio (para desarrollo Android)
- Java Development Kit (JDK 11 o superior)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/alenia-family-organizer.git
   cd alenia-family-organizer
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**
   - Crear un proyecto en Firebase Console
   - Obtener las credenciales de configuración
   - Actualizar el archivo `src/App.js` con tu configuración

4. **Construir la aplicación**
   ```bash
   npm run build
   ```

5. **Sincronizar con Capacitor**
   ```bash
   npx cap sync
   ```

6. **Abrir Android Studio**
   ```bash
   npx cap open android
   ```

## Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run build:android` - Construye y sincroniza con Android
- `npm run android` - Abre Android Studio
- `npm run sync` - Sincroniza los archivos con las plataformas nativas

## Generación del APK

### Opción 1: Usando Android Studio
1. Abrir el proyecto en Android Studio
2. Build → Generate Signed Bundle / APK
3. Seleccionar APK
4. Configurar la firma (crear keystore si es necesario)
5. Generar APK

### Opción 2: Usando línea de comandos
```bash
cd android
./gradlew assembleDebug
```

El APK se generará en: `android/app/build/outputs/apk/debug/app-debug.apk`

## Configuración de Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com)
2. Crear un nuevo proyecto
3. Agregar una aplicación web
4. Copiar la configuración y reemplazar en `src/App.js`:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain",
  projectId: "tu-project-id",
  storageBucket: "tu-storage-bucket",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};
```

5. Habilitar Authentication (Anonymous)
6. Configurar Firestore Database

## Estructura del Proyecto

```
alenia-family-organizer/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── assets/
├── src/
│   ├── App.js
│   ├── index.js
│   ├── index.css
│   └── components/
├── android/
├── capacitor.config.json
├── package.json
└── README.md
```

## Funcionalidades

### 🔐 Autenticación
- Crear familia con código personalizado
- Unirse a familia existente
- Autenticación anónima con Firebase

### 📅 Calendario
- Vista mensual interactiva
- Eventos recurrentes
- Categorías por colores
- Gestión de eventos familiares

### 🤖 Asistente IA
- Sugerencias inteligentes
- Ayuda con organización
- Recordatorios automáticos

### 📱 Optimizaciones Móviles
- Feedback háptico
- Diseño responsivo
- Gestos táctiles
- Optimizado para dispositivos con notch

## Distribución

### Google Play Store
1. Crear cuenta de desarrollador
2. Generar APK firmado
3. Subir a Play Console
4. Completar información de la app
5. Enviar para revisión

### Distribución Direct (APK)
- Compartir el archivo APK directamente
- Habilitar "Fuentes desconocidas" en Android
- Instalar manualmente

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## Soporte

Si tienes algún problema o pregunta:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo

## Changelog

### v1.0.0
- Lanzamiento inicial
- Autenticación con Firebase
- Calendario familiar
- Asistente IA básico
- Aplicación móvil nativa
