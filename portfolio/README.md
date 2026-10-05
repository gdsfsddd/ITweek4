# Persoonlijke Portfolio Website

Een moderne, responsive portfolio website gebouwd met HTML, CSS en vanilla JavaScript.

## 🚀 Features

- **Responsive Design** - Werkt op alle schermformaten (mobile, tablet, desktop)
- **Moderne UI/UX** - Schone, professionele look met smooth animaties
- **Projectenpagina** - Aparte overzichtspagina met filteren op categorie
- **Toegankelijkheid** - WCAG 2.1 compliant (semantische HTML, ARIA labels, focus states)
- **Performance** - Geoptimaliseerde assets, lazy loading, minimaal JavaScript
- **Dark Mode Support** - Automatische detectie van systeempreferentie
- **Reduced Motion** - Respecteert `prefers-reduced-motion` voor toegankelijkheid

## 📁 Projectstructuur

```
portfolio/
├── index.html              # Hoofdpagina
├── projecten.html          # Overzichtspagina met alle projecten
├── css/
│   ├── main.css           # Hoofdstyles
│   └── responsive.css     # Responsive breakpoints & media queries
├── js/
│   ├── projects.js        # Projectdata (enige bron)
│   └── main.js            # Render-, filter- en interactielogica
├── assets/
│   ├── images/            # Project afbeeldingen, avatar, etc.
│   └── icons/             # Favicon, social icons, etc.
└── components/            # Herbruikbare HTML componenten (optioneel)
```

## 🛠️ Installatie & Gebruik

### Lokaal uitvoeren

1. Clone of download de repository
2. Open `index.html` direct in je browser
3. Of gebruik een lokale server (aanbevolen voor development):

```bash
# Met Python 3
python -m http.server 8000

# Met Node.js (npx)
npx serve

# Met PHP
php -S localhost:8000
```

Daarna open je `http://localhost:8000` in je browser.

### Deployen

De site kan gratis gehost worden op:
- **GitHub Pages** - Push naar `main` branch, enable Pages in settings
- **Netlify** - Drag & drop de `portfolio` map
- **Vercel** - Import project vanuit GitHub
- **Firebase Hosting** - `firebase deploy`

## ✏️ Aanpassen

### Persoonlijke gegevens wijzigen

Bewerk `index.html`:
- Wijzig de naam in `.hero__title`
- Update de bio in `#about` sectie
- Voeg je vaardigheden toe in `.skills__list`
- Update contactgegevens in de footer

### Projecten toevoegen

Bewerk `js/projects.js` en voeg een object toe aan de `projects` array:

```javascript
const projects = [
    {
        id: 1,
        title: 'Mijn Project',
        description: 'Beschrijving van het project',
        image: 'assets/images/mijn-project.jpg',
        tags: ['React', 'TypeScript', 'Tailwind'],
        category: 'webapplicatie',  // webapplicatie | schoolopdracht | tool
        year: 2026,
        status: 'Afgerond',
        demoUrl: 'https://demo-url.com',
        codeUrl: 'https://github.com/gebruiker/repo'
    },
    // Meer projecten...
];
```

> `category` bepaalt achter welke filterknop het project valt. Laat `demoUrl` of
> `codeUrl` op `'#'` staan als er nog geen link is: er wordt dan geen dode link getoond.

Voeg project afbeeldingen toe aan `assets/images/`.

### Kleuren & Styling

Pas CSS custom properties aan in `css/main.css`:

```css
:root {
    --color-primary: #2563eb;      // Hoofdkleur
    --color-secondary: #0f172a;    // Donkere tekst
    --color-accent: #f59e0b;       // Accentkleur
    --font-family: 'Inter', ...;   // Font
    --container-width: 1200px;     // Max breedte
}
```

## 📱 Browser Ondersteuning

- Chrome (laatste 2 versies)
- Firefox (laatste 2 versies)
- Safari (laatste 2 versies)
- Edge (laatste 2 versies)

## ♿ Toegankelijkheid

De website volgt WCAG 2.1 AA richtlijnen:
- Semantische HTML5 elementen
- Voldoende kleurcontrast (4.5:1)
- Toetsenbordnavigatie
- ARIA labels op interactieve elementen
- Focus indicators
- Alt teksten op afbeeldingen
- Skip links (kan toegevoegd worden)

## 🔧 Development

### Best Practices

- Gebruik CSS custom properties voor theming
- Mobile-first approach in CSS
- BEM naming convention voor CSS classes
- ES6+ JavaScript features
- Intersection Observer voor scroll animaties
- Event delegation waar mogelijk

### Code Style

- 4 spaties indentatie
- Eenregelige comments voor complexe logica
- Duidelijke variabele namen
- Modulaire functies

## 📄 Licentie

Dit project is open source en beschikbaar onder de [MIT Licentie](LICENSE).

## 🤝 Bijdragen

Verbeteringen zijn welkom! Maak een issue of pull request aan.

---

Gemaakt met ❤️ voor mijn portfolio