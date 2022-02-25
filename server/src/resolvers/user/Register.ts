import argon2 from 'argon2';
import { User } from 'models/User';
import prisma from 'lib/prisma';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { RegisterInput } from 'models/Inputs/RegisterInput';

@Resolver()
class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('input') { email, username, password }: RegisterInput): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    const user = {
      email,
      username,
      password: hashedPassword,
    };

    const createdUser = await prisma.user.create({ data: user });

    return createdUser;
  }
}

export default RegisterResolver;
