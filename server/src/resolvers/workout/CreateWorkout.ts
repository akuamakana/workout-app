import { isAuth } from '@middleware/isAuth';
import { Workout } from '@models/Workout';
import prisma from '@utils/prisma';
import { MyContext } from 'types/MyContext';
import { Resolver, UseMiddleware, Mutation, Ctx, Arg } from 'type-graphql';
import { relations } from '@utils/constants';

@Resolver()
class CreateWorkoutResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Workout, { nullable: true, description: 'Create workout under logged in user' })
  async createWorkout(@Ctx() ctx: MyContext, @Arg('name') name: string): Promise<Workout | null> {
    const workout = {
      name,
      createdBy: {
        connect: {
          id: ctx.req.session.userId,
        },
      },
    };

    const createdData = await prisma.workout.create({ data: workout, include: relations });
    return createdData;
  }
}

export default CreateWorkoutResolver;
