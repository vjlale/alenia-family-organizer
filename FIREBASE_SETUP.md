# CONFIGURACIÓN DE FIREBASE

Para que la aplicación funcione correctamente, necesitas configurar Firebase:

## Pasos para configurar Firebase:

1. **Ir a Firebase Console:**
   - Visita: https://console.firebase.google.com
   - Inicia sesión con tu cuenta de Google

2. **Crear un nuevo proyecto:**
   - Haz clic en "Crear proyecto"
   - Nombra tu proyecto (ej: "alenia-family-organizer")
   - Acepta los términos y crea el proyecto

3. **Agregar una aplicación web:**
   - En el dashboard, haz clic en el ícono web (</>)
   - Registra tu aplicación con un nombre
   - NO marques "Configure Firebase Hosting" por ahora
   - Haz clic en "Registrar aplicación"

4. **Copiar configuración:**
   - Copia el objeto de configuración que aparece
   - Reemplaza en `src/App.js` las líneas:

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

5. **Configurar Authentication:**
   - En el menú lateral, ve a "Authentication"
   - Haz clic en "Comenzar"
   - Ve a la pestaña "Sign-in method"
   - Habilita "Anónimo" haciendo clic en él y activando el toggle

6. **Configurar Firestore Database:**
   - En el menú lateral, ve a "Firestore Database"
   - Haz clic en "Crear base de datos"
   - Selecciona "Comenzar en modo de prueba" (por ahora)
   - Elige una ubicación cercana a tus usuarios

7. **Configurar reglas de seguridad (Opcional para desarrollo):**
   En Firestore Database > Reglas, puedes usar:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## Ejemplo de configuración completa:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

Una vez configurado, la aplicación debería funcionar correctamente.
