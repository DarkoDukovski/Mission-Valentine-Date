# 💌 Will You Be My Valentine?

A small interactive Valentine's Day web page I built from scratch.

You open it, see the question and have two buttons - **Yes** and **No**. The catch? The No button doesn't really want to be clicked.

---

## ✨ How it works

- The **No** button runs away to a random spot on the screen every time you try to click it
- Every time No is clicked, the text on the button changes - it goes through 15 different messages like *"Are you sure? 🤔"*, *"Don't break my heart 💔"*, *"FINAL chance… 💘"* and so on
- Every No click also makes the Yes button grow slightly, making it harder to resist
- Clicking **Yes** fades the page out and reveals a romantic card that says **"You Said Yes!"**
- There are floating heart particles in the background, a confetti burst on Yes, and a custom cursor with a heart trail

---

## 🚀 How to use it

### Option 1 - Send the files (no internet required)

1. Download the project as a ZIP file from GitHub
2. Send the ZIP file to someone you like
3. They can unzip it and just open `index.html` in any browser - works completely offline

### Option 2 - Share the live link

This project is already hosted live! You can simply send this link:

👉 **https://darkodukovski.github.io/Mission-Valentine-Date/**

---

## ✏️ Personalizing it

Open `index.html` in any text editor and change the text to whatever you want:

```html
<!-- The main question -->
Will You Be My Valentine?

<!-- Subtitle under it -->
A small question. A lifetime memory.

<!-- Reveal card after Yes is clicked -->
You Said Yes!
You just made my world brighter.
And I promise to make every single day special.
```

You can also edit the No button messages in `script.js` - look for the `noLabels` array near the top of the file.

---

## 🗂️ Project structure

```
Valentine-No is not an Option/
├── index.html    → page structure
├── style.css     → all styling and animations
└── script.js     → button logic, particles, effects
```

---

## 🛠️ Built with

- HTML5
- CSS3 (custom animations, glassmorphism, responsive layout)
- Vanilla JavaScript (no dependencies)
- Google Fonts - [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) & [Poppins](https://fonts.google.com/specimen/Poppins)

---

Good luck 🤞
