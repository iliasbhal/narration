import { createNarration } from '..';
import { StateChart } from '../lib/StateChart';
import { createExpressionTestSuite } from './lib/createExpressionTestSuite';

describe('createNarration', () => {
  it('should not crash when creating a narration', () => {
    createNarration('abcd');
  });

  it('contains a statechart', () => {
    const { ctx } = createNarration('abcd');
    expect(ctx).toBeInstanceOf(StateChart)
  });

  it.skip('can create sub state', () => {
    const { it } = createNarration('abcd');
    const SMILING = it.can.be('MOVING');

    // SMILING.can.be('WALKING');
    // SMILING.can.be('RUNNING');
  });
})

describe('sentences', () => {
  const { testExpression, ensureTDD } = createExpressionTestSuite();
  ensureTDD();
});