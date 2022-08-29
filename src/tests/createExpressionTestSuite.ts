import rawExpressions from '../expressions/index';

type JestTest = (testName: string, callback: jest.ProvidesCallback) => void;

export const createExpressionTestSuite = () => {
  const writtenTestIds = new Set<string>()
  const createTester = (mode: 'normal' | 'skip' | 'only') : JestTest => (testName, callback) => {
    writtenTestIds.add(testName);
    if (mode === 'normal') {
      it(testName, callback);
    } else {
      it[mode](testName, callback);
    }
  }

  const createTest = Object.assign(createTester('normal'), {
    only: createTester('only'),
    skip: createTester('skip'),
  });

  const ensureTDD = () => {
    rawExpressions.__expressions.forEach((expression) => {
      const expressionId = expression.builder.debugId;
      if (writtenTestIds.has(expressionId)) {
        return;
      }

      it.todo(expression.builder.debugId)
    });      
  }

  return {
    createTest,
    ensureTDD,
  }
}