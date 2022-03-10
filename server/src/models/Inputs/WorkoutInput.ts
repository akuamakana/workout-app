import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class WorkoutInput {
  @Length(4, 255)
  @Field({ nullable: true })
  name?: string;

  @Length(0, 255)
  @Field({ nullable: true })
  note?: string;

  @Field({ nullable: true })
  isCompleted?: boolean;
}
