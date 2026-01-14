# Assets Note

The app references these asset files in `app.json`:
- `./assets/icon.png` - App icon (1024x1024 recommended)
- `./assets/splash.png` - Splash screen image
- `./assets/adaptive-icon.png` - Android adaptive icon
- `./assets/favicon.png` - Web favicon

**Note**: These assets are not included in the repository. Expo will use default assets if these files are missing. To add custom assets:

1. Create an `assets` folder in the root directory
2. Add the required image files
3. Or use `npx expo install expo-asset` and generate assets using Expo tools

The app will run fine without custom assets - Expo provides defaults.
