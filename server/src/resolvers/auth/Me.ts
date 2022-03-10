import prisma from '@utils/prisma';
import { User } from '@models/User';
import { Ctx, Query, Resolver } from 'type-graphql';
import { MyContext } from 'types/MyContext';

@Resolver()
class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null> {
    if (!ctx.req.session.userId) {
      return null;
    }

    return prisma.user.findUnique({ where: { id: ctx.req.session.userId }, include: { workouts: true } });
  }
}

export default MeResolver;
