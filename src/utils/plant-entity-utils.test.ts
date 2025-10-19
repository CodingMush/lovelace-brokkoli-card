import { expect } from '@open-wc/testing';
import { PlantEntityUtils } from './plant-entity-utils';

describe('PlantEntityUtils', () => {
  it('should have getPlantEntities method', () => {
    expect(PlantEntityUtils.getPlantEntities).to.be.a('function');
  });

  it('should recognize tent entities', () => {
    const mockHass: any = {
      states: {
        'tent.test_tent': {
          entity_id: 'tent.test_tent',
          attributes: {}
        },
        'plant.test_plant': {
          entity_id: 'plant.test_plant',
          attributes: {}
        },
        'cycle.test_cycle': {
          entity_id: 'cycle.test_cycle',
          attributes: {
            member_count: 2
          }
        }
      }
    };

    const allEntities = PlantEntityUtils.getPlantEntities(mockHass, 'all');
    expect(allEntities).to.have.lengthOf(3);

    const tentEntities = PlantEntityUtils.getPlantEntities(mockHass, 'tent');
    expect(tentEntities).to.have.lengthOf(1);
    expect(tentEntities[0].entity_id).to.equal('tent.test_tent');

    const plantEntities = PlantEntityUtils.getPlantEntities(mockHass, 'plant');
    expect(plantEntities).to.have.lengthOf(1);
    expect(plantEntities[0].entity_id).to.equal('plant.test_plant');

    const cycleEntities = PlantEntityUtils.getPlantEntities(mockHass, 'cycle');
    expect(cycleEntities).to.have.lengthOf(1);
    expect(cycleEntities[0].entity_id).to.equal('cycle.test_cycle');
  });
});