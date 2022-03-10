import { ObjectType, Field, ID } from 'type-graphql';
import { Workout } from './Workout';

@ObjectType()
export class Exercise {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  category: 'barbell' | 'dumbbell' | 'machine' | 'bodyweight' | 'assisted' | 'reps' | 'cardio' | 'duration';

  @Field()
  part: 'none' | 'core' | 'arms' | 'back' | 'chest' | 'legs' | 'shoulders' | 'other' | 'olympic' | 'fullbody' | 'cardio';

  @Field(() => [Workout])
  workouts?: Workout[];
}
