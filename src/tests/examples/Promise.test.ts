import { createNarration, Event } from '../..';

describe('Example: Promise', () => {
  const { it, given, end, ctx } = createNarration('promise');

  const [PENDING] = it.starts.as('PENDING');
  const [REJECTED] = it.can.be('REJECTED');
  const [FULFILLED] = it.can.be('FULFILLED');
  
  const Reject = new Event('REJECT');
  const Resolve = new Event('RESOLVE');

  given(PENDING).when(Reject).then.it.becomes(REJECTED);
  given(PENDING).when(Resolve).then.it.becomes(FULFILLED);

  end();

  test('should return correct configuration object', () => {
    expect(ctx.getConfig()).toMatchObject({
      initial: 'PENDING',
      states: {
        PENDING: {
          on: {
            REJECT: 'REJECTED',
            RESOLVE: 'FULFILLED',
          }
        },
        REJECTED: {},
        FULFILLED: {}
      }
    })
  });

  test('should resolve and not change', async () => {
    expect(PENDING.is()).toBe(true);
    expect(REJECTED.is()).toBe(false);
    expect(FULFILLED.is()).toBe(false);

    Resolve.happen();

    expect(PENDING.is()).toBe(false);
    expect(REJECTED.is()).toBe(false);
    expect(FULFILLED.is()).toBe(true);

    Reject.happen();

    expect(PENDING.is()).toBe(false);
    expect(REJECTED.is()).toBe(false);
    expect(FULFILLED.is()).toBe(true);
  })

  test('should reject  and not change', async () => {
    ctx.restart();

    expect(PENDING.is()).toBe(true);
    expect(REJECTED.is()).toBe(false);
    expect(FULFILLED.is()).toBe(false);

    Reject.happen();
    
    expect(PENDING.is()).toBe(false);
    expect(REJECTED.is()).toBe(true);
    expect(FULFILLED.is()).toBe(false);
    
    Resolve.happen();

    expect(PENDING.is()).toBe(false);
    expect(REJECTED.is()).toBe(true);
    expect(FULFILLED.is()).toBe(false);
  })
});
