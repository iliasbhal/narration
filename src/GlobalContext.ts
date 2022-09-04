import { StateChart } from './lib/StateChart';
import { State } from './lib/State';

export class GlobalContext {
  static current: StateChart;
  static set(ctx: any) {
    return GlobalContext.current = ctx;
  }

  static get() {
    return GlobalContext.current;
  }

  static create() {
    const narrationBuildCtx = new GlobalContext();
    GlobalContext.set(narrationBuildCtx);
    return narrationBuildCtx;
  }
}


export const withNarrationCtx = <T extends Function>(callback: T) : T => {
  const wrapped : any = (...args)  => {
    const statechart = GlobalContext.get();
    const returned = callback(...args, statechart);
    return returned;
  }

  wrapped.toString = () => callback.toString();

  return wrapped;
}