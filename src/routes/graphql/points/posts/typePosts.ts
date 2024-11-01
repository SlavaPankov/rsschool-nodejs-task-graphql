import { Post } from '@prisma/client';
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { Context } from '../../context.js';
import { typePerson } from '../users/typePerson.js';

export const typePost = new GraphQLObjectType<Post, Context>({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: new GraphQLNonNull(typePerson),
      resolve: async (post, _, ctx) => ctx.fetchUsersById.load(post.authorId),
    },
  }),
});