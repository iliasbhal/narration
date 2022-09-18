import { StateChartObject } from './StateChartObject';
import { Event } from './Event';
import { Action } from './Action';
import { Transition } from './Transition';

export interface StateConfig {
  initial: boolean;
}

export class State extends StateChartObject {
  name: string;
  initial: boolean = false;
  states = new Set();
  transitions = new Map<Event, Transition>();
  actions = new Map<Event, Action<string, any>[]>();

  constructor(name: string, config?: StateConfig) {
    super();

    this.name = name;
    this.initial = config?.initial || false;
  }

  getConfig() {
    const config : any = {};
    
    Array.from(this.transitions).forEach(([event, transition]) => {
      config.on = Object.assign({}, config.on, {
        [event.name]: transition.getConfig(),
      });
    }, {});

    Array.from(this.actions).forEach(([event, actions]) => {
      if (!config.on[event.name].actions) {
        config.on[event.name] = {
          target: config.on[event.name],
          actions: [],
        }
      }
      
      actions.forEach((action) => {
        const actionConfig = action.getConfig();
        config.on[event.name].actions.push(...actionConfig.actions)
      })
    });

    return config;
  }

  addChildState(childState: State) {
    this.states.add(childState);
  }

  getOrCreateTransitionFromEvent(event: Event) {
    const alreadyCreated = this.transitions.has(event);
    if (!alreadyCreated) {
      const transition = new Transition();
      this.transitions.set(event, transition);
    }
    
    return this.transitions.get(event);
  }

  addTransitionToOnEvent(event: Event, nextState: State) {
    const transition = this.getOrCreateTransitionFromEvent(event);
    transition.link(this);
    event.link(this);
    transition.addTarget(nextState);
  }

  addActionToOnEvent(event: Event, action: Action<string, any>) {
    event.link(this);
    this.ctx.actions.add(action);

    if (!this.actions.has(event)) {
      this.actions.set(event, []);
    }

    this.actions.get(event).push(action);
  }

  is() {
    return this.ctx.is(this);
  }
}