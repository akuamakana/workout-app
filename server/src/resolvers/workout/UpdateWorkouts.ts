import { isAuth } from '@middleware/isAuth';
import { WorkoutInput } from '@models/Inputs/WorkoutInput';
import { Workout } from '@models/Workout';
import prisma from '@utils/prisma';
import { relations } from '@utils/constants';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
class UpdateWorkoutResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Workout, { nullable: true })
  async updateWorkout(@Arg('id') id: number, @Arg('input') inputs: WorkoutInput): Promise<Workout | null> {
    const updatedWorkout = await prisma.workout.update({
      where: {
        id,
      },
      data: inputs,
      include: relations,
    });

    return updatedWorkout;
  }
}

export default UpdateWorkoutResolver;
