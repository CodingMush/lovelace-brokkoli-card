import { html, fixture, expect } from '@open-wc/testing';
import { TentCreateDialog } from './tent-create-dialog';
import { TentFlyoutMenu } from './tent-flyout-menu';

describe('Tent Components', () => {
  it('should register tent-create-dialog custom element', () => {
    expect(customElements.get('tent-create-dialog')).to.exist;
  });

  it('should register tent-flyout-menu custom element', () => {
    expect(customElements.get('tent-flyout-menu')).to.exist;
  });

  it('should render tent-create-dialog with form elements', async () => {
    const el = await fixture(html`<tent-create-dialog></tent-create-dialog>`);
    expect(el).to.exist;
    
    // Check that form elements exist
    const form = el.shadowRoot?.querySelector('form');
    expect(form).to.exist;
    
    // Check that name input exists
    const nameInput = el.shadowRoot?.querySelector('input[name="name"]');
    expect(nameInput).to.exist;
  });

  it('should render tent-flyout-menu with tabs', async () => {
    const el = await fixture(html`<tent-flyout-menu></tent-flyout-menu>`);
    expect(el).to.exist;
    
    // Check that tabs exist
    const tabs = el.shadowRoot?.querySelector('.tabs');
    expect(tabs).to.exist;
    
    // Check that maintenance tab exists
    const maintenanceTab = el.shadowRoot?.querySelector('.tab');
    expect(maintenanceTab).to.exist;
  });
});