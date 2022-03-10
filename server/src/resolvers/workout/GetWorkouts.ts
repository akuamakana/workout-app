import { isAuth } from '@middleware/isAuth';
import { Workout } from '@models/Workout';
import prisma from '@utils/prisma';
import { MyContext } from 'types/MyContext';
import { relations } from '@utils/constants';
import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

@Resolver()
class GetWorkoutsResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Workout], { nullable: true, description: 'Get all workouts for logged in user' })
  async getWorkouts(@Ctx() ctx: MyContext): Promise<Workout[] | null> {
    const workouts = await prisma.workout.findMany({ where: { userId: ctx.req.session.userId }, include: relations });
    return workouts;
  }
}

export default GetWorkoutsResolver;
