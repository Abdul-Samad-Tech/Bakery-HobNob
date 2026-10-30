# Hobnob Bakery Website

HTML5, CSS3 aur JavaScript se bana hua responsive bakery website.

## Chalane ka tareeqa
`index.html` ko browser mein double-click karke kholen. Kisi server ya install ki zaroorat nahi.

## Folder structure
- `index.html` - page ka structure
- `css/style.css` - design aur responsive media queries
- `js/data.js` - products, categories aur banner slides ka array of objects
- `js/script.js` - cards, search, popup, cart count aur banner ka logic
- `img/` - sari images

## GitHub Pages par deploy karna
1. GitHub par naya repository banayen (misal: `hobnob-bakery`).
2. Is folder mein terminal kholen aur ye commands chalayen:

```
git init
git add .
git commit -m "Hobnob Bakery website"
git branch -M main
git remote add origin https://github.com/USERNAME/hobnob-bakery.git
git push -u origin main
```

3. Repository mein `Settings` > `Pages` kholen, `Deploy from a branch` select karen, branch `main` aur folder `/ (root)` chunen, phir `Save` karen.
4. 1-2 minute baad site is link par live hogi: `https://USERNAME.github.io/hobnob-bakery/`
