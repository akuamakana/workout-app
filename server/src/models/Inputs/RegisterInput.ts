import { IsEmail, Length, NotContains } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from 'validators/isEmailAlreadyExist';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email is already in use' })
  email: string;

  @Field()
  @Length(4, 255)
  @NotContains('@')
  username: string;

  @Field()
  @Length(4, 255)
  password: string;
}
