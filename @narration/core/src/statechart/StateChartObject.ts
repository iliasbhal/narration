import { StateChart } from "./StateChart";

export class StateChartObject {
  parent: StateChartObject

  get ctx() : StateChart {
    const ctx = this.parent?.ctx ?? this;
    return ctx as any;
  }

  link(statechart: StateChartObject) {
    this.parent = statechart;
  }
}