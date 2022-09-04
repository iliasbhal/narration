import { createNarration, Event } from '../..';

// Notes:
// example from: https://www.youtube.com/watch?v=Km8QGtRr1z8
// "while" is used to talk about states
// "when" is used to describe events
// "it starts" is used to create and or set initial state

const makeFetch = () => {}

it.skip('example: fetch', () => {
  const { it, given, when, end, ctx } = createNarration('fetch');

  const [PENDING] = it.starts.as('PENDING');
  when.it.is(PENDING).it.starts(makeFetch);
  
  const FetchFailed = new Event('FETCH_FAILED');
  const SaveError = new Event('FETCH_FAILED');

  const [ERRORED] = it.can.be('ERRORED');
  const [,FETCH_FAILED] = given(PENDING).when(FetchFailed).then.it.becomes(ERRORED)
  const [,SAVE_ERROR] = when(FETCH_FAILED).it.does('SAVE_ERROR');
  const [,RETRY] = given(ERRORED).when('RETRY').then.it.becomes(PENDING);
  const [,CLEAR_ERROR] = when(RETRY).it.does('CLEAR_ERROR');
  
  const [HAS_DATA] = it.can.be('HAS_DATA');
  const [,RECEIVE_DATA] = given(PENDING).when('RECEIVE_DATA').then.it.becomes(HAS_DATA)
  const [,SAVE_DATA] = given(RECEIVE_DATA).it.does('SAVE_DATA');
  const [,REFETCH] = given(HAS_DATA).when('REFETCH').then.it.becomes(PENDING);
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
