import generatedChaiLatte from './expressions/generated';
import { NarrationBuildContext } from './NarrationBuildContext';

type NarrationFluentAPI = typeof generatedChaiLatte;

type ExtraNarrationAPI = {
  end: Function;
  ctx: NarrationBuildContext;
}

type Narration = ExtraNarrationAPI & NarrationFluentAPI;

export const createNarration = () : Narration => {
  const narrationCtx = NarrationBuildContext.create();

  const extraFluentExpression = {
    ctx: narrationCtx,
    end: () => {
      narrationCtx.build();
    }
  };

  return new Proxy({} as Narration, {
    get(target, prop) {
      if (generatedChaiLatte[prop]) {
        return Reflect.get(generatedChaiLatte, prop, generatedChaiLatte)
      }

      if (extraFluentExpression[prop]) {
        return extraFluentExpression[prop]
      }

      const narrationAttribute = Reflect.get(narrationCtx, prop, narrationCtx);
      return narrationAttribute;
    }
  });
}
