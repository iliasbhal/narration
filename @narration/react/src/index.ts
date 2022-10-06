import React from 'react';
import { createNarration } from '@narration/core';

export * from '@narration/core';

const narrationCoreReactCompat = (narration: any) => {
  (narration as any).__expressions.forEach((aliases) => {
    const originalCallback = aliases[0].expression.callback;
    aliases.forEach((exp) => {;
      exp.expression.callback = (...args) => {
        const [ret] = React.useState(() => originalCallback(...args));
        return ret;
      }
    });
  });
}

export const useNarration : typeof createNarration = (...args) => {
  const [_, rerender] = React.useState({});
  const [narration] = React.useState(() => {
    const narration = createNarration('asdasd');
    narrationCoreReactCompat(narration);
    return narration;
  });

  React.useEffect(() => {
    const sub = narration.ctx.subscribe((transition) => {
      const isInit = transition.event.name === 'xstate.init';
      if (!isInit) {
        rerender({});
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return narration;
}