# Achrilik Mobile - React Native App

Application mobile native pour la marketplace Achrilik, développée avec React Native et Expo.

## 🚀 Technologies

- **React Native** 0.73+
- **Expo SDK** 50+
- **TypeScript**
- **React Navigation 6**
- **Zustand** (state management)
- **React Query** (server cache)
- **NativeWind** (Tailwind CSS for RN)

## 📱 Fonctionnalités

### Phase 1 - MVP (En cours)
- ✅ Navigation (Tabs + Stack)
- ✅ API Client configuré
- 🚧 Authentification (Login/Register)
- 🚧 Browse produits
- 🚧 Panier & Wishlist

### Phase 2 - Checkout
- ⏳ Multi-step checkout
- ⏳ Intégration paiement (CCP, BaridiMob)
- ⏳ Gestion commandes

### Phase 3 - Seller
- ⏳ Dashboard vendeur
- ⏳ Gestion produits
- ⏳ Fulfillment commandes

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npx expo start

# Lancer sur iOS (nécessite macOS)
npx expo start --ios

# Lancer sur Android
npx expo start --android

# Lancer sur web
npx expo start --web
```

## 📂 Structure du Projet

```
achrilik-mobile/
├── app/                    # App Router (Expo Router)
│   ├── (tabs)/            # Bottom tabs navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── search.tsx     # Search screen
│   │   ├── cart.tsx       # Cart screen
│   │   └── profile.tsx    # Profile screen
│   ├── auth/              # Auth screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── product/           # Product screens
│   │   └── [id].tsx       # Product detail (dynamic route)
│   └── _layout.tsx        # Root layout
├── src/
│   ├── api/               # API client
│   │   └── client.ts
│   ├── components/        # Reusable components
│   ├── hooks/             # Custom hooks
│   ├── store/             # Zustand stores
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── assets/                # Images, fonts, icons
└── app.json              # Expo configuration
```

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env` :

```env
EXPO_PUBLIC_API_URL=https://achrilik.com/api
EXPO_PUBLIC_APP_ENV=development
```

### API Backend

L'app se connecte à l'API Achrilik existante :
- Base URL: `https://achrilik.com/api`
- Endpoints: `/auth/login`, `/products`, `/cart`, etc.

## 📱 Testing

### Sur Émulateur/Simulateur
```bash
# iOS (macOS uniquement)
npx expo start --ios

# Android
npx expo start --android
```

### Sur Appareil Physique
1. Installer **Expo Go** depuis App Store/Play Store
2. Scanner le QR code affiché dans le terminal

## 🚀 Déploiement

### Build de Production

```bash
# Configuration EAS Build
eas build:configure

# Build Android
eas build --platform android

# Build iOS (nécessite compte Apple Developer)
eas build --platform ios

# Submit to stores
eas submit --platform android
eas submit --platform ios
```

## 📝 Conventions de Code

- **Components**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase avec prefix `use` (`useAuth.ts`)
- **Types**: PascalCase avec suffix `Type` (`ProductType`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🎨 Design System

- **Couleurs**: 
  - Primary: `#006233` (Achrilik green)
  - Secondary: `#00753D`
- **Spacing**: Multiples de 4px
- **Typography**: System fonts (SF Pro iOS, Roboto Android)

## 🌍 Internationalisation

Support français et arabe avec `react-i18next`.

## 📚 Resources

- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [NativeWind](https://www.nativewind.dev)

## 📄 License

Proprietary - Achrilik © 2026
