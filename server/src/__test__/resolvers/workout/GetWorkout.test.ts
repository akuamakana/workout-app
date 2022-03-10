import gCall from '../../utils/gCall';

const getWorkoutQuery = `
query GetWorkouts($getWorkoutId: Float!) {
  getWorkout(id: $getWorkoutId) {
    id
    name
  }
}
`;

describe('GetWorkout', () => {
  it('should error if not logged in', async () => {
    const data = await gCall({
      source: getWorkoutQuery,
      variableValues: {
        getWorkoutId: 1,
      },
    });

    expect(data.errors![0].message).toBe('Not authenticated');
  });

  it('should get workout by id', async () => {
    const data = await gCall({
      source: getWorkoutQuery,
      userId: 1,
      variableValues: {
        getWorkoutId: 1,
      },
    });

    expect(data.data?.getWorkout).toMatchObject({ id: '1', name: 'Test Workout' });
  });
});
