import { createNarration } from '../entry';
import { Machine } from '../lib/Machine';
import { createExpressionTestSuite } from './createExpressionTestSuite';

describe('createNarration', () => {
  it('should not crash when creating a narration', () => {
    createNarration();
  });

  it('can create machine ', () => {
    const { ctx } = createNarration();
    expect(ctx.machine).toBeInstanceOf(Machine)
  });
})

describe('sentences', () => {
  const { createTest, ensureTDD } = createExpressionTestSuite();
  ensureTDD();
});