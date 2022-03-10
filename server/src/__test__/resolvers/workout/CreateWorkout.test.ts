import gCall from '../../utils/gCall';

const createWorkoutMutation = `
mutation CreateWorkout($name: String!) {
  createWorkout(name: $name) {
    id
    name
    note
    exercises {
      id
    }
    isCompleted
    createdBy {
      id
      username
    }
  }
}
`;

describe('CreateWorkout', () => {
  it('should fail without authentication', async () => {
    const data = await gCall({
      source: createWorkoutMutation,
      variableValues: {
        name: 'Test Workout',
      },
    });

    expect(data.errors![0].message).toBe('Not authenticated');
  });

  it('should create a workout', async () => {
    const data = await gCall({
      source: createWorkoutMutation,
      variableValues: {
        name: 'Test Workout',
      },
      userId: 1,
    });

    expect(data.data?.createWorkout).toMatchObject({ id: '1', name: 'Test Workout', note: '', exercises: [], isCompleted: false, createdBy: { id: '1', username: 'jest' } });
  });
});
