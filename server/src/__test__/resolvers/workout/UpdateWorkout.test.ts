import gCall from '../../utils/gCall';

const updateWorkoutMutation = `
mutation UpdateWorkout($input: WorkoutInput!, $updateWorkoutId: Float!) {
  updateWorkout(input: $input, id: $updateWorkoutId) {
    id
    name
    note
    isCompleted
    userId
    createdBy {
      id
    }
  }
}
`;

describe('UpdateWorkout', () => {
  it('should error if not logged in', async () => {
    const data = await gCall({
      source: updateWorkoutMutation,
      variableValues: {
        input: {
          isCompleted: true,
        },
        updateWorkoutId: 1,
      },
    });

    expect(data.errors![0].message).toBe('Not authenticated');
  });

  it('should update workout by id', async () => {
    const data = await gCall({
      source: updateWorkoutMutation,
      userId: 1,
      variableValues: {
        input: {
          isCompleted: true,
        },
        updateWorkoutId: 1,
      },
    });

    expect(data.data?.updateWorkout).toMatchObject({ id: '1', name: 'Test Workout', note: '', isCompleted: true, userId: 1, createdBy: { id: '1' } });
  });
});
