# Luxora Atelier — Luxury Leather Lamps (Shopify Theme)

An ultra-premium, bespoke Shopify Online Store 2.0 (OS 2.0) theme created for **Luxora Atelier**, a luxury lighting brand specializing in handcrafted leather lamps for discerning clientele in the **United Kingdom, United States, Europe, and worldwide**.

---

## 🌟 Brand & Visual Identity
- **Aesthetic**: Warm architectural luxury, heritage saddle leather, brushed brass, deep obsidian, and warm alabaster lighting tones.
- **Typography**: Editorial serif headings paired with clean, modern geometric body text.
- **Global Ready**: Built-in multi-currency switcher (GBP £, USD $, EUR €), international plug & voltage selectors (UK Type G 230V, US Type A/B 120V, EU Type C), and white-glove international shipping badges.
- **Online Store 2.0 Native**: Complete JSON templates, modular sections, drag-and-drop customization in the Shopify Theme Editor.

---

## 📁 Theme Architecture
```
luxora/
├── assets/
│   ├── theme.css                  # Bespoke luxury stylesheet & fluid typography
│   └── theme.js                   # Cart drawer, mobile nav, currency modal, gallery logic
├── config/
│   ├── settings_schema.json       # Shopify visual customizer controls
│   └── settings_data.json         # Luxury color palette & default presets
├── layout/
│   └── theme.liquid               # Core HTML wrapper & metadata
├── locales/
│   └── en.default.json            # English translations & market labels
├── sections/
│   ├── announcement-bar.liquid    # UK / US shipping notice & currency switcher
│   ├── header.liquid              # Sticky luxury navigation & cart trigger
│   ├── hero-banner.liquid         # Editorial cinematic hero section
│   ├── value-props.liquid         # 4 luxury heritage trust pillars
│   ├── featured-collection.liquid # Curated flagship lamps showcase
│   ├── craftsmanship-story.liquid # "The Art of Saddle Leather" editorial split
│   ├── product-showcase.liquid    # Interactive lamp spotlight & detail hotspots
│   ├── collections-grid.liquid    # Category visual cards (Desk, Table, Floor, Bespoke)
│   ├── customer-reviews.liquid    # Interior designer & VIP client testimonials
│   ├── newsletter.liquid          # Private salon invitation & collector drops
│   ├── footer.liquid              # Luxury 4-column footer & payment icons
│   ├── main-product.liquid        # Product detail with plug/voltage selector & swatches
│   ├── main-collection.liquid     # Catalog filter & grid
│   └── cart-drawer.liquid         # Slide-out Ajax cart with free shipping bar
├── snippets/
│   ├── product-card.liquid        # Reusable luxury product card
│   ├── price.liquid               # Currency and price formatter
│   ├── country-currency-modal.liquid # Global market switcher modal
│   └── icon-*.liquid              # Crisp inline SVGs
└── templates/
    ├── index.json                 # Dynamic homepage layout
    ├── product.json               # Product detail layout
    ├── collection.json            # Collection catalog layout
    ├── cart.json                  # Standalone cart layout
    ├── 404.json                   # 404 page layout
    └── page.liquid                # Standard editorial content layout
```

---

## 🚀 How to Connect to Shopify via GitHub

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: complete Luxora luxury leather lamps Shopify theme"
   git push -u origin main
   ```

2. **Connect in Shopify Admin**:
   - Log into your Shopify Store Admin.
   - Go to **Online Store** > **Themes**.
   - Under the **Theme library** section, click **Add theme** > **Connect from GitHub**.
   - Select your GitHub account and the repository: `rehan95645590-dot/luxora`.
   - Select the `main` branch and click **Connect**.
   - Shopify will automatically pull the theme and create a preview!

3. **Publish & Customize**:
   - Click **Customize** to visually add your lamp photography, adjust copy, configure prices, or rearrange sections.
   - Click **Publish** whenever you are ready to make it live to the world!

---

*Crafted for Luxora Atelier — Where Master Leather Craft Meets Sculpted Light.*
