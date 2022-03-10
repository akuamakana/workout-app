const Sequencer = require('@jest/test-sequencer').default;

const getTest = (tests, testName) => {
  const testIndex = tests.findIndex((t) => t.path.includes(testName));
  const test = tests[testIndex];
  tests.splice(testIndex, 1);

  return [tests, test];
};

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);
    const [registerTests, registerTest] = getTest(copyTests, 'Register.test.ts');
    const [confirmEmailTests, confirmEmailTest] = getTest(registerTests, 'ConfirmEmail.test.ts');
    const [loginTests, loginTest] = getTest(confirmEmailTests, 'Login.test.ts');
    const [createWorkoutTests, createWorkoutTest] = getTest(loginTests, 'CreateWorkout.test.ts');
    const [updateWorkoutTests, updateWorkoutTest] = getTest(createWorkoutTests, 'UpdateWorkout.test.ts');
    const [deleteWorkoutTests, deleteWorkoutTest] = getTest(updateWorkoutTests, 'DeleteWorkout.test.ts');
    const testSequence = [
      registerTest,
      confirmEmailTest,
      loginTest,
      createWorkoutTest,
      ...deleteWorkoutTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1)),
      updateWorkoutTest,
      deleteWorkoutTest,
    ];
    return testSequence;
  }
}

module.exports = CustomSequencer;
