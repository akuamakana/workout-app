import gCall from '../../utils/gCall';

const getWorkoutsQuery = `
query GetWorkouts {
  getWorkouts {
    id
    name
  }
}
`;

describe('GetWorkouts', () => {
  it('should error if not logged in', async () => {
    const data = await gCall({
      source: getWorkoutsQuery,
    });

    expect(data.errors![0].message).toBe('Not authenticated');
  });

  it('should return workouts', async () => {
    const data = await gCall({
      source: getWorkoutsQuery,
      userId: 1,
    });

    expect(data.data?.getWorkouts).toMatchObject([{ id: '1', name: 'Test Workout' }]);
  });
});
