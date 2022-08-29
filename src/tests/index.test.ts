import { createNarration } from '..';
import { StateChart } from '../lib/StateChart';
import { createExpressionTestSuite } from './createExpressionTestSuite';

describe('createNarration', () => {
  it('should not crash when creating a narration', () => {
    createNarration();
  });

  it('contains a statechart', () => {
    const { ctx } = createNarration();
    expect(ctx.statechart).toBeInstanceOf(StateChart)
  });
})

describe('sentences', () => {
  const { createTest, ensureTDD } = createExpressionTestSuite();
  ensureTDD();
});