import gCall from '../../utils/gCall';
const deleteWorkoutMutation = `
mutation DeleteWorkout($deleteWorkoutId: Float!) {
  deleteWorkout(id: $deleteWorkoutId)
}
`;

describe('DeleteWorkout', () => {
  it('should error if not logged in', async () => {
    const data = await gCall({
      source: deleteWorkoutMutation,
      variableValues: {
        deleteWorkoutId: 1,
      },
    });

    expect(data.errors![0].message).toBe('Not authenticated');
  });

  it('should delete workout', async () => {
    const data = await gCall({
      source: deleteWorkoutMutation,
      variableValues: {
        deleteWorkoutId: 1,
      },
      userId: 1,
    });

    expect(data.data?.deleteWorkout).toBe(1);
  });
});
