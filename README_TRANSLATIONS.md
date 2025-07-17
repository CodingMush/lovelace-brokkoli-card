# Übersetzungssystem / Translation System

## Übersicht / Overview

Das Brokkoli Card Frontend verwendet ein vollständiges Übersetzungssystem, das automatisch die Sprache von Home Assistant erkennt und die entsprechenden Übersetzungen lädt.

The Brokkoli Card Frontend uses a complete translation system that automatically detects the Home Assistant language and loads the corresponding translations.

## Unterstützte Sprachen / Supported Languages

- **Deutsch (de)**: Vollständig unterstützt / Fully supported
- **Englisch (en)**: Vollständig unterstützt / Fully supported

## Dateien / Files

```
translations/
├── de.json     # Deutsche Übersetzungen
└── en.json     # English translations
```

## Verwendung / Usage

### Automatische Spracherkennung / Automatic Language Detection

Das System erkennt automatisch die in Home Assistant eingestellte Sprache über `hass.language` und lädt die entsprechende Übersetzungsdatei.

The system automatically detects the language set in Home Assistant via `hass.language` and loads the corresponding translation file.

### TranslationUtils API

```typescript
import { TranslationUtils } from './utils/translation-utils';

// Feld-Übersetzungen / Field translations
TranslationUtils.translateField(hass, 'friendly_name');

// Sensor-Übersetzungen / Sensor translations
TranslationUtils.translateSensor(hass, 'temperature');

// Wachstumsphasen / Growth phases
TranslationUtils.translateGrowthPhase(hass, 'samen');

// Behandlungen / Treatments
TranslationUtils.translateTreatment(hass, 'cut');

// UI-Elemente / UI elements
TranslationUtils.translateUI(hass, 'cancel');

// Historie / History
TranslationUtils.translateHistory(hass, 'add_entry');

// Listen-Karte / List card
TranslationUtils.translateListCard(hass, 'plant_overview');

// Grafiken / Graphs
TranslationUtils.translateGraph(hass, 'temperature');

// Diagnostik / Diagnostics
TranslationUtils.translateDiagnostics(hass, 'energy_cost');

// Hilfsmittel / Helpers
TranslationUtils.translateHelper(hass, 'growth_phase');
```

## Struktur der Übersetzungsdateien / Translation File Structure

```json
{
  "component": {
    "plant": {
      "frontend": {
        "ui": {
          "cancel": "Abbrechen" // "Cancel"
        },
        "fields": {
          "friendly_name": "Name" // "Name"
        },
        "sensors": {
          "temperature": "Temperatur" // "Temperature"
        },
        "growth_phases": {
          "samen": "Samen" // "Seed"
        },
        "treatments": {
          "cut": "Schneiden" // "Cut"
        },
        "history": {
          "add_entry": "Eintrag hinzufügen" // "Add Entry"
        },
        "list_card": {
          "plant_overview": "Pflanzenübersicht" // "Plant Overview"
        },
        "graph": {
          "temperature": "Temperatur" // "Temperature"
        },
        "diagnostics": {
          "energy_cost": "Energiekosten" // "Energy Cost"
        },
        "helpers": {
          "growth_phase": "Wachstumsphase" // "Growth Phase"
        }
      }
    }
  }
}
```

## Neue Sprache hinzufügen / Adding a New Language

1. Erstelle eine neue JSON-Datei: `translations/{language_code}.json`
2. Kopiere die Struktur von `de.json` oder `en.json`
3. Übersetze alle Werte in die neue Sprache
4. Erweitere die `getTranslationObject()` Methode in `TranslationUtils`:

```typescript
private static getTranslationObject(hass: HomeAssistant): TranslationObject {
    const language = this.getLanguage(hass);
    
    switch (language) {
        case 'de':
            return deTranslations;
        case 'en':
            return enTranslations;
        case 'fr': // Neue Sprache
            return frTranslations;
        default:
            return enTranslations;
    }
}
```

## Fallback-Verhalten / Fallback Behavior

- Wenn eine Übersetzung nicht gefunden wird, wird der Übersetzungsschlüssel zurückgegeben
- Standardsprache ist Englisch für unbekannte Sprachen
- Keine deutschen Fallback-Texte (entsprechend der Projektanforderungen)

- If a translation is not found, the translation key is returned
- Default language is English for unknown languages  
- No German fallback texts (according to project requirements)

## Wichtige Hinweise / Important Notes

- **Keine Fallback-Mechanismen**: Das System implementiert bewusst keine Fallback-Texte
- **Spracherkennung**: Die Sprache wird automatisch von Home Assistant übernommen
- **Performance**: Beide Übersetzungsdateien werden zur Build-Zeit eingebunden
- **Wartung**: Neue Übersetzungsschlüssel müssen in allen Sprachdateien hinzugefügt werden

- **No Fallback Mechanisms**: The system deliberately implements no fallback texts
- **Language Detection**: The language is automatically taken from Home Assistant
- **Performance**: Both translation files are included at build time
- **Maintenance**: New translation keys must be added to all language files 