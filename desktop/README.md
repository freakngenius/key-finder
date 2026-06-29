# Key Finder — Desktop (Tauri)

Wraps the web app (`../app.html`) in a tiny native window. Produces a `.dmg` on macOS and `.msi`/`.exe` on Windows. The build copies the current `app.html` in automatically, so the desktop app always matches the web version.

## One-time setup (per machine)

1. Install Rust: https://www.rust-lang.org/tools/install
2. macOS only: install Xcode command line tools — `xcode-select --install`
   Windows only: install the "Desktop development with C++" workload (Visual Studio Build Tools) and WebView2 (preinstalled on Win 11).
3. Install Node deps here:

```bash
cd desktop
npm install
```

## Build the installer

```bash
cd desktop
npm run build
```

This copies the app in, regenerates icons from `src-tauri/icons/source-1024.png`, and builds. The installer lands in:

- macOS: `src-tauri/target/release/bundle/dmg/Key Finder_1.0.0_*.dmg`
- Windows: `src-tauri/target/release/bundle/msi/` (build on a Windows machine)

To run it in a dev window without packaging: `npm run dev`.

## Publish so the website's "Download Desktop App" works

The landing page button points at your GitHub Releases. Create a release and upload the installer(s):

```bash
# from repo root, after building
gh release create v1.0.0 \
  "desktop/src-tauri/target/release/bundle/dmg/"*.dmg \
  --title "Key Finder 1.0.0" --notes "Desktop app"
```

To make the button download the file directly (not just open the releases page), use a fixed asset name and link to:
`https://github.com/freakngenius/key-finder/releases/latest/download/<asset-name>`

## Notes

- Microphone (Live view): the app declares the mic usage description (`Info.plist`) and audio-input entitlement (`entitlements.plist`). The system will prompt for mic access on first use of the Live view. If a given macOS webview build doesn't grant capture, use the web/PWA version for Live; everything else works natively.
- Sharing on macOS: an unsigned app triggers Gatekeeper ("Apple cannot check it"). Recipients can right-click → Open the first time. For a clean double-click experience, sign + notarize with an Apple Developer account and set signing in `tauri.conf.json` / via env vars.
- Bump `version` in both `package.json` and `src-tauri/tauri.conf.json` for new releases.
