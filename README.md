# Text Highlighter for Firefox (Manifest V2)

A Firefox extension to highlight selected text on web pages, with toggle activation/deactivation from the popup.  
Supports undoing the last highlight using Ctrl+Z / Cmd+Z.

---

## Features

- Toggle highlighting on/off via popup button.
- Highlights selected text with a yellow background.
- Selecting the same text twice removes the highlight.
- Supports undoing the last highlight with **Ctrl+Z** (Windows/Linux) or **Cmd+Z** (macOS).
- No page reload required to start using the extension.

---

## Usage

1. Click the extension icon to open the popup.
2. Click the **"Activate Highlighter"** button to enable highlighting mode.
3. Select text on the webpage to highlight it in yellow.
4. Selecting the same text again will remove the highlight.
5. Undo the last highlight with **Ctrl+Z** or **Cmd+Z**.
6. Click the button in the popup to disable the highlighter.

---

## Main Files

- `manifest.json` – Extension configuration (Manifest V2).
- `popup.html` – Popup UI with activation button.
- `popup.js` – Logic to inject script into the page and toggle highlighting.

---

## License

Made by me.

---

## Contact

For questions or requests, reach out via GitHub.

