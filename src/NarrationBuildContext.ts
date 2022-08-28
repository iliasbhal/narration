import { Machine } from './lib/Machine';
import { State } from './lib/State';

export class NarrationBuildContext {
  static currentCtx: NarrationBuildContext;
  static setCurrent(ctx: NarrationBuildContext) {
    return NarrationBuildContext.currentCtx = ctx;
  }

  static getCurrent() {
    return NarrationBuildContext.currentCtx;
  }

  static create() {
    const narrationBuildCtx = new NarrationBuildContext();
    NarrationBuildContext.setCurrent(narrationBuildCtx);
    return narrationBuildCtx;
  }

  ctx = new Set();
  machine = new Machine();
  add(el: unknown) {
    this.ctx.add(el)
  }
  
  build() {
    this.ctx.forEach((el: unknown) => {
      if (el instanceof State) {
        this.machine.states.set(el.name, el);
      }
    })
  }
}

export const withNarrationCtx = <T extends Function>(callback: T) : T => {
  const wrapped : any = (...args)  => {
    const narrationCtx = NarrationBuildContext.getCurrent();

    const returned = callback(...args);
    narrationCtx.add(returned);

    return returned;
  }

  return wrapped;
}