import { StateChartObject } from './StateChartObject';

export class Event extends StateChartObject {
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }

  happen() {
    this.ctx.happen(this)
  }
}