# Anup Shirke — Marketing & Portfolio Website

A fast, modular, and responsive personal portfolio website built to showcase my work, strategic projects, and journey in marketing and AI strategy.

Live Site: [anupshirke-portfolio](https://www.google.com/search?q=https://anupshirke-portfolio.anupshirke111.workers.dev)

---

## Overview

This repository contains the source code for my professional portfolio. Designed with a minimalist, content-focused aesthetic, the site emphasizes smooth UI motion, modular code architecture, and high performance without reliance on heavy frontend frameworks.

### Key Highlights

* **Modular Component Loading:** Header and footer components loaded dynamically via JavaScript `fetch()` calls to maintain DRY principles across pages.
* **Scroll & Motion FX:** Custom `IntersectionObserver` scroll animations for smooth element entry transitions.
* **Interactive Theme Toggle:** Light/Dark mode state management powered by `localStorage`.
* **Direct Lead Capture:** Dual contact mechanism featuring an embedded form (Web3Forms API) and quick-action `mailto:` triggers.
* **Security Deterrents:** Client-side event listeners to prevent casual source-saving (`Ctrl+S`) and custom context menu configurations.

---

## 💡 The $0 Build Strategy & Philosophy

This website was engineered and published **without spending a single dollar**, proving that a high-performance, polished web presence requires zero financial investment when leveraging modern tools:

* **0-Cost Hosting & Deployment:** Hosted completely free on **Cloudflare Pages / Workers** linked directly to GitHub for continuous deployment on every push.
* **AI-Assisted Engineering:** Built using basic HTML/CSS knowledge paired with **GitHub Copilot**, **Gemini**, and **Meta AI** in **VS Code** to generate structural layouts, optimize dynamic JavaScript fetches, and refine interactive UI components.
* **Vanilla Tech Stack:** Core **HTML5**, **CSS3**, and **Vanilla JavaScript** keep the site fast and lightweight without paid backend servers, complex databases, or framework overhead.

---

## Tech Stack

| Domain | Technologies Used |
| --- | --- |
| **Frontend Core** | HTML5, CSS3 (Variables, Flexbox, Grid), Vanilla JavaScript (ES6+) |
| **Development & AI** | VS Code, GitHub Copilot, Gemini, Meta AI |
| **Hosting & Deployment** | Cloudflare Pages / Workers, Git, GitHub |
| **Integrations** | Web3Forms API |

---

## Directory Structure

```text
website-portfolio/
├── assets/
│   ├── img/            # Compressed image assets (.jpg, .png)
│   └── vid/            # Portfolio showcase clips (.mp4)
├── about.html          # Background, skills, and strategic philosophy
├── contact.html        # Direct messaging and inquiry form
├── footer.html         # Dynamic site footer component
├── header.html         # Dynamic header component with navigation
├── index.html          # Hero section and primary landing page
├── script.js           # Navigation logic, theme engine, dynamic fetches, & security listeners
├── style.css          # Global styling, themes, and CSS keyframe animations
└── work.html           # Project case studies and marketing portfolio

```

---

## Local Development Setup

To run and preview this project locally:

1. **Clone the repository:**
```bash
git clone https://github.com/anupshirke/anupshirke-portfolio.git

```


2. **Navigate into the project directory:**
```bash
cd website-portfolio

```


3. **Serve the project:**
Because the header and footer rely on `fetch()` calls, serve the project using a local development server (e.g., VS Code **Live Server** extension or Python's HTTP module) rather than opening `index.html` directly as a local file (`file://`).
```bash
# Using Python 3 built-in server
python -m http.server 8000

```


Open `http://localhost:8000` in your browser.

---

## Contact & Connect

* **Website:** [anupshirke-portfolio](https://www.google.com/search?q=https://anupshirke-portfolio.anupshirke111.workers.dev)
* **Email:** [anup@shirke.design](https://www.google.com/search?q=mailto%3Aanup%40shirke.design)

---

*Created & Maintained by Anup Shirke.*
