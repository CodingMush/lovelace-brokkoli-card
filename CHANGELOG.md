# Changelog

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
