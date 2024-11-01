import { GraphQLObjectType } from 'graphql';
import { Context } from '../context.js';

export const typeMutation = new GraphQLObjectType<null, Context>({
  name: 'Mutation',
  fields: () => ({}),
});