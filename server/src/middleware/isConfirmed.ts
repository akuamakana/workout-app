import { MiddlewareFn } from 'type-graphql';
import { MyContext } from 'types/MyContext';

export const isConfirmed: MiddlewareFn<MyContext> = async ({ context }, next) => {
  

  return next();
};
