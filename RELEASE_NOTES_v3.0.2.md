# Release Notes v3.0.2

## 🐛 Bugfixes

### 1. Phasen-Dauer-Berechnung im Pie Chart korrigiert

**Problem:**
- Abgeschlossene Wachstumsphasen zeigten unrealistische Werte im Pie Chart
- Beispiel: `seeds_start: 2025-07-29` zeigte 83 Tage (bis heute) statt 3 Tage (bis zur nächsten Phase)

**Lösung:**
- Phasen-Dauern werden nun korrekt bis zum Start der nächsten Phase berechnet
- Nur die aktuelle Phase (ohne Folgephase) läuft bis "heute"
- Betrifft: `_calculatePhaseDuration()` Methode in [`consumption.ts`](src/components/consumption.ts)

**Beispiel:**
```
Vorher:
seeds_start: 2025-07-29 → 83 Tage (bis heute) ❌

Nachher:
seeds_start: 2025-07-29 → 3 Tage (bis germination_start: 2025-08-01) ✅
```

---

### 2. List-Card Duration-Anzeige verbessert

**Problem:**
- List-Card zeigte `-` für nicht gesetzte Dauern, während Pie Chart berechnete Werte anzeigte
- Inkonsistenz zwischen verschiedenen Komponenten

**Lösung:**
- Dynamische Berechnung der Dauer in der List-Card implementiert
- Wenn `duration = null`, wird automatisch die Zeit bis zur nächsten Phase berechnet
- Konsistente Anzeige über alle Komponenten (Pie Chart, Timeline, List-Card)
- Betrifft: Duration-Felder in [`cell-renderer.ts`](src/utils/cell-renderer.ts)

---

### 3. Tent WebSocket-Fehler behoben

**Problem:**
```python
AttributeError: 'Tent' object has no attribute 'websocket_info'
```
- Tent-Entities konnten nicht über WebSocket abgefragt werden
- Fehlende `websocket_info`-Property in der Tent-Klasse

**Lösung:**
- `websocket_info`-Property zur Tent-Klasse hinzugefügt
- Konsistente WebSocket-API für Plant- und Tent-Entities
- Tent-Daten können nun vollständig über WebSocket abgerufen werden
- Betrifft: [`tent.py`](custom_components/plant/tent.py) im Backend

**WebSocket-Response für Tents enthält:**
- Sensor-Werte mit aktuellen Zuständen
- Wartungseinträge (Maintenance)
- Journal-Einträge
- Kamera-Entity-ID
- Zeitstempel (created_at, updated_at)

---

## 🔧 Technische Änderungen

### Frontend (lovelace-brokkoli-card)

1. **`consumption.ts`:**
   - Erweiterte `_calculatePhaseDuration(startDate, duration, nextPhaseStartDate)` mit neuem Parameter
   - Pie Chart verwendet nun korrekte Phasenübergänge

2. **`cell-renderer.ts`:**
   - Phasen-Mapping für alle Growth-Phasen implementiert
   - Automatische Dauer-Berechnung bei fehlenden Werten

### Backend (homeassistant-brokkoli)

3. **`tent.py`:**
   - Neue `websocket_info`-Property hinzugefügt
   - Vollständige WebSocket-Unterstützung für Tent-Entities

---

## 📦 Installation

### Über HACS (empfohlen)
1. HACS → Frontend → Drei Punkte → Custom Repositories
2. Repository: `https://github.com/Olen/lovelace-brokkoli-card`
3. Kategorie: Lovelace
4. Nach der Installation auf Version **3.0.2** aktualisieren

### Manuell
1. Lade `brokkoli-card.js` herunter
2. Kopiere nach `/config/www/`
3. Füge die Ressource in der Lovelace-Konfiguration hinzu

---

## ⚙️ Upgrade-Hinweise

- **Keine Breaking Changes**: Diese Version ist vollständig kompatibel mit 3.0.1
- **Cache leeren**: Nach dem Update Browser-Cache leeren (Strg+F5)
- **Automatische Migration**: Bestehende Konfigurationen funktionieren ohne Änderungen

---

## 🙏 Danke

Vielen Dank an alle, die Fehler gemeldet und getestet haben!

---

## 🔗 Links

- [Vollständiges Changelog](CHANGELOG.md)
- [GitHub Repository](https://github.com/Olen/lovelace-brokkoli-card)
- [Issue Tracker](https://github.com/Olen/lovelace-brokkoli-card/issues)
