import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { MemberType } from '@prisma/client';
import { Context } from '../../../context.js';
import { typeMembers, typeMembersID } from '../typeMembers.js';

export const memberTypeQuery: GraphQLFieldConfig<
    unknown,
    Context,
    { id: MemberType['id'] }
> = {
    type: new GraphQLNonNull(typeMembers),
    args: {
        id: { type: new GraphQLNonNull(typeMembersID) },
    },
    resolve: async (_, { id }, ctx: Context) => {
        return ctx.prisma.memberType.findUnique({ where: { id } });
    },
};