import { Type } from '@fastify/type-provider-typebox';
import { GraphQLSchema } from 'graphql';
import { typeQuery } from './query/query.js';
import { typeMutation } from './mutation/mutation.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const graphQlSchema = new GraphQLSchema({
  query: typeQuery,
  mutation: typeMutation,
  extensions: {},
});