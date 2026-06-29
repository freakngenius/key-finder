# Key Finder

An interactive piano key & chord cheat sheet, installable as a desktop/mobile app (PWA). Pick a root note and scale and the in-key notes light up on the keyboard. Explore the 7 diatonic chords and common progressions, view them as a single piano or a grid of per-chord mini pianos, and a Live view detects the song's key by ear through the mic. Everything plays through a built-in Web Audio synth. Settings persist locally.

## Stack

Single self-contained `index.html`. No build step, no dependencies, no backend. Vanilla HTML/CSS/JS with the Web Audio API. PWA assets: `manifest.webmanifest`, `sw.js` (offline service worker), and `icons/`.

## Run locally

Serve over a local server (a service worker needs http/https, not file://):

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the printed URL.

## Deploy

Static site. Push to `main` and Vercel auto-deploys. The service worker uses network-first for the page (so deploys show up) and cache-first for assets (so it runs offline once installed). If you change cached assets and want to force a refresh, bump `CACHE` in `sw.js`.

## Install as an app

- Desktop (Chrome/Edge): open the live URL, click the Install icon in the address bar (or browser menu > Install Key Finder). It opens in its own window with a dock/taskbar icon and works offline.
- iPhone/iPad (Safari): Share > Add to Home Screen.
- Android (Chrome): menu > Install app / Add to Home Screen.

## Share

Send people the live URL. They install it the same way. No app store, no signing.

## Shipping an update (so users get the "Update app" prompt)

The app polls `version.json`. When the version it loaded with differs from the deployed one, an "Update app" button appears at the top of the in-app Settings panel; clicking it reloads to the new version.

So each time you push a change, bump the number in `version.json`, e.g. `{ "version": "2026.06.30.1" }`. That single edit is what triggers the prompt for anyone with the app open. (The page itself already updates on reload regardless, since the service worker is network-first for the page.)

## Microphone

The Live key-detection listener needs mic permission and a secure context (https), which the deployed site provides. The first time, the browser asks to allow the mic.
