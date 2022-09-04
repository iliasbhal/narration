import { StateChartObject } from './StateChartObject';

export class Action extends StateChartObject {
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}