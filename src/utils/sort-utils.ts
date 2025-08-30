import { HomeAssistant } from 'custom-card-helpers';
import { HomeAssistantEntity } from '../types/brokkoli-list-card-types';
import { getFieldValue } from './field-definitions';
import { PHASES } from './constants';

export class SortUtils {
    static getSortedPlants(
        plants: HomeAssistantEntity[],
        sortColumn: string,
        sortDirection: 'asc' | 'desc',
        hass: HomeAssistant
    ): HomeAssistantEntity[] {
        return [...plants].sort((a, b) => {
            const aValue = getFieldValue(sortColumn, hass, a);
            const bValue = getFieldValue(sortColumn, hass, b);

            if (sortColumn === 'growth_phase') {
                const aIndex = PHASES.indexOf(String(aValue).toLowerCase());
                const bIndex = PHASES.indexOf(String(bValue).toLowerCase());
                return sortDirection === 'asc' ? aIndex - bIndex : bIndex - aIndex;
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }

            const aString = String(aValue).toLowerCase();
            const bString = String(bValue).toLowerCase();
            
            return sortDirection === 'asc'
                ? aString.localeCompare(bString)
                : bString.localeCompare(aString);
        });
    }
} 