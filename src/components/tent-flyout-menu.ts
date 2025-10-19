import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { HomeAssistant } from 'custom-card-helpers';
import { TranslationUtils } from '../utils/translation-utils';

interface TentInfo {
  tent_id?: string;
  name?: string;
  sensors?: Array<{type: string, entity_id: string}>;
  maintenance_entries?: Array<{timestamp: string, description: string, performed_by: string, cost: number}>;
  journal_entries?: Array<{timestamp: string, content: string, author: string}>;
}

// Prüfen, ob das Element bereits definiert ist
const isElementDefined = customElements.get('tent-flyout-menu');

class TentFlyoutMenuClass extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) tent?: TentInfo;
  @property() entityId?: string;
  @state() private _activeTab: 'maintenance' | 'journal' = 'maintenance';

  // Schließt das Menü
  closeMenu() {
    this.dispatchEvent(new CustomEvent('menu-closed'));
  }

  // Fügt einen Wartungseintrag hinzu
  async addMaintenanceEntry(e: Event) {
    e.preventDefault();
    if (!this.hass || !this.entityId) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const description = formData.get('description') as string;
    const performed_by = formData.get('performed_by') as string;
    const cost = parseFloat(formData.get('cost') as string) || 0;

    // In a real implementation, this would call a service to add the maintenance entry
    // For now, we'll just dispatch an event
    this.dispatchEvent(new CustomEvent('maintenance-added', {
      bubbles: true,
      composed: true,
      detail: {
        description,
        performed_by,
        cost
      }
    }));

    form.reset();
  }

  // Fügt einen Journal-Eintrag hinzu
  async addJournalEntry(e: Event) {
    e.preventDefault();
    if (!this.hass || !this.entityId) return;

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const content = formData.get('content') as string;
    const author = formData.get('author') as string || 'System';

    // In a real implementation, this would call a service to add the journal entry
    // For now, we'll just dispatch an event
    this.dispatchEvent(new CustomEvent('journal-entry-added', {
      bubbles: true,
      composed: true,
      detail: {
        content,
        author
      }
    }));

    form.reset();
  }

  private _renderMaintenanceTab() {
    return html`
      <div class="tab-content">
        <h3>Wartungseinträge</h3>
        ${this.tent?.maintenance_entries && this.tent.maintenance_entries.length > 0
          ? html`
            <div class="entries-list">
              ${this.tent.maintenance_entries.map(entry => html`
                <div class="entry">
                  <div class="entry-header">
                    <span class="timestamp">${new Date(entry.timestamp).toLocaleString()}</span>
                    <span class="performed-by">${entry.performed_by}</span>
                  </div>
                  <div class="entry-content">
                    <p>${entry.description}</p>
                    ${entry.cost > 0 ? html`<p class="cost">Kosten: ${entry.cost.toFixed(2)} €</p>` : ''}
                  </div>
                </div>
              `)}
            </div>
          `
          : html`<p class="no-entries">Keine Wartungseinträge vorhanden</p>`
        }
        
        <h4>Neuen Wartungseintrag hinzufügen</h4>
        <form @submit=${this.addMaintenanceEntry} class="entry-form">
          <div class="form-field">
            <label for="description">Beschreibung</label>
            <textarea id="description" name="description" required></textarea>
          </div>
          <div class="form-field">
            <label for="performed_by">Durchgeführt von</label>
            <input type="text" id="performed_by" name="performed_by">
          </div>
          <div class="form-field">
            <label for="cost">Kosten (€)</label>
            <input type="number" id="cost" name="cost" step="0.01" min="0">
          </div>
          <button type="submit">Hinzufügen</button>
        </form>
      </div>
    `;
  }

  private _renderJournalTab() {
    return html`
      <div class="tab-content">
        <h3>Journal</h3>
        ${this.tent?.journal_entries && this.tent.journal_entries.length > 0
          ? html`
            <div class="entries-list">
              ${this.tent.journal_entries.map(entry => html`
                <div class="entry">
                  <div class="entry-header">
                    <span class="timestamp">${new Date(entry.timestamp).toLocaleString()}</span>
                    <span class="author">${entry.author}</span>
                  </div>
                  <div class="entry-content">
                    <p>${entry.content}</p>
                  </div>
                </div>
              `)}
            </div>
          `
          : html`<p class="no-entries">Keine Journal-Einträge vorhanden</p>`
        }
        
        <h4>Neuen Journal-Eintrag hinzufügen</h4>
        <form @submit=${this.addJournalEntry} class="entry-form">
          <div class="form-field">
            <label for="content">Eintrag</label>
            <textarea id="content" name="content" required></textarea>
          </div>
          <div class="form-field">
            <label for="author">Autor</label>
            <input type="text" id="author" name="author">
          </div>
          <button type="submit">Hinzufügen</button>
        </form>
      </div>
    `;
  }

  render() {
    if (!this.hass || !this.tent) return html``;

    return html`
      <div class="menu-container">
        <div class="menu-content">
          <div class="menu-header">
            <h2>${this.tent.name || 'Zelt'}</h2>
            <button class="close-button" @click=${this.closeMenu}>×</button>
          </div>
          
          <div class="tabs">
            <button 
              class="tab ${this._activeTab === 'maintenance' ? 'active' : ''}"
              @click=${() => this._activeTab = 'maintenance'}
            >
              Wartung
            </button>
            <button 
              class="tab ${this._activeTab === 'journal' ? 'active' : ''}"
              @click=${() => this._activeTab = 'journal'}
            >
              Journal
            </button>
          </div>
          
          ${this._activeTab === 'maintenance' 
            ? this._renderMaintenanceTab()
            : this._renderJournalTab()
          }
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .menu-container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }

      .menu-content {
        background-color: var(--card-background-color, #fff);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 1.5rem;
      }

      .menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .menu-header h2 {
        margin: 0;
        font-size: 1.5rem;
      }

      .close-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.3rem;
        border-radius: 50%;
        line-height: 1;
        width: 2rem;
        height: 2rem;
      }

      .tabs {
        display: flex;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .tab {
        background: none;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        font-size: 1rem;
        border-bottom: 2px solid transparent;
      }

      .tab.active {
        border-bottom: 2px solid var(--primary-color);
        font-weight: bold;
      }

      .tab-content {
        padding: 0.5rem 0;
      }

      .entries-list {
        max-height: 300px;
        overflow-y: auto;
        margin-bottom: 1rem;
      }

      .entry {
        padding: 0.75rem;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        margin-bottom: 0.75rem;
      }

      .entry-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.85rem;
        color: var(--secondary-text-color, #666);
      }

      .entry-content p {
        margin: 0.25rem 0;
      }

      .cost {
        font-weight: bold;
        color: var(--primary-color);
      }

      .no-entries {
        text-align: center;
        color: var(--secondary-text-color, #666);
        font-style: italic;
        padding: 1rem;
      }

      .entry-form {
        background-color: var(--secondary-background-color, #f5f5f5);
        padding: 1rem;
        border-radius: 4px;
      }

      .form-field {
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-bottom: 0.3rem;
        font-weight: 500;
      }

      input, textarea, select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        font-size: 1rem;
      }

      textarea {
        min-height: 80px;
        resize: vertical;
      }

      button {
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 1rem;
        border: none;
      }

      button[type="submit"] {
        background-color: var(--primary-color);
        color: white;
      }
    `;
  }
}

// Nur definieren, wenn es noch nicht existiert
if (!isElementDefined) {
  customElements.define('tent-flyout-menu', TentFlyoutMenuClass);
}

// Exportiere die Klasse (entweder neu definiert oder bereits existierend)
export const TentFlyoutMenu = isElementDefined
  ? customElements.get('tent-flyout-menu') as CustomElementConstructor
  : TentFlyoutMenuClass;