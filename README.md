# Key Finder

An interactive piano key & chord cheat sheet. Pick a root note and scale (Major/Minor) and the in-key notes light up on the keyboard. Explore the 7 diatonic chords and common progressions, view them as a single piano or as a grid of per-chord mini pianos, and hear everything via a built-in Web Audio synth. Fully customizable colors, glow, sizing, waveform, and tempo.

## Stack

Single self-contained `index.html`. No build step, no dependencies, no backend. Vanilla HTML/CSS/JS with the Web Audio API.

## Run locally

Open `index.html` in a browser, or serve it:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Deploy

It's a static site. Push to GitHub and import the repo in Vercel (framework preset: Other / no build command, output directory: root). Every push to `main` redeploys.
