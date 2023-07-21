#!/bin/sh
# must be run from root of repo
# or with 'npm run build-app'

rm -rf -f dist/SlackMod.app
npm run build-js

mkdir -p dist/SlackMod.app/Contents/Resources/dist dist/SlackMod.app/Contents/Resources/src
mkdir -p dist/SlackMod.app/Contents/MacOS

cp -r dist/injected-script.js dist/SlackMod.app/Contents/Resources/dist/injected-script.js
cp -r src/main.py dist/SlackMod.app/Contents/Resources/src/main.py
cp -r src/mac-app/Info.plist dist/SlackMod.app/Contents/Info.plist
cp -r src/mac-app/slack-mod dist/SlackMod.app/Contents/MacOS/slack-mod
cp -r src/mac-app/icon.icns dist/SlackMod.app/Contents/Resources/icon.icns

/usr/bin/python3 -m venv dist/SlackMod.app/Contents/Resources/pyvenv
source dist/SlackMod.app/Contents/Resources/pyvenv/bin/activate
pip3 install --upgrade pip
pip3 install --no-binary :all: -r requirements.txt

chmod +x dist/SlackMod.app
chmod +x dist/SlackMod.app/Contents/MacOS/slack-mod