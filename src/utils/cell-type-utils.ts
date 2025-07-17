import { HomeAssistant } from 'custom-card-helpers';
import { HomeAssistantEntity } from '../types/brokkoli-list-card-types';
import { getFieldDefinition, getFieldType, getFieldValue, ClickAction, getSensorMapEntity } from './field-definitions';

export class CellTypeUtils {
    static getClickAction(columnId: string): ClickAction {
        const field = getFieldDefinition(columnId);
        return field?.clickAction || 'none';
    }

    static getCursorStyle(columnId: string): string {
        const clickAction = this.getClickAction(columnId);
        
        switch(clickAction) {
            case 'more-info':
            case 'edit':
                return 'pointer';
            default:
                return 'default';
        }
    }

    static isDateInput(columnId: string): boolean {
        return getFieldType(columnId) === 'date';
    }

    static isDurationInput(columnId: string): boolean {
        // Only growth phase duration fields (from phaseduration group) are duration inputs
        const field = getFieldDefinition(columnId);
        return field?.group === 'phaseduration';
    }

    static isNumberInput(columnId: string): boolean {
        return getFieldType(columnId) === 'number';
    }

    static isSelectInput(columnId: string): boolean {
        return getFieldType(columnId) === 'select';
    }

    static isTextInput(columnId: string): boolean {
        return getFieldType(columnId) === 'text';
    }

    static isTextArea(columnId: string): boolean {
        return getFieldType(columnId) === 'textarea';
    }

    static getCycleOptions(hass: HomeAssistant, plant: HomeAssistantEntity): string[] {
        // Use sensor map exclusively
        const entity = getSensorMapEntity(hass, plant, 'cycle');
        return entity?.attributes?.options || [];
    }

    static getGrowthPhaseOptions(hass: HomeAssistant, plant: HomeAssistantEntity): string[] {
        // Use sensor map exclusively
        const entity = getSensorMapEntity(hass, plant, 'growth_phase');
        return entity?.attributes?.options || [];
    }

    static getAreaOptions(hass: HomeAssistant): string[] {
        if (!hass) return [];
        const areas = Object.values(hass.areas || {});
        return areas.map(area => area.name).sort();
    }

    static formatNumber(value: string | number, decimals: number = 2): string {
        const num = typeof value === 'string' ? parseFloat(value) : value;
        if (isNaN(num)) return '-';
        return num.toFixed(decimals);
    }

    static getSearchableValue(hass: HomeAssistant, plant: HomeAssistantEntity, columnId: string): string {
        return getFieldValue(columnId, hass, plant).toString();
    }
} 