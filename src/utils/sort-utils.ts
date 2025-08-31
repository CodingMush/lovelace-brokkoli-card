import { HomeAssistant } from 'custom-card-helpers';
import { HomeAssistantEntity } from '../types/brokkoli-list-card-types';
import { getFieldValue } from './field-definitions';
import { PHASES } from './constants';

const DATE_FIELDS = ['seeds_start', 'germination_start', 'rooting_start', 'growing_start', 'flowering_start', 'removed_date', 'harvested_date'];

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

            if (DATE_FIELDS.indexOf(sortColumn) !== -1) {
                const aTime = aValue ? Number(aValue) : 0;
                const bTime = bValue ? Number(bValue) : 0;
                return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
            }

            if (sortColumn === 'growth_phase') {
                const aPhase = String(aValue).toLowerCase() as typeof PHASES[number];
                const bPhase = String(bValue).toLowerCase() as typeof PHASES[number];
                const aIndex = PHASES.indexOf(aPhase);
                const bIndex = PHASES.indexOf(bPhase);
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