import { isAuth } from '@middleware/isAuth';
import { MyContext } from 'types/MyContext';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import prisma from '@utils/prisma';

@Resolver()
class DeleteWorkoutResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => Number)
  async deleteWorkout(@Ctx() ctx: MyContext, @Arg('id') id: number): Promise<Number> {
    const deletedData = await prisma.workout.deleteMany({
      where: {
        id,
        userId: ctx.req.session.userId,
      },
    });

    return deletedData.count;
  }
}

export default DeleteWorkoutResolver;
