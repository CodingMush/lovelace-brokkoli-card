import { HomeAssistant } from 'custom-card-helpers';

interface TranslationObject {
    [key: string]: string | TranslationObject;
}

export class TranslationUtils {
    private static translationCache: Map<string, TranslationObject> = new Map();
    private static loadingPromises: Map<string, Promise<TranslationObject>> = new Map();
    private static isInitialized = false;

    /**
     * Get the current language from Home Assistant
     */
    private static getLanguage(hass: HomeAssistant): string {
        return hass.language || 'en';
    }

    /**
     * Get the base URL for the card (where translations should be located)
     */
    private static getCardBaseUrl(): string {
        // Try to get base URL from Home Assistant context
        try {
            // @ts-ignore
            if (window.hassConnection && window.hassConnection.hass && window.hassConnection.hass.hassUrl) {
                // @ts-ignore
                const hassBaseUrl = window.hassConnection.hass.hassUrl('');
                const brokkoliBaseUrl = hassBaseUrl.replace(/\/$/, '') + '/hacsfiles/lovelace-brokkoli-card';
                console.debug(`[TranslationUtils] Found base URL from Home Assistant context: ${brokkoliBaseUrl}`);
                return brokkoliBaseUrl;
            }
        } catch (e) {
            console.debug('[TranslationUtils] Could not get base URL from Home Assistant context');
        }
        
        // Try to determine the base URL from the current script location
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].src;
            if (src && (src.includes('brokkoli-card.js') || src.includes('brokkoli-list-card.js') || src.includes('brokkoli-area-card.js'))) {
                const baseUrl = src.substring(0, src.lastIndexOf('/'));
                console.debug(`[TranslationUtils] Found base URL from script tag: ${baseUrl}`);
                return baseUrl;
            }
        }
        
        // Try to get base URL from current document (more reliable)
        try {
            const currentScript = document.currentScript as HTMLScriptElement;
            if (currentScript && currentScript.src) {
                const baseUrl = currentScript.src.substring(0, currentScript.src.lastIndexOf('/'));
                console.debug(`[TranslationUtils] Found base URL from currentScript: ${baseUrl}`);
                return baseUrl;
            }
        } catch (e) {
            console.debug('[TranslationUtils] Could not get base URL from currentScript');
        }
        
        // Fallback: try common locations
        const commonPaths = [
            '/local/brokkoli-card',
            '/hacsfiles/lovelace-brokkoli-card',
            '/config/www/brokkoli-card'
        ];
        
        // Try to detect the actual path from loaded resources
        for (const path of commonPaths) {
            try {
                // Check if translation files exist at this path
                const testUrl = `${path}/translations/de.json`;
                // We can't actually fetch here due to async, but we can use a more intelligent approach
                if (document.querySelector(`script[src*="${path}"]`)) {
                    console.debug(`[TranslationUtils] Found base URL from document query: ${path}`);
                    return path;
                }
            } catch (e) {
                // Continue checking other paths
            }
        }
        
        // Try to determine from document base URI
        try {
            const baseUri = document.baseURI || window.location.href;
            const baseUrl = new URL('/hacsfiles/lovelace-brokkoli-card', baseUri).href;
            console.debug(`[TranslationUtils] Found base URL from document base URI: ${baseUrl}`);
            return baseUrl;
        } catch (e) {
            console.debug('[TranslationUtils] Could not get base URL from document base URI');
        }
        
        // Try to determine from script elements with known patterns
        try {
            const scripts = Array.from(document.querySelectorAll('script[src]'));
            for (const script of scripts) {
                const src = (script as HTMLScriptElement).src;
                if (src.includes('brokkoli')) {
                    const baseUrl = src.substring(0, src.lastIndexOf('/'));
                    console.debug(`[TranslationUtils] Found base URL from brokkoli script: ${baseUrl}`);
                    return baseUrl;
                }
            }
        } catch (e) {
            console.debug('[TranslationUtils] Could not get base URL from brokkoli scripts');
        }
        
        // Try to determine from Home Assistant custom UI path
        try {
            // @ts-ignore
            if (window.hassCustomElements && typeof window.hassCustomElements === 'object') {
                // @ts-ignore
                const customElements = Object.keys(window.hassCustomElements);
                for (const element of customElements) {
                    if (element.includes('brokkoli')) {
                        // @ts-ignore
                        const elementPath = window.hassCustomElements[element];
                        if (typeof elementPath === 'string') {
                            const baseUrl = elementPath.substring(0, elementPath.lastIndexOf('/'));
                            console.debug(`[TranslationUtils] Found base URL from hassCustomElements: ${baseUrl}`);
                            return baseUrl;
                        }
                    }
                }
            }
        } catch (e) {
            console.debug('[TranslationUtils] Could not get base URL from hassCustomElements');
        }
        
        // Return the first common path as final fallback
        console.debug(`[TranslationUtils] Using fallback base URL: ${commonPaths[0]}`);
        return commonPaths[0];
    }

    /**
     * Load the actual translation file from URL
     */
    private static async loadTranslationFile(language: string): Promise<TranslationObject> {
        try {
            const baseUrl = this.getCardBaseUrl();
            const url = `${baseUrl}/translations/${language}.json`;
            
            console.debug(`[TranslationUtils] Trying to load translations from: ${url}`);
            
            const response = await fetch(url);
            if (!response.ok) {
                console.warn(`[TranslationUtils] Failed to load translation file: ${response.status} ${response.statusText} from ${url}`);
                
                // Try alternative paths
                const alternativePaths = [
                    `${baseUrl}/${language}.json`,
                    `/local/translations/${language}.json`,
                    `/hacsfiles/lovelace-brokkoli-card/translations/${language}.json`,
                    `/config/www/brokkoli-card/translations/${language}.json`
                ];
                
                for (const altPath of alternativePaths) {
                    try {
                        console.debug(`[TranslationUtils] Trying alternative path: ${altPath}`);
                        const altResponse = await fetch(altPath);
                        if (altResponse.ok) {
                            const translations = await altResponse.json();
                            console.debug(`[TranslationUtils] Successfully loaded translations from alternative path: ${altPath}`);
                            return translations;
                        }
                    } catch (altError) {
                        console.debug(`[TranslationUtils] Alternative path failed: ${altPath}`, altError);
                    }
                }
                
                throw new Error(`Failed to load translation file: ${response.status}`);
            }
            
            const translations = await response.json();
            console.debug(`[TranslationUtils] Successfully loaded translations for ${language}`);
            return translations;
        } catch (error) {
            console.warn(`[TranslationUtils] Failed to load translations for language ${language}, falling back to English`, error);
            // Fallback to English if language file not found
            if (language !== 'en') {
                return this.loadTranslationFile('en');
            }
            // If even English fails, return empty object
            return {};
        }
    }

    /**
     * Dynamically load translation file for the given language
     */
    private static async loadTranslations(language: string): Promise<TranslationObject> {
        // Return cached if available
        if (this.translationCache.has(language)) {
            return this.translationCache.get(language)!;
        }

        // Return existing loading promise if already loading
        if (this.loadingPromises.has(language)) {
            return this.loadingPromises.get(language)!;
        }

        // Create new loading promise
        const loadingPromise = this.loadTranslationFile(language);
        this.loadingPromises.set(language, loadingPromise);

        try {
            const translations = await loadingPromise;
            this.translationCache.set(language, translations);
            this.loadingPromises.delete(language);
            return translations;
        } catch (error) {
            this.loadingPromises.delete(language);
            throw error;
        }
    }

    /**
     * Get translation from our local translation files (synchronous with cached data)
     */
    private static getTranslation(hass: HomeAssistant, key: string): string {
        const language = this.getLanguage(hass);
        
        // If translations are cached, use them
        if (this.translationCache.has(language)) {
            const result = this.getTranslationFromObject(this.translationCache.get(language)!, key);
            console.debug(`[TranslationUtils] Translated '${key}' to '${result}' for language ${language}`);
            return result;
        }

        // If not cached and not initialized, start loading
        if (!this.isInitialized) {
            console.debug(`[TranslationUtils] Initializing translations for language ${language}`);
            this.loadTranslations(language).catch(error => {
                console.warn('Failed to load translations:', error);
            });
        }

        console.debug(`[TranslationUtils] Translation not found in cache for '${key}', returning key`);
        return key; // Return key as fallback until translations are loaded
    }

    /**
     * Extract translation from translation object
     */
    private static getTranslationFromObject(translations: TranslationObject, key: string): string {
        try {
            const keys = key.split('.');
            let current: string | TranslationObject = translations;
            
            for (const k of keys) {
                if (current && typeof current === 'object' && k in current) {
                    current = current[k];
                } else {
                    return key; // Return key if not found
                }
            }
            
            return typeof current === 'string' ? current : key;
        } catch (error) {
            console.warn('Translation not found:', key, error);
            return key;
        }
    }

    /**
     * Initialize translations for a language (must be called before first render)
     */
    static async initializeTranslations(hass: HomeAssistant): Promise<void> {
        const language = this.getLanguage(hass);
        
        try {
            await this.loadTranslations(language);
            this.isInitialized = true;
        } catch (error) {
            console.warn('Failed to initialize translations:', error);
            this.isInitialized = true; // Set to true even on error to prevent infinite retries
        }
    }

    /**
     * Translate a field name using our translation file
     */
    static translateField(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, `frontend.fields.${key}`);
    }

    /**
     * Translate a sensor name using our translation file
     */
    static translateSensor(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, `frontend.sensors.${key}`);
    }

    /**
     * Translate a growth phase using our translation file
     */
    static translateGrowthPhase(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, `frontend.growth_phases.${key}`);
    }

    /**
     * Translate a treatment using our translation file
     */
    static translateTreatment(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, `frontend.treatments.${key}`);
    }

    /**
     * Translate a graph metric using our translation file
     */
    static translateGraph(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, `frontend.graph.${key}`);
    }

    /**
     * Translate a diagnostics key using our translation file
     */
    static translateDiagnostics(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, `frontend.diagnostics.${key}`);
    }

    /**
     * Translate a UI element using our translation file
     */
    static translateUI(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, `frontend.ui.${key}`);
    }

    /**
     * Translate a list card element using our translation file
     */
    static translateListCard(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, `frontend.list_card.${key}`);
    }

    /**
     * Translate a history element using our translation file
     */
    static translateHistory(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, `frontend.history.${key}`);
    }

    /**
     * Generic translate method using our translation file
     */
    static translate(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, key);
    }

    /**
     * Helper method using our translation file
     */
    static translateHelper(hass: HomeAssistant, key: string): string {
        return this.getTranslation(hass, `frontend.helpers.${key}`);
    }

    /**
     * Create a tooltip text for sensor bars
     */
    static createSensorTooltip(hass: HomeAssistant, sensorName: string, value: number, min: number, max: number, unit?: string): string {
        const translatedSensorName = this.translateSensor(hass, sensorName);
        const minMaxText = this.translateUI(hass, 'tooltip_min_max');
        if (unit) {
            return `${translatedSensorName}: ${value} ${unit}<br>(${minMaxText}: ${min} ~ ${max} ${unit})`;
        } else {
            return `${translatedSensorName}: ${value}<br>(${minMaxText}: ${min} ~ ${max})`;
        }
    }
} 