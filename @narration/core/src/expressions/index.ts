import { compile, expression } from 'chai-latte'
import { State, Event, Action, StateChart }  from '../lib/StateChart';
import { StateChartContext } from '../StateChartContext';

export default compile(
  expression(
    ({ it }) => it.starts.as(String),
    (stateName: string) => {
      const chart = StateChartContext.get();
      const state = new State(stateName);
      chart.addState(state)
      chart.setInitialState(state);
      return [
        state
      ];
    }
  ),
  expression(
    ({ it }) => it.can.be(String),
    (stateName: string) => {
      const chart = StateChartContext.get();
      const state = new State(stateName);
      chart.addState(state)
      return [
        state
      ];
    }
  ),
  expression(
    ({ given }) => given(State).when(Event).then.it.becomes(State),
    ({ given }) => given(State).when(Event).then(State),
    (state: State, event: Event, nextState: State) => {
      const chart = StateChartContext.get();
      state.addTransitionToOnEvent(event, nextState);
    }
  ),

  expression(
    ({ given }) => given(State).when(Event).then.it.does(Action),
    ({ given }) => given(State).when(Event).then(Action),
    (state: State, event: Event, action: Action<string, any>) => {
      const chart = StateChartContext.get();
      state.addActionToOnEvent(event, action);
    }
  ),
);