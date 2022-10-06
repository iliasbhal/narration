import { createNarration, Event, Action, State } from '../..';

describe('Example: Multistep', () => {
  const { it, given, end, ctx } = createNarration('multisteop');

  const INITIAL = it.starts.as('INITIAL');
  const QUESTION_1 = it.can.be('QUESTION_1');
  const QUESTION_2 = it.can.be('QUESTION_2');
  const COMPLETED = it.can.be('COMPLETED');
  
  const log = new Action('log', jest.fn());
  const telemetry = new Action('telemetry', jest.fn());
 
  // Handle Next Events
  const Next = new Event('NEXT');
  given(INITIAL).when(Next).then.it.becomes(QUESTION_1);
  given(INITIAL).when(Next).then.it.does(log);
  given(INITIAL).when(Next).then.it.does(telemetry);

  given(QUESTION_1).when(Next).then.it.becomes(QUESTION_2);
  given(QUESTION_2).when(Next).then.it.becomes(COMPLETED);

  // Handle Prev Events
  const Prev = new Event('PREV');
  given(QUESTION_1).when(Prev).then.it.becomes(INITIAL);
  given(QUESTION_2).when(Prev).then.it.becomes(QUESTION_1);

  end();

  test('should return correct configuration object', () => {
    expect(ctx.getConfig()).toMatchObject({
      initial: 'INITIAL',
      states: {
        INITIAL: {    
          on: {
            NEXT: {
              target: 'QUESTION_1',
              actions: ['log', 'telemetry'],
            }
          }
        },
        QUESTION_1: {
          on: {
            PREV: 'INITIAL',
            NEXT: 'QUESTION_2',
          }
        },
        QUESTION_2: {
          on: {
            PREV: 'QUESTION_1',
            NEXT: 'COMPLETED',
          }
        },
        COMPLETED: {},
      }
    })
  });

  test('should handle events and transitions properly', async () => {
    const testShouldOnlyBe = (state: State) => {
      expect(INITIAL.is()).toBe(INITIAL === state);
      expect(QUESTION_1.is()).toBe(QUESTION_1 === state);
      expect(QUESTION_2.is()).toBe(QUESTION_2 === state);
      expect(COMPLETED.is()).toBe(COMPLETED === state);
    }

    testShouldOnlyBe(INITIAL);

    Next.happen();

    testShouldOnlyBe(QUESTION_1);
    expect(log.implementation).toHaveBeenCalled();
    expect(telemetry.implementation).toHaveBeenCalled();
    log.implementation.mockClear();
    telemetry.implementation.mockClear();

    Prev.happen();

    testShouldOnlyBe(INITIAL);
    expect(log.implementation).not.toHaveBeenCalled();
    expect(telemetry.implementation).not.toHaveBeenCalled();
    log.implementation.mockClear();
    telemetry.implementation.mockClear();

    Next.happen();

    testShouldOnlyBe(QUESTION_1);
    expect(log.implementation).toHaveBeenCalled();
    expect(telemetry.implementation).toHaveBeenCalled();
    log.implementation.mockClear();
    telemetry.implementation.mockClear();

    Next.happen();

    testShouldOnlyBe(QUESTION_2);
    expect(log.implementation).not.toHaveBeenCalled();
    expect(telemetry.implementation).not.toHaveBeenCalled();
    log.implementation.mockClear();
    telemetry.implementation.mockClear();

    Next.happen();

    testShouldOnlyBe(COMPLETED);
    expect(log.implementation).not.toHaveBeenCalled();
    expect(telemetry.implementation).not.toHaveBeenCalled();
    log.implementation.mockClear();
    telemetry.implementation.mockClear();

    Next.happen();

    testShouldOnlyBe(COMPLETED);
    expect(log.implementation).not.toHaveBeenCalled();
    expect(telemetry.implementation).not.toHaveBeenCalled();
    log.implementation.mockClear();
    telemetry.implementation.mockClear();

    Prev.happen();

    testShouldOnlyBe(COMPLETED);
    expect(log.implementation).not.toHaveBeenCalled();
    expect(telemetry.implementation).not.toHaveBeenCalled();
    log.implementation.mockClear();
    telemetry.implementation.mockClear();
  })
});
