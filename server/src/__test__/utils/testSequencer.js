const Sequencer = require('@jest/test-sequencer').default;

const getTest = (tests, testName) => {
  const testIndex = tests.findIndex((t) => t.path.includes(testName));
  const test = tests[testIndex];

  return [testIndex, test];
};

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    const [registerTestIndex, registerTest] = getTest(copyTests, 'Register.test.ts');
    copyTests.splice(registerTestIndex, 1);
    const testSequence = [registerTest, ...copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1))];
    return testSequence;
  }
}

module.exports = CustomSequencer;
