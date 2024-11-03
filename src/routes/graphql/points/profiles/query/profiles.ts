import { GraphQLFieldConfig, GraphQLNonNull, GraphQLList } from 'graphql';
import { Context } from '../../../context.js';
import { typeProfile } from '../typeProfile.js';

export const profilesQuery: GraphQLFieldConfig<unknown, Context> = {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(typeProfile))),

    resolve: async (_, _arg, ctx: Context) => ctx.prisma.profile.findMany(),
};