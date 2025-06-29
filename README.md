# 🏔️ Plaetzwise Project

Un'applicazione web interattiva che combina mappe, video, visualizzazioni 360° e grafici per esplorare percorsi montani.

![Status](https://img.shields.io/badge/Status-Produzione-brightgreen)
![Build Tool](https://img.shields.io/badge/Build-Vite-646CFF)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

# 📑 Indice

- [📄 Licenza](#-licenza)
- [👥 Autori](#-autori)
- [📦 Librerie utilizzate](#-librerie-utilizzate)
- [🚀 Quick Start](#-quick-start)
- [📋 Funzionalità](#-funzionalità)
- [📁 Struttura Progetto](#-struttura-progetto)
- [🛠️ Comandi Disponibili](#️-comandi-disponibili)
- [⚙️ Configurazione](#️-configurazione)
- [🏛️ Architettura Moduli](#️-architettura-moduli)
- [📊 Dati Centralizzati](#-dati-centralizzati)
- [🎯 Funzionalità Avanzate](#-funzionalità-avanzate)
- [🚨 Troubleshooting](#-troubleshooting)
- [🐛 Segnalazione Bug](#-segnalazione-bug)

## 📄 Licenza

Questo progetto è rilasciato sotto **GNU Affero General Public License v3.0**.

### Cosa Significa
- **Uso libero**: Puoi usare, modificare e distribuire liberamente
- **Copyleft forte**: Le modifiche devono rimanere open source
- **Network protection**: App o servizi web derivati devono pubblicare il codice modificato con la stessa licenza 
- **Community first**: Incoraggia collaborazioni produttive

### Obblighi
Se usi questo codice (anche per servizi web):
- Devi rilasciare le tue modifiche sotto AGPL
- Devi fornire accesso al codice sorgente
- Devi mantenere le note di copyright
- Vale anche per applicazioni web-based

Vedi il file [LICENSE](LICENSE) per dettagli completi.

## 👥 Autori

- **Giuseppe Naponiello** - *Sviluppo iniziale* - [@beppenapo](https://github.com/beppenapo)

## 📦 Librerie utilizzate

- [Vite](https://vitejs.dev/) per l'eccellente build tool
- [Leaflet](https://leafletjs.com/) per le mappe interattive
- [Three.js](https://threejs.org/) per la visualizzazione 3D
- [Chart.js](https://www.chartjs.org/) per i grafici

## 🚀 Quick Start

### Prerequisiti
- Node.js >= 16
- npm >= 7

### Setup Locale
```bash
# Spostati nella pagina dove vuoi clonare il repository ed esegui:
git clone https://github.com/ArcTeam/plaetzwiese.git
cd plaetzwise

# Installazione delle librerie e dei moduli
npm install

# Avvia l'applicazione in modalità sviluppo
npm run dev
# Il browser dovrebbe essere aperto in automatico, altrimenti apri http://localhost:3001
```

### Build Produzione
```bash
# Build ottimizzato
npm run build

# File generati in /dist/
ls dist/
```

### Preview Produzione
```bash
# Test build locale
npm run preview

# Accessibile su http://localhost:3001
```

```bash
# Installa dipendenze
npm install

# Avvia sviluppo
npm run dev

# Apri http://localhost:3001
```

## 📋 Funzionalità

- 🗺️ **Mappa interattiva** con Leaflet
- 🎥 **Video sincronizzati** da drone e da terra
- 🌐 **Visualizzatore 360°** con Three.js
- 📊 **Grafico altimetrico** con Chart.js
- 📱 **Design responsive**
- ⚡ **Hot Module Replacement**
- 🟨 **Moduli**: Javascript ES6 native

## 📁 Struttura Progetto
```
plaetzwise/
├── index.html              # Entry point HTML
├── package.json            # Configurazione npm
├── vite.config.js          # Configurazione Vite
├── src/                    # Codice sorgente modulare
│   ├── data/
│   │   └── index.js        # Dati centralizzati
│   ├── modules/
│   │   ├── MapManager.js   # Gestione mappa
│   │   ├── VideoManager.js # Controllo video
│   │   ├── ChartManager.js # Grafico altimetrico
│   │   └── Viewer360.js    # Visualizzatore 360°
│   ├── utils/
│   │   └── DOMUtils.js     # Utility DOM
│   ├── PlaetzwiseApp.js    # Orchestratore principale
│   └── main.js             # Entry point JS
├── assets/                 # Assets statici
│   ├── camera360/          # Immagini 360°
│   ├── video/              # Video drone/terra
│   ├── geojson/            # Dati geografici
│   └── thumb/              # Thumbnails
├── css/                    # Stili CSS
└── img/                    # Immagini UI
```

## 🛠️ Comandi Disponibili

### Metodo 1: NPM Scripts (Raccomandato)
```bash
npm run dev          # Server sviluppo (porta 3001)
npm run build        # Build produzione
npm run preview      # Preview build
npm run deploy       # Build + preview
npm run clean        # Pulizia cache
npm run reinstall    # Reinstall completo
```

### Metodo 2: Script Bash
```bash
./run.sh dev         # Server sviluppo (interfaccia colorata)
./run.sh build       # Build produzione
./run.sh status      # Status progetto
./run.sh help        # Lista comandi
```

### Metodo 3: Makefile
```bash
make dev             # Server sviluppo
make build           # Build produzione
make preview         # Preview build
make help            # Tutti i comandi
```

## ⚙️ Configurazione

### Vite (vite.config.js)
- **Server dev**: porta 3001, auto-open, network access
- **Build**: 
  - **Terser minification:** strumento che "minimizz il codice javascript rimuovendo spazi, commenti, variabili inutili. Il risultato è un file più piccolo e veloce da scaricare
  - **Tree shaking:** è una tecnica che elimina dal bundle finale tutto il codice che non viene effettivamente usato (“dead code”). Se importi solo alcune funzioni di una libreria, tree shaking rimuove le parti inutilizzate. Il risultato è un file JavaScript più leggero e ottimizzato. Serve a migliorare le performance dell’applicazione, caricando solo ciò che serve davvero.
- **Assets**: serviti da `/assets/`
- **Alias**: `@` → `/src`, `@modules` → `/src/modules`

### NPM Scripts Completi
```json
{
  "scripts": {
    "dev": "vite --port 3001 --open",
    "build": "vite build",
    "preview": "vite preview --port 3001 --open",
    "start": "npm run dev",
    "serve": "npm run preview",
    "deploy": "npm run build && npm run preview",
    "clean": "rm -rf dist node_modules/.vite",
    "reinstall": "npm run clean-all && npm install",
    "dev-host": "vite --host 0.0.0.0 --port 3001"
  }
}
```
## 🏛️ Architettura Moduli

### PlaetzwiseApp
```javascript
// Entry point principale che coordina tutti i moduli
class PlaetzwiseApp {
  constructor() {
    this.mapManager = new MapManager();
    this.videoManager = new VideoManager();
    this.chartManager = new ChartManager();
    this.viewer360 = new Viewer360();
  }
}
```

### MapManager (Gestione Mappa)
- Inizializzazione Leaflet
- Markers sincronizzati con video
- Gestione percorsi GeoJSON
- Eventi click e hover

### VideoManager (Controllo Video)
- Sincronizzazione dual-video (drone + terra)
- Controlli unificati
- Aggiornamento markers mappa
- Gestione metadati temporali

### ChartManager (Grafico Altimetrico)
- Rendering grafico Chart.js
- Sincronizzazione con posizione video
- Hover interattivo
- Aggiornamento real-time

### Viewer360 (Panorami)
- Caricamento immagini 360°
- Rendering Three.js
- Controlli mouse/touch
- Transizioni fluide

## 📊 Dati Centralizzati

Tutti i dati sono centralizzati in `/src/data/index.js`:

```javascript
export const chartData = [
  [0, 1523],    // [secondi, altitudine]
  [30, 1567],
  // ...
];

export const geojsonData = {
  type: "FeatureCollection",
  features: [/* percorsi */]
};

export const videoDurations = {
  drone: 390,   // secondi
  ground: 355
};
```

## 🎯 Funzionalità Avanzate

### Hot Module Replacement
- Aggiornamenti istantanei durante sviluppo
- Stato applicazione preservato
- Feedback immediato delle modifiche

### Tree Shaking
- Bundle ottimizzati automaticamente
- Rimozione codice non utilizzato
- Dimensioni file minimizzate

### Code Splitting
- Caricamento lazy dei moduli
- Performance ottimizzate
- Bundle per route/feature

## 🚨 Troubleshooting

### Porta Occupata
```bash
# Cambia porta
npm run dev -- --port 3002

# Trova processo
lsof -ti:3001 | xargs kill -9
```

### Cache Corrotta
```bash
# Pulizia completa
npm run clean
# o
npm run reinstall
```

### Errori Build
```bash
# Verifica dipendenze
npm ls

# Reinstalla se necessario
npm run reinstall
```

### Problemi Assets
```bash
# Assets serviti da /assets/
# Esempio: /assets/video/drone.mp4
# NON: /video/drone.mp4
```

## 🐛 Segnalazione Bug

Per segnalare bug, usa le [GitHub Issues](https://github.com/beppenapo/plaetzwise/issues) con:
- Descrizione dettagliata del problema
- Passi per riprodurre
- Screenshot (se applicabile)
- Informazioni ambiente (browser, OS, Node.js version)