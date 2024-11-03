import { Post } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';
import { typePost } from '../typePosts.js';

export const postQuery: GraphQLFieldConfig<unknown, Context, { id: Post['id'] }> = {
  type: typePost as GraphQLObjectType,

  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, { id }, ctx: Context) => {

    return ctx.prisma.post.findUnique({ where: { id } });

  },
};