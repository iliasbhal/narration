import { compile, expression } from 'chai-latte'
import { State }  from '../lib/State';
import { withNarration } from '../NarrationBuildContext';

export default compile(
  expression(
    ({ it }) => it.starts.as(String),
    withNarration((stateName: string) => {
      return [
        new State(stateName, {
          initial: true,
        })
      ];
    })
  ),
  expression(
    ({ it }) => it.can.be(String),
    withNarration((stateName: string) => {
      return [
        new State(stateName)
      ];
    })
  ),
);