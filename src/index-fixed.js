import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppLocal from './AppLocal';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import './index.css';

const initializeApp = async () => {
  if (Capacitor.isNativePlatform()) {
    // Configurar status bar
    await StatusBar.setStyle({ style: Style.Dark });
    
    // Ocultar splash screen
    await SplashScreen.hide();
  }
};

// Detectar si estamos en modo local o con Firebase
const useLocalMode = true; // Cambia a false cuando tengas Firebase configurado

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {useLocalMode ? <AppLocal /> : <App />}
  </React.StrictMode>
);

// Inicializar la aplicación
initializeApp();

// Prevenir zoom en iOS
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

// Prevenir el comportamiento de pull-to-refresh
let startY;
document.addEventListener('touchstart', function(e) {
  startY = e.touches[0].pageY;
});

document.addEventListener('touchmove', function(e) {
  let y = e.touches[0].pageY;
  // Activar el comportamiento estándar si estás empezando desde abajo de la pantalla
  // Esto maneja casos como el menú contextual de iOS
  if (startY <= y && window.pageYOffset === 0) {
    e.preventDefault();
  }
}, { passive: false });
