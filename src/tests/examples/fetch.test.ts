import { createNarration } from '../../entry';

// Notes:
// "while" is used to talk about states
// "when" is used to describe events
// "it starts" is used to create and or set initial state

const makeFetch = () => {}

it('example: fetch', () => {
  const { it, while, when, end, ctx } = createNarration();

  const PENDING = it.starts.as('PENDING');
  when.it.is(PENDING).it.starts(makeFetch);
  
  const ERRORED = it.can.be('ERRORED');
  const [,FETCH_FAILED] = while(PENDING).when('FETCH_FAILED').then.it.becomes(ERRORED)
  const [,SAVE_ERROR] = when(FETCH_FAILED).it.does('SAVE_ERROR');
  const [,RETRY] = while(ERRORED).when('RETRY').then.it.becomes(PENDING);
  const [,CLEAR_ERROR] = when(RETRY).it.does('CLEAR_ERROR');
  
  const HAS_DATA = it.can.be('HAS_DATA');
  const [,RECEIVE_DATA] = while(PENDING).when('RECEIVE_DATA').then.it.becomes(HAS_DATA)
  const [,SAVE_DATA] = when(RECEIVE_DATA).it.does('SAVE_DATA');
  const [,REFETCH] = while(HAS_DATA).when('REFETCH').then.it.becomes(PENDING);
  when(REFETCH).it.does(CLEAR_ERROR);

  end();

  expect(ctx.getConfig()).toMatchObject({
    states: {
      initial: 'PENDING',
      PENDING: {
        FETCH_FAILED: 'ERRORED',
      },
      ERRORED: {
        RETRY: 'PENDING',
      },
      HAS_DATA: {
        REFETCH: 'PENDING',
      }
    }
  })
});
