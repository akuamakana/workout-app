import { buildSchema } from 'type-graphql';
import RegisterResolver from '@resolvers/auth/Register';
import LoginResolver from '@resolvers/auth/Login';
import MeResolver from '@resolvers/auth/Me';
import LogoutResolver from '@resolvers/auth/Logout';
import ConfirmEmailResolver from '@resolvers/auth/ConfirmEmail';
import ResetPasswordResolver from '@resolvers/auth/ResetPassword';
import ForgotPasswordResolver from '@resolvers/auth/ForgotPassword';
import SendVerificationEmailResolver from '@resolvers/auth/SendVerificationEmail';
import CreateWorkoutResolver from '@resolvers/workout/CreateWorkout';
import DeleteWorkoutResolver from '@resolvers/workout/DeleteWorkouts';
import GetWorkoutResolver from '@resolvers/workout/GetWorkout';
import GetWorkoutsResolver from '@resolvers/workout/GetWorkouts';
import UpdateWorkoutResolver from '@resolvers/workout/UpdateWorkouts';

const createSchema = () =>
  buildSchema({
    resolvers: [
      CreateWorkoutResolver,
      DeleteWorkoutResolver,
      GetWorkoutResolver,
      GetWorkoutsResolver,
      UpdateWorkoutResolver,
      LoginResolver,
      RegisterResolver,
      MeResolver,
      LogoutResolver,
      ConfirmEmailResolver,
      ResetPasswordResolver,
      ForgotPasswordResolver,
      SendVerificationEmailResolver,
    ],
  });

export default createSchema;
