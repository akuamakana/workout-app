import { ObjectType, Field, ID } from 'type-graphql';
import { Exercise } from './Exercise';
import { User } from './User';

@ObjectType()
export class Workout {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [Exercise])
  exercises?: Exercise[];

  @Field()
  note: string;

  @Field()
  isCompleted: boolean;

  @Field(() => User)
  createdBy?: User;

  @Field()
  userId: number;
}
