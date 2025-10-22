# Release Notes v3.0.3

## 🐛 Hotfix: Übersetzungsproblem behoben

### Problem
Nach dem Update auf Version 3.0.2 wurden die Übersetzungen nicht mehr korrekt angewendet. Benutzer sahen nur die englischen Schlüssel anstelle der übersetzten Texte.

### Ursache
Die Methode zur Bestimmung des Basis-URL für die Übersetzungsdateien funktionierte nicht zuverlässig mit allen Installationstypen.

### Lösung
Die Basis-URL-Erkennung wurde erheblich verbessert:

#### 1. **Verbesserte Basis-URL-Erkennung**
- **Home Assistant Context**: Versucht zuerst, den Basis-URL aus dem Home Assistant-Kontext zu erhalten
- **Script Tags**: Durchsucht alle Script-Tags nach brokkoli-Dateien
- **Current Script**: Nutzt `document.currentScript` zur Bestimmung
- **Document Base URI**: Verwendet `document.baseURI` als Fallback
- **Brokkoli Scripts**: Sucht gezielt nach brokkoli-Skripten im DOM
- **Hass Custom Elements**: Prüft `window.hassCustomElements` auf brokkoli-Einträge
- **Common Paths**: Fallback auf bekannte Pfade

#### 2. **Verbesserte Fehlerbehandlung**
- **Debug-Ausgaben**: Detaillierte Konsolen-Ausgaben zur Fehlersuche
- **Alternative Pfade**: Prüft mehrere mögliche Pfade für Übersetzungsdateien
- **Robuster Fallback**: Selbst bei Problemen mit dem Basis-URL funktioniert die Karte weiter

#### 3. **Technische Verbesserungen**
- Asynchrone Initialisierung der Übersetzungen
- Effizientes Caching der geladenen Übersetzungen
- Fehler-Toleranz mit englischen Standard-Texten als Fallback

---

## 📦 Installation

### Über HACS (empfohlen)
1. HACS → Frontend → Drei Punkte → Custom Repositories
2. Repository: `https://github.com/Olen/lovelace-brokkoli-card`
3. Kategorie: Lovelace
4. Nach der Installation auf Version **3.0.3** aktualisieren

### Manuell
1. Lade `brokkoli-card.js` herunter
2. Kopiere nach `/config/www/`
3. Füge die Ressource in der Lovelace-Konfiguration hinzu

---

## ⚙️ Upgrade-Hinweise

- **Keine Breaking Changes**: Diese Version ist vollständig kompatibel mit 3.0.2
- **Cache leeren**: Nach dem Update Browser-Cache leeren (Strg+F5)
- **Automatische Migration**: Bestehende Konfigurationen funktionieren ohne Änderungen

---

## 🙏 Danke

Vielen Dank an alle, die das Problem gemeldet haben!

---

## 🔗 Links

- [Vollständiges Changelog](CHANGELOG.md)
- [GitHub Repository](https://github.com/Olen/lovelace-brokkoli-card)
- [Issue Tracker](https://github.com/Olen/lovelace-brokkoli-card/issues)