# Changelog

## [3.0.3] - 2025-10-20

### Fixed
- **Übersetzungsproblem behoben**: Nach Update auf v3.0.2 wurden Übersetzungen nicht mehr korrekt angewendet
  - Verbesserte Basis-URL-Erkennung für Übersetzungsdateien
  - Robustere Fehlerbehandlung bei der Initialisierung
  - Fallback-Mechanismen für verschiedene Installationsarten (HACS, lokal, manuell)
  - Betrifft: `translation-utils.ts`

### Technical
- Erweiterte `getCardBaseUrl()` Methode mit mehreren Fallback-Strategien
- Debug-Ausgaben für bessere Fehlersuche
- Alternative Pfade für Übersetzungsdateien

---

## [3.0.2] - 2025-10-20

### Fixed
- **Phasen-Dauer-Berechnung**: Korrigiert unrealistische Werte im Pie Chart und Timeline
  - Phasen-Dauern werden nun korrekt bis zum Start der nächsten Phase berechnet
  - Verhindert, dass abgeschlossene Phasen bis "heute" berechnet werden
  - Betrifft: `_calculatePhaseDuration()` in `consumption.ts`
  - Beispiel: `seeds_start: 2025-07-29` zeigt jetzt 3 Tage (bis `germination_start: 2025-08-01`) statt 83 Tage
  
- **List-Card Duration-Anzeige**: Dynamische Berechnung für nicht gesetzte Dauern
  - Wenn `duration = null`, berechnet die List-Card nun automatisch die Dauer bis zur nächsten Phase
  - Konsistente Anzeige zwischen Pie Chart, Timeline und List-Card
  - Betrifft: `cell-renderer.ts` Duration-Felder

- **Tent WebSocket-Unterstützung**: Fehlende `websocket_info`-Property implementiert
  - Behebt `AttributeError: 'Tent' object has no attribute 'websocket_info'`
  - Tent-Entities können nun über WebSocket abgefragt werden
  - Konsistente WebSocket-API für Plant- und Tent-Entities
  - Betrifft: `tent.py`

### Technical
- Erweiterte `_calculatePhaseDuration()` mit `nextPhaseStartDate`-Parameter
- Phasen-Mapping für alle Growth-Phasen in `cell-renderer.ts`
- WebSocket-Response für Tents mit Sensoren, Wartungseinträgen und Journal

---

## [3.0.1] - 2025-10-19

### Fixed
- **Sortierung nach Wachstumsphase**: Korrigiert die logische Sortierung der Wachstumsphasen in der Liste
  - Phasen-Reihenfolge im Frontend mit Backend synchronisiert (`harvested` und `removed` waren vertauscht)
  - Sortierung erfolgt nun in der korrekten Reihenfolge: Samen → Keimen → Wurzeln → Wachstum → Blüte → Geerntet → Entfernt
  - Hinzugefügt: Debug-Logging für nicht gefundene Phasen in der Browser-Konsole
  - Fallback auf alphabetische Sortierung bei unbekannten Phasen
  
- **Sortierung nach Startdatum**: Korrigiert die Datums-Sortierung für Phasen-Startdaten
  - Startdatum-Felder (`seeds_start`, `germination_start`, etc.) werden nun korrekt aus der `growth_phase`-Entity geholt
  - Zeitstempel-Konvertierung für numerisches Sortieren implementiert
  - Chronologische Sortierung funktioniert nun zuverlässig (älteste/neueste zuerst)

### Changed
- **Build-Konfiguration**: Test-Dateien werden nun korrekt vom Build ausgeschlossen
  - `tsconfig.json` aktualisiert: Test-Dateien (`*.test.ts`, `*.spec.ts`) werden auf TypeScript-Ebene ausgeschlossen
  - `webpack.config.js` vereinfacht, da Filterung bereits durch TypeScript erfolgt
  - Behebt Build-Fehler durch fehlende Test-Dependencies

### Technical
- Synchronisierung der `PHASES`-Konstante zwischen Frontend und Backend
- Konsistente Kleinschreibung für `growth_phase`-Werte zur zuverlässigen Sortierung
- Verbesserte Fehlerbehandlung bei Sortierung unbekannter Werte

---

## [3.0.0] - 2025-XX-XX

Siehe vorherige Releases für ältere Änderungen.
