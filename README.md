# Dídùn Cake Order Form

A premium, boutique-style cake order form built for **Dídùn**. This web application provides a clean, elegant, and interactive interface for customers to customize their cake orders, including tiers, flavors, fillings, and decorative additions.

## 💡 The "Why" & Philosophy

This project was born out of a need to bridge the gap between digital convenience and the tactile, premium feel of a boutique cake shop. The goal was to create a tool that:
1.  **Elevates the Brand**: Moves away from generic Google Forms to a bespoke, branded experience.
2.  **Streamlines Operations**: Standardizes how orders are received, making it easier for the baker to process requests.
3.  **Bridges Digital to Physical**: Designed to look like a physical order slip, it feels "real" whether on a screen or printed out.

## 🌿 Resourceful & Cost-Effective

True to the spirit of boutique craftsmanship, this application is designed to be highly effective without unnecessary overhead:
-   **Zero-Cost Hosting**: Built as a static React app, it can be hosted for free indefinitely on platforms like GitHub Pages or Vercel.
-   **No Database Needed**: By leveraging `localStorage`, the form remembers user input across sessions without the cost or complexity of a backend database.
-   **Client-Side Image Generation**: Uses `html-to-image` to generate high-resolution order slips locally in the user's browser, saving server resources and ensuring privacy.
-   **Print-Optimized**: Native print support means the digital form doubles as a physical record-keeping tool at zero extra development cost.

## ✨ Features

- **Premium Aesthetics**: Minimalist design with high-end typography (Pacifico & Playfair Display).
- **Dynamic Selections**: Allows users to select and unselect options across multiple categories (Tiers, Size, Flavors, etc.).
- **Responsive Layout**: Perfectly centered and optimized for all screen sizes.
- **Image Export**: Generates high-quality PNGs for easy sharing via WhatsApp, Instagram, or Email.
- **Auto-Save**: Progress is automatically saved to the browser, so customers never lose their work.
- **Branding**: Integrated Dídùn branding with clickable social media links.

## 🛠️ Technology Stack

- **React 19** + **TypeScript**
- **Vite** (for lightning-fast development)
- **Vanilla CSS** (precise, lightweight, and boutique-ready)
- **html-to-image** (for high-fidelity browser-side exports)

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/joethesaint/didun-cake-form.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📸 Preview

The form is designed to look like a premium physical order slip, ensuring a consistent brand experience from digital to physical.

---
*Crafted with care for Dídùn.*
