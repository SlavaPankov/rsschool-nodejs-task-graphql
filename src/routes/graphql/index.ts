import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, graphQlSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';
import { setupDataLoaders } from './setupDataLoaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const depthError = validate(graphQlSchema, parse(query), [depthLimit(5)]);

      if (depthError.length) {
        return { data: null, errors: depthError };
      }

      return await graphql({
        schema: graphQlSchema,
        source: query,
        variableValues: variables,
        contextValue: { prisma, ...setupDataLoaders(prisma) },
      });
    },
  });
};

export default plugin;
