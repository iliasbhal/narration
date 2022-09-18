import { createMachine, interpret, Interpreter, State as xState } from 'xstate';
import { State } from './State';
import { Event } from './Event';
import { Action } from './Action';
import { StateChartObject } from './StateChartObject';

export class StateChart extends StateChartObject {
  name: string;
  initial: State;
  states = new Set<State>();
  actions = new Set<Action<string, any>>();

  constructor(name: string) {
    super();

    this.name = name;
  }

  getConfig() {
    return {
      name: this.name,
      initial: this.initial && this.initial.name,
      states: Array.from(this.states)
        .reduce((acc, state) => {
          acc[state.name] = state.getConfig();
          return acc;
        }, {})
    }
  }

  private getOrCreateState(state: State | string) {
    return state instanceof State ? state : new State(state);
  }

  getInitialStateName() {
    return this.initial && this.initial.name;
  }

  setInitialState(initialState : State | string) {
    const nextInitialState = Array.from(this.states).find(state => {
      return state === initialState || state.name === initialState;
    });

    if (!nextInitialState) {
      throw new Error('State not found');
    }

    this.initial = nextInitialState;
  }

  ensureInitialState(state: State) {
    const shouldBeInitial = state.initial;
    if (shouldBeInitial) {
      this.setInitialState(state);
    }

    const hasInitialState = !!this.initial;
    if (!hasInitialState) {
      this.setInitialState(state);
    }
  }

  addState(state: State | string) {
    const addedState = this.getOrCreateState(state);
    addedState.link(this);
    this.states.add(addedState);
    this.ensureInitialState(addedState);

    return addedState;
  }

  private service: Interpreter<any, any, any, any, any>;
  private state: xState<any>
  start() {
    const machineConfig = this.getConfig();
    const actionsConfig = Array.from(this.actions)
      .reduce((acc, action) => {
        acc[action.name] = () => action.execute();
        return acc;
      }, {})

    const machine = createMachine({
      predictableActionArguments: true,
      ...machineConfig,
    }, {
      actions: actionsConfig
    });
    
    this.service = interpret(machine);
    this.service.start();
    this.state = this.service.initialState;
    this.service.onTransition((state) => {
      this.state = state;
    });
  }

  public restart() {
    this.service?.stop();
    this.start();
  }

  public is(state: State) : boolean {
    return this.state.matches(state.name);
  }

  public happen(event: Event) {
    this.service.send({ type: event.name });
  }
}