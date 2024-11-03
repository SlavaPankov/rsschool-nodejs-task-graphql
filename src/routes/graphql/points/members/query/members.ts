import { GraphQLFieldConfig, GraphQLNonNull, GraphQLList } from 'graphql';
import { Context } from '../../../context.js';
import { typeMembers } from '../typeMembers.js';

export const memberTypesQuery: GraphQLFieldConfig<unknown, Context> = {

    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(typeMembers))),
    resolve: async (_, _args, ctx: Context) => {

        return ctx.prisma.memberType.findMany();

    },
};