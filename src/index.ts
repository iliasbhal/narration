import generatedChaiLatte from './expressions/generated';
import { StateChart } from './lib/StateChart';
import { GlobalContext } from './GlobalContext';

export * from './lib/StateChart';

type NarrationFluentAPI = typeof generatedChaiLatte;

type ExtraNarrationAPI = {
  end: Function;
  ctx: StateChart;
}

type Narration = ExtraNarrationAPI & NarrationFluentAPI;

export const createNarration = (name: string) : Narration => {
  const statechart = new StateChart(name)
  GlobalContext.set(statechart);

  const extraFluentExpression : ExtraNarrationAPI = {
    ctx: statechart,
    end: () => {
      statechart.start();
    }
  };

  return {
    ...generatedChaiLatte,
    ...extraFluentExpression,
  };
}
