# Luminous Mobile App Development

## Overview
Luminous ahora incluye versiones nativas para iOS y Android usando Capacitor, manteniendo el 95% del código React existente mientras proporciona acceso completo a funciones nativas del dispositivo.

## Tecnología Utilizada
- **Capacitor 7.x** - Runtime nativo cross-platform
- **React + TypeScript** - Frontend existente (sin cambios)
- **Ionic Components** - UI optimizada para móviles
- **Vite** - Build tool optimizado

## Estructura del Proyecto
```
├── capacitor.config.ts     # Configuración de Capacitor
├── ios/                    # Proyecto nativo iOS (Xcode)
├── android/                # Proyecto nativo Android (Android Studio)
├── client/src/hooks/       # Hooks específicos para móviles
│   └── useCapacitor.ts    # Hook principal de Capacitor
└── dist/public/           # Build web para apps nativas
```

## Comandos Disponibles

### Desarrollo
```bash
# Construir y sincronizar
npm run build && npx cap sync

# Abrir iOS en Xcode
npx cap open ios

# Abrir Android en Android Studio  
npx cap open android

# Live reload en dispositivo iOS
npx cap run ios --livereload

# Live reload en dispositivo Android
npx cap run android --livereload
```

### Producción
```bash
# Build completo para distribución
npm run build
npx cap sync
npx cap build ios --prod
npx cap build android --prod
```

## Funciones Nativas Implementadas

### Core Features
- ✅ **Status Bar** - Configuración automática de colores
- ✅ **Splash Screen** - Pantalla de carga personalizada con branding Luminous
- ✅ **Keyboard** - Manejo inteligente del teclado virtual
- ✅ **Safe Area** - Soporte para dispositivos con notch
- ✅ **Back Button** - Navegación nativa Android

### Ready to Implement
- 📸 **Camera** - Captura de fotos para proyectos creativos
- 📍 **Geolocation** - Ubicación para funciones de comunidad
- 🔔 **Push Notifications** - Recordatorios de hábitos y proyectos
- 💾 **Local Storage** - Cache offline de datos
- 📱 **Device Info** - Optimizaciones específicas por dispositivo

## Configuración de Desarrollo

### Requisitos iOS
- macOS con Xcode 16.0+
- Apple Developer Account (para dispositivos físicos)
- iOS Simulator (incluido con Xcode)

### Requisitos Android
- Android Studio 2024.2.1+
- Android SDK 35
- Emulador Android o dispositivo físico

### Primer Setup
```bash
# 1. Construir la aplicación web
npm run build

# 2. Sincronizar con Capacitor
npx cap sync

# 3. Abrir en IDE nativo
npx cap open ios     # Para iOS
npx cap open android # Para Android
```

## Testing en Dispositivos

### iOS Simulator
1. Ejecutar `npx cap open ios`
2. Seleccionar simulador en Xcode
3. Presionar "Run" o Cmd+R

### Android Emulator
1. Ejecutar `npx cap open android`
2. Crear/abrir AVD en Android Studio
3. Presionar "Run" o Shift+F10

### Dispositivos Físicos
- **iOS**: Requiere Apple Developer Account y provisioning profiles
- **Android**: Habilitar "Developer Options" y "USB Debugging"

## Optimizaciones Móviles

### Performance
- Lazy loading de componentes
- Optimización de imágenes y assets
- Service workers para cache
- Bundle splitting automático

### UX/UI
- Touch targets de 44px+ (Apple guidelines)
- Swipe gestures nativos
- Haptic feedback
- Safe area insets automáticos
- Teclado virtual inteligente

### Plataforma Específica
- **iOS**: Disable text selection, callouts, y tap highlights
- **Android**: Status bar inmersiva y edge-to-edge
- **Universal**: Responsive design y Progressive Enhancement

## Distribución

### Apple App Store
1. Archive en Xcode
2. Upload a App Store Connect
3. Configurar metadata y screenshots
4. Submit for review

### Google Play Store
1. Generate signed AAB en Android Studio
2. Upload a Play Console
3. Configurar store listing
4. Release to production

## Troubleshooting

### Errores Comunes
```bash
# Limpiar y reconstruir
npm run build
npx cap sync --force

# Reset completo
rm -rf ios android
npx cap add ios
npx cap add android
```

### Live Reload Issues
- Verificar IP local en capacitor.config.ts
- Asegurar mismo WiFi en dispositivo y computadora
- Deshabilitar firewall temporalmente

## Próximos Pasos

### Funciones Planeadas
1. **Camera Integration** - Fotos para proyectos creativos
2. **Push Notifications** - Recordatorios personalizados
3. **Offline Mode** - Funcionamiento sin conexión
4. **Biometric Auth** - Touch ID / Face ID
5. **App Store Optimization** - Screenshots y metadata

### Performance Optimizations
1. **Code Splitting** - Carga bajo demanda
2. **Image Optimization** - WebP y lazy loading
3. **Service Workers** - Cache inteligente
4. **Bundle Analysis** - Reducción de tamaño

La aplicación Luminous ahora está lista para distribución en app stores y proporciona una experiencia nativa completa manteniendo la flexibilidad del desarrollo web.