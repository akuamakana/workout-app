import createSchema from 'utils/createSchema';
import { graphql } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
  userId?: number;
}

const gCall = async ({ source, variableValues, userId }: Options) => {
  const schema = await createSchema();
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: {
          userId,
          destroy: jest.fn(),
        },
        headers: {
          Authorization: '1',
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    },
  });
};

export default gCall;
