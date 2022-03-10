import { PasswordInput } from '@models/Inputs/PasswordInput';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { MyContext } from 'types/MyContext';
import redis from '@utils/redis';
import prisma from '@utils/prisma';
import argon2 from 'argon2';

@Resolver()
class ResetPasswordResolver {
  @Mutation(() => Boolean, { nullable: true })
  async resetPassword(@Ctx() ctx: MyContext, @Arg('password') { password }: PasswordInput): Promise<Boolean> {
    // parse token from url
    const auth = ctx.req.headers.authorization as string;
    const email = ctx.req.headers.email;
    if (!auth || !email) {
      return false;
    }
    // verify in redis
    const token = await redis.get(auth);
    if (!token || token !== email) {
      return false;
    }
    // update user password in prisma
    const hashedPassword = await argon2.hash(password);
    await prisma.user.update({
      where: {
        email: token,
      },
      data: {
        password: hashedPassword,
      },
    });
    // clear redis
    await redis.del([auth]);
    return true;
  }
}

export default ResetPasswordResolver;
