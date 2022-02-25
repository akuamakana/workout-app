import { buildSchema } from 'type-graphql';
import RegisterResolver from 'resolvers/user/Register';
import LoginResolver from 'resolvers/user/Login';
import MeResolver from 'resolvers/user/Me';
import LogoutResolver from 'resolvers/user/Logout';

const createSchema = () =>
  buildSchema({
    resolvers: [LoginResolver, RegisterResolver, MeResolver, LogoutResolver],
  });

export default createSchema;
