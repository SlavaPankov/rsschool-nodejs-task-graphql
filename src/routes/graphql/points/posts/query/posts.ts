import { GraphQLFieldConfig, GraphQLNonNull, GraphQLList } from 'graphql';
import { Context } from '../../../context.js';
import { typePost } from '../typePosts.js';

export const postsQuery: GraphQLFieldConfig<unknown, Context> = {

  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(typePost))),

  resolve: async (_, _args, ctx: Context) => {

    return ctx.prisma.post.findMany();

  },
};
