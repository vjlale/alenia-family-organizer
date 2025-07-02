import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
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
  const y = e.touches[0].pageY;
  if (startY <= 10 && y > startY) {
    e.preventDefault();
  }
}, { passive: false });
