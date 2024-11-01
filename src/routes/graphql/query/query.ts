import { GraphQLObjectType } from 'graphql';
import { Context } from '../context.js';
import { usersQuery } from '../points/users/query/user.js';

export const typeQuery = new GraphQLObjectType<unknown, Context>({
  name: 'Query',
  fields: () => ({
    users: usersQuery,
  }),
});