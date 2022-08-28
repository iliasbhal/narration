import { compile, expression } from 'chai-latte'
import { State }  from './lib/State';
import { withNarrationCtx } from './NarrationBuildContext';

export default compile(
  expression(({ it }) => it.can.be(String), withNarrationCtx(State.create))
);