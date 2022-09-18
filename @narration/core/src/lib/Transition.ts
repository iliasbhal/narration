import { StateChartObject } from './StateChartObject';
import { State } from './State';

export class Transition extends StateChartObject {
  target: State;

  addTarget(targetState: State) {
    this.target = targetState;
  }

  getConfig() {
    return this.target?.name;
  }
}