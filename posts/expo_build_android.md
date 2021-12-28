---
title: Android Expo
author: Roman Vavilov
date: '2021-11-15'
---
## Prerequisites:

 package.json containts:
```json
"scripts": {
  "expo-publish": "expo-cli publish --clear --config app.json",
    "build-android-apk": "turtle build:android --config app.json --type apk --output artifact/teamshop-mobile.apk --keystore-path node_modules/react-native/keystores/debug.keystore --keystore-alias androiddebugkey"
},
"dependencies": {
  "expo": "37.0.0",
    "expo-cli": "^3.20.3",
    "turtle-cli": "^0.14.0"
}
```

To duil android .apk localy using expo you need to be signed in with expo-cli on your terminal. First insall expo globally
```bash
npm install -g expo
```
Then, sign in to your expo account
```bash
expo login|signin [options]
```
Expo will build standalone .apk using published version of your app so first run the following command in you project directory
```bash
cd /path/to/project \
npm run expo-publish
```
Don't forget to put "privacy": "unlisted" under "expo" tag in app.json config file as shown below
```bash
{
  "expo": {
    "name": "Application Name",
    "slug": "your published app will be under this adrees e.g. @expo/[expo-login-name]/[slug]",
    "scheme": "app",
    # "privacy": "unlisted",
    "sdkVersion": "37.0.0",
    "platforms": ["ios", "android", "web"],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon-dev.png",
  }
}
```

Once published configure the build command. You need 
"build-android-apk": "turtle build:android --config app.json --type apk --output artifact/teamshop-mobile.apk --keystore-path node_modules/react-native/keystores/debug.keystore --keystore-alias androiddebugkey",

--output [path where the desired .apk will be put]
--keystore-path путь к ключам для подписи файла .apk
--keystore-alias alias который указывается при генерации ключа командой
```bash
keytool -genkeypair -v -keystore keystore.jks -alias keyalias -keyalg RSA -keysize 2048 -validity 9125
```

Example:

```bash
EXPO_ANDROID_KEYSTORE_PASSWORD="password" \
EXPO_ANDROID_KEY_PASSWORD="password" \
turtle build:android \
--config app.json \
--type apk \
--output ~/path/to/build/application_name.apk \
--keystore-path ~/path/to/build/keystore/keystore.jks \
--keystore-alias "keyalias" \
-u expo_login \
-p expo_password
```

Подробная инструкция взята с https://www.robincussol.com/build-standalone-expo-apk-ipa-with-turtle-cli/#4-create-apk-file----android

### Common errors:
 -- Please install JDK 8 - keep in mind that other versions are not supported by Android $JAVA_HOME должна указывать на соответствующую версию jdk
~/.config/fish/config.fish
```bash
set -gx JAVA_HOME /Volumes/Macintosh HD/Library/Java/JavaVirtualMachines/jdk1.8.0_251.jdk/Contents/Home $JAVA_HOME \
set -gx PATH ~/path/to/application_project_dir/node_modules/fastlane/ $PATH
```
