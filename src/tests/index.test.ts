import { createNarration } from '../entry';

import baseNarration from '../index';
describe('index', () => {
  it('should not crash when creating a narration', () => {
    createNarration();
  });

  baseNarration.__expressions.forEach((expression) => {
    it.todo(expression.builder.debugId)
  })
})