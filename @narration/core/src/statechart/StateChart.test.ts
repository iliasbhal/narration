import { StateChart } from './StateChart';
import { State } from './State';

describe('StateChart', () => {
  const statechart = new StateChart('abcd');

  it('should have name', () => {
    const config = statechart.getConfig();
    expect(config).toMatchObject({
      name: 'abcd',
    });
  })

  it('should be able to add states', () => {
    statechart.addState('IDLE');
    statechart.addState('MOVING');
    const config = statechart.getConfig();
    expect(config).toMatchObject({
      name: 'abcd',
      states: {
        IDLE: {},
        MOVING: {},
      }
    });
  });

  it('should automaticaly set initial state', () => {
    const config = statechart.getConfig();
    expect(config).toMatchObject({
      initial: 'IDLE',
    });
  })

  it('should override initial state', () => {
    statechart.setInitialState('MOVING')

    const config = statechart.getConfig();
    expect(config).toMatchObject({
      initial: 'MOVING',
    });
  })
});
