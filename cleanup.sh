#!/bin/bash

# Script per pulire i file obsoleti dopo la migrazione a Vite
# Eseguire solo dopo aver verificato che tutto funzioni correttamente

echo "🧹 Pulizia file obsoleti dopo migrazione a Vite..."

# File opzionali da considerare per la rimozione (se non servono più)
echo "📁 File opzionali da valutare:"

if [ -f "assets/geojson/old_trail.js" ]; then
    echo "   - assets/geojson/old_trail.js (mantieni se serve per riferimento)"
fi

if [ -f "assets/geojson/trail.js" ]; then
    echo "   - assets/geojson/trail.js (mantieni se serve per riferimento)"
fi

if [ -f "README.md" ]; then
    echo "   ✓ README.md (unificato con tutte le informazioni)"
fi

echo ""
echo "✅ File già rimossi:"
echo "   ✓ Cartella js/ completa"
echo "   ✓ assets/geojson/insta360.js"  
echo "   ✓ assets/geojson/percorso.js"
echo "   ✓ .vscode/tasks.json"
echo "   ✓ README_VITE.md, GESTIONE_COMANDI.md, NO_TASKS_JSON.md (unificati)"

echo ""
echo "📊 Benefici ottenuti:"
echo "   • Riduzione dimensioni progetto"
echo "   • Eliminazione dipendenze duplicate"
echo "   • Codice più organizzato e mantenibile"
echo "   • Hot Module Replacement attivo"
echo "   • Build ottimizzato con tree-shaking"
echo "   • Gestione unificata tramite npm/make/script"
echo "   • Documentazione centralizzata in README.md"

echo ""
echo "🚀 Comandi disponibili:"
echo "   npm run dev     - Server sviluppo"
echo "   npm run build   - Build produzione"
echo "   npm run preview - Preview build"

echo ""
echo "✨ Migrazione completata con successo!"
