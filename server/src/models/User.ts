import { ObjectType, Field, ID } from 'type-graphql';
import { Workout } from './Workout';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  verified: boolean;
  createdAt: Date;
  updatedAt: Date;

  @Field(() => [Workout])
  workouts?: Workout[];
}
