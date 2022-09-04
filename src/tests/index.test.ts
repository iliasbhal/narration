import { createNarration } from '..';
import { StateChart } from '../lib/StateChart';
import { createExpressionTestSuite } from './createExpressionTestSuite';

describe('createNarration', () => {
  it('should not crash when creating a narration', () => {
    createNarration('abcd');
  });

  it('contains a statechart', () => {
    const { ctx } = createNarration('abcd');
    expect(ctx).toBeInstanceOf(StateChart)
  });
})

describe('sentences', () => {
  const { testExpression, ensureTDD } = createExpressionTestSuite();
  ensureTDD();
});