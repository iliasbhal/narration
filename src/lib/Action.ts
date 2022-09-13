import { StateChartObject } from './StateChartObject';
import { ActionFunction } from 'xstate';
export class Action<Name extends string, Implementation extends ActionFunction<any, any>> extends StateChartObject {
  name: Name;
  implementation: Implementation;

  constructor(name: Name, implementation:  Implementation) {
    super();

    this.name = name;
    this.implementation = implementation;
  }

  execute() {
    this.implementation({}, {}, {} as any);
  }

  getConfig() {
    return {
      actions: [this.name],
    }   
  }
}