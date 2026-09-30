# A Few Little Things for Kittu 🌷

A beautiful, romantic red & pink digital envelope & letter gift built with HTML5, Vanilla CSS, and Vanilla JavaScript.

> *"I wanted to make you something special instead of just sending a normal text message."*

---

## 📂 Project Directory Structure (Systematic Multi-File Setup)

This codebase is systematically organized into separate modular files so that anyone can easily edit HTML, CSS, JavaScript, or music settings:

```text
muku-messages/
├── index.html        # Main HTML file (semantic layout & screen structure)
├── style.css         # Complete CSS (Red/Pink glassmorphism, animations, envelope styling & music player)
├── script.js          # Main JavaScript (Music player logic, envelope interaction, particles, confetti & messages)
├── muku_site.html    # Standalone single-file version (HTML+CSS+JS combined for single-file deployment)
└── README.md         # Full editing & deployment guide
```

---

## 🎵 Background Music Configuration

The website includes **Maiyya – Do Patti** playing in the background.

- **Audio Autoplay Fix**: Displays a stylish music prompt overlay on initial load (*"Open with Music 🎵"*), ensuring browsers allow auto-playing audio upon user click.
- **Song Start Timestamp**: Configured to start at `start=45` (~45 seconds into the song) so that it plays the main chorus and vocal hook right when the reader opens the letters.
- **Floating Controls**: A floating music pill in the bottom-right corner allows Muku to mute/unmute at any time.

---

## ✏️ How to Edit & Customize

### 1. Changing the Recipient's Name
Open `script.js` (or `muku_site.html`) and edit line 8:
```javascript
const herName = "Muku"; // Change "Muku" to any name!
```
All references across titles, intro screens, envelopes, callouts, and final messages will update automatically!

### 2. Editing Message Cards
Open `script.js` and locate the `messages` array:
```javascript
const messages = [
  {
    category: "🌷 A little reminder",
    text: "Your custom message here..."
  },
  // Add, remove, or modify any of the 10 cards here!
];
```

### 3. Changing the Song or Start Timestamp
Open `script.js` and edit the music variables:
```javascript
const songYouTubeId = "Jm3X_a0_71E"; // YouTube video ID
const songStartSeconds = 45; // Start timestamp in seconds (set to 45 for chorus)
```

### 4. Customizing Theme & Colors
Open `style.css` and adjust the variables in `:root`:
```css
:root {
  --bg-gradient: linear-gradient(135deg, #fff0f3 0%, #ffccd5 45%, #ff8fa3 100%);
  --color-accent-red: #d62839;
  --color-accent-pink: #ff4d6d;
}
```

---

## 🚀 Deployment Guide (Netlify / Vercel / GitHub Pages)

### Option A: Uploading to Netlify / Vercel (Folder Upload)
Upload the entire `muku-messages/` folder (containing `index.html`, `style.css`, `script.js`). Netlify/Vercel will automatically serve `index.html` as the homepage!

### Option B: Using `muku_site.html` (Single File Upload)
If uploading a single file directly to Netlify:
1. Rename `muku_site.html` to `index.html`.
2. Drag and drop `index.html` onto Netlify.

---

Made with 🌷 for Muku.
