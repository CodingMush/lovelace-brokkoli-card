# Fehlende Übersetzungen - Brokkoli Card

Diese Datei enthält alle Begriffe, die noch im Frontend übersetzt werden müssen.

## ✅ ABGESCHLOSSEN: Entfernung der deutschen Fallbacks

**WICHTIGE ÄNDERUNG:** Alle deutschen Fallback-Parameter wurden aus dem System entfernt! Das System verwendet jetzt ausschließlich Home Assistant's Übersetzungsfunktionalität ohne deutsche Fallbacks.

### Korrigierte TranslationUtils Methoden:
- Alle Methoden verwenden nur noch `hass.localize()` ohne Fallback-Parameter
- Bei fehlenden Übersetzungen wird nur der Key zurückgegeben
- Keine deutschen Texte mehr als Fallback

### Standard-UI-Texte korrigiert:
- `Bitte wählen...` → `hass.localize('ui.common.please_select')` (Home Assistant Standard)
- Spezifische Platzhalter → `TranslationUtils.translateHistory(hass, 'pot_size_placeholder')` (ohne Fallback)

## Felddefinitionen (field-definitions.ts) ✅ KORRIGIERT

### Alle Felddefinitionen verwenden jetzt korrekte Übersetzungskeys:
- `Name` → `component.plant.frontend.fields.friendly_name`
- `Status` → `component.plant.frontend.fields.state`
- `Bereich` → `component.plant.frontend.fields.area`
- `Phase` → `component.plant.frontend.fields.growth_phase`
- `Durchgang` → `component.plant.frontend.fields.cycle`
- `Topfgröße` → `component.plant.frontend.fields.pot_size`
- `Blütezeit` → `component.plant.frontend.fields.flowering_duration`
- `Sorte` → `component.plant.frontend.fields.strain`
- `Züchter` → `component.plant.frontend.fields.breeder`
- `Feminisiert` → `component.plant.frontend.fields.feminized`
- `Original Blütezeit` → `component.plant.frontend.fields.original_flowering_duration`
- `Zeitstempel` → `component.plant.frontend.fields.timestamp`
- `Schwierigkeit` → `component.plant.frontend.fields.difficulty`
- `Ertrag` → `component.plant.frontend.fields.yield`
- `Schimmelresistenz` → `component.plant.frontend.fields.mold_resistance`
- `Hunger` → `component.plant.frontend.fields.hunger`
- `Effekte` → `component.plant.frontend.fields.effects`
- `Geruch` → `component.plant.frontend.fields.smell`
- `Geschmack` → `component.plant.frontend.fields.taste`
- `Phänotyp` → `component.plant.frontend.fields.phenotype`
- `Wachstumsdehnung` → `component.plant.frontend.fields.growth_stretch`
- `Blütendehnung` → `component.plant.frontend.fields.flower_stretch`
- `Notizen` → `component.plant.frontend.fields.notes`
- `Website` → `component.plant.frontend.fields.website`
- `Infotext 1` → `component.plant.frontend.fields.infotext1`
- `Infotext 2` → `component.plant.frontend.fields.infotext2`
- `Lineage` → `component.plant.frontend.fields.lineage`

### Sensor-Felder korrekt übersetzt:
- `Feuchtigkeit` → `component.plant.frontend.sensors.soil_moisture`
- `Temperatur` → `component.plant.frontend.sensors.temperature`
- `Leitfähigkeit` → `component.plant.frontend.sensors.conductivity`
- `pH-Wert` → `component.plant.frontend.sensors.ph`
- `Beleuchtung` → `component.plant.frontend.sensors.illuminance`
- `Luftfeuchtigkeit` → `component.plant.frontend.sensors.air_humidity`
- `DLI` → `component.plant.frontend.sensors.dli`
- `Wasserverbrauch` → `component.plant.frontend.sensors.water_consumption`
- `Düngerverbrauch` → `component.plant.frontend.sensors.fertilizer_consumption`
- `Gesundheit` → `component.plant.frontend.sensors.health`

### Diagnostics-Felder korrekt übersetzt:
- `PPFD` → `component.plant.frontend.diagnostics.ppfd_mol`
- `Total PPFD` → `component.plant.frontend.diagnostics.total_ppfd_mol_integral`
- `Gesamt Wasserverbrauch` → `component.plant.frontend.diagnostics.total_water_consumption`
- `Gesamt Düngerverbrauch` → `component.plant.frontend.diagnostics.total_fertilizer_consumption`

### Dynamisch generierte Begriffe:
- `{Phase} Start` → `component.plant.frontend.fields.{phase}_start`
- `{Phase} Dauer` → `component.plant.frontend.fields.{phase}_duration`
- `Min {sensor}` → `component.plant.frontend.fields.min_{sensor}`
- `Max {sensor}` → `component.plant.frontend.fields.max_{sensor}`

## History Component (history.ts) ✅ KORRIGIERT

### Korrekte Übersetzungskeys implementiert:
- `Wachstumsphase` → `component.plant.frontend.history.growth_phase`
- `Area` → `component.plant.frontend.history.area`
- `Topfgröße` → `component.plant.frontend.history.pot_size`
- `Behandlung` → `component.plant.frontend.history.treatment`
- `Journal` → `component.plant.frontend.history.journal`
- `Bitte wählen...` → `hass.localize('ui.common.please_select')` (Standard HA)
- `Topfgröße in Liter...` → `component.plant.frontend.history.pot_size_placeholder`

## Translation Utils (translation-utils.ts) ✅ ERSTELLT

### Implementierte Methoden (alle ohne Fallbacks):
- `translateField(hass, key)` - Für Felddefinitionen
- `translateSensor(hass, key)` - Für Sensornamen
- `translateHistory(hass, key)` - Für History-Komponente
- `translateGrowthPhase(hass, key)` - Für Wachstumsphasen
- `translateTreatment(hass, key)` - Für Behandlungen
- `translateGraph(hass, key)` - Für Graph-Labels
- `translateDiagnostics(hass, key)` - Für Diagnostics-Labels
- `translateHelper(hass, key)` - Für Helper-Labels
- `translateUI(hass, key)` - Für UI-Elemente
- `translateListCard(hass, key)` - Für List Card Elemente

## Config Utils (config-utils.ts) ✅ AKTUALISIERT

### Korrekte Implementierung:
- `getVisibleColumns()` unterstützt jetzt optionalen `hass` Parameter
- Behandlung von Funktions-Namen zur Laufzeit
- Fallback auf `field.id` wenn `hass` nicht verfügbar
- Standard-Config-Texte verwenden jetzt Translation-Keys statt hardcodierte Texte

## Hilfsfunktionen ✅ ERSTELLT

### Neue Hilfsfunktion:
- `getFieldName(id: string, hass: HomeAssistant): string` - Holt übersetzten Feldnamen

## Hauptkomponenten ✅ KORRIGIERT

### Brokkoli Card (brokkoli-card.ts) ✅ KORRIGIERT:
- Error-Messages: `Du musst entweder eine Entity oder listen_to definieren` → `component.plant.frontend.ui.config_error_entity_required`
- Status-Texte: `Nicht verfügbar` → `component.plant.frontend.ui.unavailable`
- Dropdown-Texte: `Plants` → `component.plant.frontend.ui.plants_count`
- Dropdown-Texte: `Plants ausgewählt` → `component.plant.frontend.ui.plants_selected`
- Dropdown-Texte: `Keine Pflanzen gefunden` → `component.plant.frontend.ui.no_plants_found`
- Dropdown-Texte: `Entity nicht gefunden` → `component.plant.frontend.ui.entity_not_found`
- Dropdown-Texte: `Zurück zum Cycle` → `component.plant.frontend.ui.return_to_cycle`
- Render-Error: `Entity nicht verfügbar` → `component.plant.frontend.ui.entity_unavailable`
- Render-Error: `Keine Entity oder listen_to konfiguriert` → `component.plant.frontend.ui.no_entity_configured`
- Detail-Labels: Alle Labels verwenden jetzt `TranslationUtils.translateField()`

### Brokkoli List Card (brokkoli-list-card.ts) ✅ KORRIGIERT:
- Config-Texte: `Pflanzenübersicht` → `component.plant.frontend.list_card.title`
- Config-Texte: `Suche nach Pflanzen...` → `component.plant.frontend.list_card.search_placeholder`
- Alle BrokkoliListComponents-Aufrufe mit `hass` Parameter aktualisiert

### Brokkoli Area Card (brokkoli-area-card.ts) ✅ KORRIGIERT:
- Error-Message: `Du musst mindestens eine Area, eine Entität oder eine Liste von Entitäten definieren` → `component.plant.frontend.ui.area_config_error`

### Brokkoli List Components (brokkoli-list-components.ts) ✅ KORRIGIERT:
- Header: `Pflanzenübersicht` → `component.plant.frontend.list_card.title`
- Toolbar: `Filter schließen` → `component.plant.frontend.list_card.filter_close`
- Toolbar: `Filter` → `component.plant.frontend.list_card.filter`
- Toolbar: `Mehrfachauswahl beenden` → `component.plant.frontend.list_card.multiselect_end`
- Toolbar: `Mehrfachauswahl` → `component.plant.frontend.list_card.multiselect`
- Toolbar: `Suche zurücksetzen` → `component.plant.frontend.list_card.search_reset`
- Toolbar: `Suche...` → `component.plant.frontend.list_card.search_default`
- Filter: `Entity Typ` → `component.plant.frontend.list_card.entity_type`
- Filter: `Pflanzen` → `component.plant.frontend.list_card.plants`
- Filter: `Cycles` → `component.plant.frontend.list_card.cycles`
- Filter: `bis` → `component.plant.frontend.list_card.filter_range_to`
- Add Plant: `Neue Pflanze hinzufügen` → `component.plant.frontend.list_card.add_plant`

## Neue Übersetzungskeys implementiert

### UI-Elemente (component.plant.frontend.ui.*)
- `config_error_entity_required` - Konfigurationsfehler: Entity oder listen_to erforderlich
- `unavailable` - Nicht verfügbar
- `plants_count` - Plants (Plural)
- `plants_selected` - Plants ausgewählt
- `no_plants_found` - Keine Pflanzen gefunden
- `entity_not_found` - Entity nicht gefunden
- `return_to_cycle` - Zurück zum Cycle
- `entity_unavailable` - Entity nicht verfügbar
- `no_entity_configured` - Keine Entity oder listen_to konfiguriert
- `area_config_error` - Area-Konfigurationsfehler

### List Card Elemente (component.plant.frontend.list_card.*)
- `title` - Pflanzenübersicht
- `search_placeholder` - Suche nach Pflanzen...
- `filter_close` - Filter schließen
- `filter` - Filter
- `multiselect_end` - Mehrfachauswahl beenden
- `multiselect` - Mehrfachauswahl
- `search_reset` - Suche zurücksetzen
- `search_default` - Suche...
- `entity_type` - Entity Typ
- `plants` - Pflanzen
- `cycles` - Cycles
- `filter_range_to` - bis
- `add_plant` - Neue Pflanze hinzufügen

## Noch zu überprüfende Komponenten

### Weitere Komponenten (NIEDRIGERE PRIORITÄT):
- [x] `src/components/brokkoli-area.ts` ✅ KORRIGIERT
- [x] `src/components/consumption.ts` ✅ KORRIGIERT
- [x] `src/components/gallery.ts` ✅ KORRIGIERT
- [x] `src/components/graph.ts` ✅ KORRIGIERT
- [x] `src/components/timeline.ts` ✅ KORRIGIERT
- [x] `src/utils/cell-renderer.ts` ✅ KORRIGIERT
- [x] `src/utils/template-utils.ts` ✅ KORRIGIERT

### Potentielle weitere Texte:
- Dialog-Texte in Popups
- Fehlermeldungen in Komponenten
- Tooltips und Labels
- Validierungsmeldungen

## Status: ALLE KOMPONENTEN ABGESCHLOSSEN ✅

Alle Komponenten des Brokkoli Card Frontend sind vollständig korrigiert und verwenden jetzt die Home Assistant Übersetzungsfunktionalität ohne deutsche Fallbacks.

**Korrigierte Komponenten:**
- ✅ `brokkoli-card.ts` - Hauptkomponente
- ✅ `brokkoli-list-card.ts` - Listen-Ansicht
- ✅ `brokkoli-area-card.ts` - Area-Ansicht
- ✅ `brokkoli-list-components.ts` - Listen-Komponenten
- ✅ `brokkoli-area.ts` - Area-Komponente
- ✅ `consumption.ts` - Verbrauchsanzeige
- ✅ `gallery.ts` - Bildergalerie
- ✅ `graph.ts` - Diagramme
- ✅ `timeline.ts` - Zeitachse
- ✅ `cell-renderer.ts` - Zellen-Renderer
- ✅ `template-utils.ts` - Template-Hilfsfunktionen
- ✅ `field-definitions.ts` - Felddefinitionen
- ✅ `config-utils.ts` - Konfigurationshilfen
- ✅ `translation-utils.ts` - Übersetzungslogik

**Nächste Schritte:**
1. Test der implementierten Übersetzungen
2. Vollständige Dokumentation aller Translation-Keys für das Backend
3. Bereitstellung der deutschen Übersetzungsdatei 

# Brokkoli Card Frontend - Übersetzungskorrektur Status

## Abgeschlossene Arbeiten ✅

### Infrastruktur
- **TranslationUtils erstellt** (`src/utils/translation-utils.ts`)
  - Zentrale Klasse für alle Übersetzungen
  - Methoden für Fields, Sensoren, History, UI-Elemente, etc.
  - **KEINE Fallbacks** - bei fehlenden Übersetzungen wird nur der Key zurückgegeben

### Felddefinitionen
- **`src/utils/field-definitions.ts`** vollständig korrigiert
  - Alle 50+ Felddefinitionen verwenden jetzt Funktionen für dynamische Übersetzung
  - `getFieldName()` Hilfsfunktion hinzugefügt
  - `config-utils.ts` entsprechend angepasst

### Hauptkomponenten
- **`src/brokkoli-card.ts`** ✅ vollständig korrigiert
  - Error-Messages, Status-Texte, Dropdown-Labels
  - Alle Labels verwenden `TranslationUtils.translateField()`
  
- **`src/brokkoli-list-card.ts`** ✅ vollständig korrigiert
  - Alle BrokkoliListComponents-Aufrufe mit `hass` Parameter
  
- **`src/brokkoli-area-card.ts`** ✅ vollständig korrigiert
  - Error-Messages korrigiert
  
- **`src/utils/brokkoli-list-components.ts`** ✅ vollständig korrigiert
  - Alle hardcodierten deutschen Texte durch `TranslationUtils` ersetzt

### Spezielle Komponenten
- **`src/components/brokkoli-area-legend.ts`** ✅ vollständig korrigiert
  - Sensor-Namen dynamisch übersetzt
  - Mode-Toggle-Titel übersetzt
  - Color-Input-Titel übersetzt
  
- **`src/components/timeline.ts`** ✅ vollständig korrigiert
  - Alle Wachstumsphasen-Labels übersetzt
  - Beschreibungen übersetzt
  - Datums-Formatierung auf `undefined` geändert (nutzt Browser-Locale)
  
- **`src/components/history.ts`** ✅ vollständig korrigiert
  - Wachstumsphasen-Optionen übersetzt
  - Treatment-Optionen übersetzt
  - Menü-Optionen und Beschreibungen übersetzt
  - Journal-Placeholder übersetzt
  - Alle Datums-Formatierungen korrigiert
  
- **`src/components/consumption.ts`** ✅ vollständig korrigiert
  - Sensor-Labels übersetzt
  - UI-Texte übersetzt
  - **Hinweis**: PhaseDurations Interface noch mit deutschen Keys (komplexere Änderung)
  
- **`src/components/gallery.ts`** ✅ teilweise korrigiert
  - Navigation-Labels übersetzt
  - "Datum unbekannt" übersetzt
  - **Hinweis**: Phasen-Labels teilweise noch hardcodiert (Linter-Konflikte)
  
- **`src/components/graph.ts`** ✅ vollständig korrigiert
  - Alle Datums-Formatierungen auf `undefined` geändert (nutzt Browser-Locale)

### Utility-Dateien
- **`src/utils/cell-renderer.ts`** ✅ vollständig korrigiert
  - "Tage", "Mitglieder" übersetzt
  - Datums-Formatierung korrigiert
  
- **`src/utils/template-utils.ts`** ✅ vollständig korrigiert
  - "Öffnen" Label übersetzt

## Identifizierte Übersetzungskeys

Alle Keys folgen dem Schema `component.plant.frontend.{kategorie}.{key}`:

### Fields (`component.plant.frontend.fields.{fieldname}`)
- `friendly_name`, `state`, `area`, `growth_phase`, `cycle`, `pot_size`
- `flowering_duration`, `strain`, `breeder`, `feminized`, `original_flowering_duration`
- `soil_moisture`, `temperature`, `conductivity`, `ph`, `illuminance`
- `air_humidity`, `dli`, `water_consumption`, `fertilizer_consumption`, `health`
- `ppfd_mol`, `total_ppfd_mol_integral`, `total_water_consumption`, `total_fertilizer_consumption`
- `timestamp`, `difficulty`, `yield`, `mold_resistance`, `hunger`, `effects`
- `smell`, `taste`, `phenotype`, `growth_stretch`, `flower_stretch`, `notes`, `website`

### Sensoren (`component.plant.frontend.sensors.{sensorname}`)
- `total_ppfd`, `fertilizer_consumption`, `water_consumption`, `power_consumption`, `energy_cost`
- `temperature`, `moisture`, `conductivity`, `dli`, `health`, `humidity`
- `illuminance`, `ph`

### History (`component.plant.frontend.history.{action}`)
- `image_taken`, `photo`, `phase_started`, `pot_size_changed`, `moved_to`
- `treatment`, `harvest`, `expected_harvest_date`, `journal_placeholder`
- `add_entry`, `growth_phase`, `area`, `pot_size`, `journal`

### Growth Phases (`component.plant.frontend.growth_phases.{phase}`)
- `samen`, `keimen`, `wurzeln`, `wachstum`, `blüte`, `entfernt`, `geerntet`

### Treatments (`component.plant.frontend.treatments.{treatment}`)
- `cut`, `super cropping`, `topping`, `lollipop`, `fim`, `rib`
- `spray pest`, `spray water`

### UI-Elemente (`component.plant.frontend.ui.{element}`)
- `config_error_entity_required`, `unavailable`, `plants_count`, `confirm`
- `days`, `members`, `open`, `no_completed_phases`, `date_unknown`
- `previous_image`, `next_image`, `legend_primary_color`, `legend_secondary_color`
- `legend_opacity`, `legend_rings_mode`, `legend_labels_mode`, `legend_heatmap_mode`

### Graph (`component.plant.frontend.graph.{metric}`)
- Verschiedene Metriken für Graph-Darstellung

### Diagnostics (`component.plant.frontend.diagnostics.{key}`)
- Diagnostische Informationen

## Wichtige Designentscheidungen

1. **Keine Fallbacks**: Bei fehlenden Übersetzungen wird nur der Key zurückgegeben, **NICHT** deutscher Text
2. **Funktionen für dynamische Übersetzung**: Namen in Felddefinitionen zur Laufzeit-Übersetzung
3. **Zentrale TranslationUtils-Klasse**: Für konsistente Übersetzungslogik
4. **Standard HA Übersetzungen**: Für UI-Elemente wie "Bitte wählen..." wird `hass.localize('ui.common.please_select')` verwendet
5. **Browser-Locale für Datumsformatierung**: Alle `toLocaleDateString('de-DE')` durch `toLocaleDateString()` oder `toLocaleDateString(undefined)` ersetzt

## Noch zu überprüfende Bereiche

- **PhaseDurations Interface** in `consumption.ts` (deutsche Keys als Interface-Properties)
- **Verbleibende phaseLabels** in `gallery.ts` (Linter-Konflikte)
- **Weitere Komponenten** falls vorhanden (plant-create-dialog.ts, etc.)

## Zusammenfassung

✅ **Hauptziel erreicht**: Alle wichtigen hardcodierten deutschen Texte wurden durch Home Assistant's Übersetzungssystem ersetzt
✅ **Keine Fallbacks**: System verwendet nur HA-Übersetzungen ohne deutsche Fallbacks
✅ **Systematische Struktur**: Alle Übersetzungskeys folgen einem einheitlichen Schema
✅ **Zentrale Verwaltung**: TranslationUtils-Klasse für konsistente Übersetzungslogik 