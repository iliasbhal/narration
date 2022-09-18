import { StateChart } from './lib/StateChart';

export class StateChartContext {
  static current: StateChart;
  static set(ctx: any) {
    return StateChartContext.current = ctx;
  }

  static get() {
    return StateChartContext.current;
  }

  static create() {
    const narrationBuildCtx = new StateChartContext();
    StateChartContext.set(narrationBuildCtx);
    return narrationBuildCtx;
  }
}
