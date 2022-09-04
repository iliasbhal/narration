import { StateChartObject } from './StateChartObject';

export class Event extends StateChartObject {
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }

  trigger() {
    this.ctx.trigger(this)
  }
}