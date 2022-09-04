import { StateChart } from "./StateChart";

export class StateChartObject {
  parent: StateChartObject

  get ctx() : StateChart {
    const ctx = this.parent?.ctx ?? this;
    if (ctx instanceof StateChart) {
      return ctx;
    }
  }

  link(statechart: StateChartObject) {
    this.parent = statechart;
  }
}