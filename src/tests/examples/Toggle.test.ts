import { createNarration, Event } from '../..';

describe('Example: Toggle', () => {
  const { it, given, end, ctx } = createNarration('toggle');

  const Toggle = new Event('TOGGLE');

  const [OFF] = it.starts.as('OFF');
  const [ON] = it.can.be('ON');
  
  given(OFF).when(Toggle).then.it.becomes(ON);
  given(ON).when(Toggle).then.it.becomes(OFF);

  end();

  test('should return correct configuration object', () => {
    expect(ctx.getConfig()).toMatchObject({
      initial: 'OFF',
      states: {
        OFF: {
          on: {
            TOGGLE: 'ON',
          }
        },
        ON: {
          on: {
            TOGGLE: 'OFF',
          }
        },
      }
    })
  });

  test('should handle events and transitions properly', async () => {
    expect(OFF.is()).toBe(true);
    expect(ON.is()).toBe(false);

    Toggle.trigger();

    expect(OFF.is()).toBe(false);
    expect(ON.is()).toBe(true);

    Toggle.trigger();

    expect(OFF.is()).toBe(true);
    expect(ON.is()).toBe(false);
  })
});
