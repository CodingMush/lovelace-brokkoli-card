import { HomeAssistant } from 'custom-card-helpers';

export class TentUtils {
    /**
     * Creates a new tent
     * @param hass Home Assistant instance
     * @param name Tent name
     * @param sensors Optional sensor mappings
     * @returns Promise with the result of the service call
     */
    static async createTent(
        hass: HomeAssistant,
        name: string,
        sensors?: {
            illuminance?: string;
            humidity?: string;
            co2?: string;
            power_consumption?: string;
            ph?: string;
        }
    ): Promise<any> {
        const serviceData: Record<string, any> = { name };
        
        if (sensors) {
            if (sensors.illuminance) serviceData.illuminance_sensor = sensors.illuminance;
            if (sensors.humidity) serviceData.humidity_sensor = sensors.humidity;
            if (sensors.co2) serviceData.co2_sensor = sensors.co2;
            if (sensors.power_consumption) serviceData.power_consumption_sensor = sensors.power_consumption;
            if (sensors.ph) serviceData.ph_sensor = sensors.ph;
        }
        
        return await hass.callService('plant', 'create_tent', serviceData, undefined, undefined, true);
    }

    /**
     * Changes the tent assignment for a plant
     * @param hass Home Assistant instance
     * @param plantEntityId Plant entity ID
     * @param tentId Tent ID (optional if tentName is provided)
     * @param tentName Tent name (optional if tentId is provided)
     * @returns Promise with the result of the service call
     */
    static async changeTent(
        hass: HomeAssistant,
        plantEntityId: string,
        tentId?: string,
        tentName?: string
    ): Promise<any> {
        if (!tentId && !tentName) {
            throw new Error('Either tentId or tentName must be provided');
        }
        
        const serviceData: Record<string, any> = { entity_id: plantEntityId };
        
        if (tentId) serviceData.tent_id = tentId;
        if (tentName) serviceData.tent_name = tentName;
        
        return await hass.callService('plant', 'change_tent', serviceData);
    }

    /**
     * Lists all available tents
     * @param hass Home Assistant instance
     * @returns Promise with the list of tents
     */
    static async listTents(hass: HomeAssistant): Promise<any> {
        return await hass.callService('plant', 'list_tents', {}, undefined, undefined, true);
    }

    /**
     * Adds a maintenance entry to a tent
     * @param hass Home Assistant instance
     * @param tentEntityId Tent entity ID
     * @param description Maintenance description
     * @param performedBy Who performed the maintenance
     * @param cost Cost of the maintenance
     * @returns Promise with the result of the service call
     */
    static async addMaintenanceEntry(
        hass: HomeAssistant,
        tentEntityId: string,
        description: string,
        performedBy: string = 'System',
        cost: number = 0
    ): Promise<any> {
        // This would typically be implemented as a custom service in the backend
        // For now, we'll just log it
        console.log('Adding maintenance entry:', { tentEntityId, description, performedBy, cost });
        return Promise.resolve({ success: true });
    }

    /**
     * Adds a journal entry to a tent
     * @param hass Home Assistant instance
     * @param tentEntityId Tent entity ID
     * @param content Journal entry content
     * @param author Author of the entry
     * @returns Promise with the result of the service call
     */
    static async addJournalEntry(
        hass: HomeAssistant,
        tentEntityId: string,
        content: string,
        author: string = 'System'
    ): Promise<any> {
        // This would typically be implemented as a custom service in the backend
        // For now, we'll just log it
        console.log('Adding journal entry:', { tentEntityId, content, author });
        return Promise.resolve({ success: true });
    }
}