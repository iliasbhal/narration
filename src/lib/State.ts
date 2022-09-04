import { StateChartObject } from './StateChartObject';
import { Event } from './Event';
import { Transition } from './Transition';

export interface StateConfig {
  initial: boolean;
}

interface StateEventHandleConfig {
  
}

export class State extends StateChartObject {
  name: string;
  initial: boolean = false;
  on = new Map<Event, Transition>();

  constructor(name: string, config?: StateConfig) {
    super();

    this.name = name;
    this.initial = config?.initial || false;
  }

  getConfig() {
    const config : any = {};
    const on = this.on.size && Array.from(this.on).reduce((acc, [event, transition]) => {
      acc[event.name] = transition.getConfig();
      return acc;
    }, {});

    if (on) {
      config.on = on;
    }

    return config;
  }

  getOrCreateTransitionFromEvent(event: Event) {
    const alreadyCreated = this.on.has(event);
    if (!alreadyCreated) {
      const transition = new Transition();
      this.on.set(event, transition);
    }
    
    return this.on.get(event);
  }

  addTransitionToOnEvent(event: Event, nextState: State) {
    const transition = this.getOrCreateTransitionFromEvent(event);
    transition.link(this);
    event.link(this);
    transition.addTarget(nextState);
  }

  is() {
    return this.ctx.is(this);
  }


}