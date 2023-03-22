This is a working base project for React Native (Expo).
This project has depencies that were up to date on 22/03/2023 and is using react-navigation with a drawer.

What to do when making a new React Native project:
  expo init -> Create new project with typescript (blank)
  
  Transfer files from this repo:
    package.json -> Copy dependencies to your project
    babel.config.js -> Add after line with presets -> plugins: ['react-native-reanimated/plugin']
    eas.json -> Copy this to your project
    
eas build -p android --profile name -> build apk or android bundle on expo (eas.json for configuration profile name)
expo start -> Run application
npx expo start --tunnel -> Run application (expo go works with this)
