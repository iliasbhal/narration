import { compile, expression } from 'chai-latte'
import { State, Event, Action, StateChart }  from '../lib/StateChart';
import { withNarrationCtx } from '../GlobalContext';

export default compile(
  expression(
    ({ it }) => it.starts.as(String),
    withNarrationCtx((stateName: string, chart: StateChart) => {
      const state = new State(stateName);
      chart.addState(state)
      chart.setInitialState(state);
      return [
        state
      ];
    })
  ),
  expression(
    ({ it }) => it.can.be(String),
    withNarrationCtx((stateName: string, chart: StateChart) => {
      const state = new State(stateName);
      chart.addState(state)
      return [
        state
      ];
    })
  ),
  expression(
    ({ given }) => given(State).when(Event).then.it.becomes(State),
    ({ given }) => given(State).when(Event).then(State),
    withNarrationCtx((state: State, event: Event, nextState: State, chart: StateChart) => {
      state.addTransitionToOnEvent(event, nextState);
    })
  ),

  expression(
    ({ given }) => given(State).when(Event).then.it.does(Action),
    ({ given }) => given(State).when(Event).then(Action),
    withNarrationCtx((state: State, event: Event, action: Action<string, any>, chart: StateChart) => {
      state.addActionToOnEvent(event, action);
    })
  ),
);