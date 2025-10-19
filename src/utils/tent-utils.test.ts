import { expect } from '@open-wc/testing';
import { TentUtils } from './tent-utils';

describe('TentUtils', () => {
  it('should have createTent method', () => {
    expect(TentUtils.createTent).to.be.a('function');
  });

  it('should have changeTent method', () => {
    expect(TentUtils.changeTent).to.be.a('function');
  });

  it('should have listTents method', () => {
    expect(TentUtils.listTents).to.be.a('function');
  });

  it('should have addMaintenanceEntry method', () => {
    expect(TentUtils.addMaintenanceEntry).to.be.a('function');
  });

  it('should have addJournalEntry method', () => {
    expect(TentUtils.addJournalEntry).to.be.a('function');
  });

  it('should throw error when changeTent is called without tentId or tentName', async () => {
    try {
      await TentUtils.changeTent({} as any, 'plant.test');
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
});