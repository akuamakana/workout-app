import { isAuth } from '@middleware/isAuth';
import { Workout } from '@models/Workout';
import prisma from '@utils/prisma';
import { MyContext } from 'types/MyContext';
import { relations } from '@utils/constants';
import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
class GetWorkoutResolver {
  @UseMiddleware(isAuth)
  @Query(() => Workout, { nullable: true, description: 'Get workout by ID' })
  async getWorkout(@Ctx() ctx: MyContext, @Arg('id') id: number): Promise<Workout | null> {
    const workout = await prisma.workout.findFirst({
      where: {
        id,
        userId: ctx.req.session.userId,
      },
      include: relations,
    });

    return workout;
  }
}

export default GetWorkoutResolver;
