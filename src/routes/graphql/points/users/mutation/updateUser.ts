import { User } from '@prisma/client';
import {
    GraphQLFieldConfig,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';
import { typePerson } from '../typePerson.js';

export const UpdateUserInput = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    description: "Input fields required for updating a user's information.",
    fields: () => ({
        name: { type: GraphQLString, description: "The user's new name." },
        balance: { type: GraphQLFloat, description: "The user's new balance." },
    }),
});

export const updateUser: GraphQLFieldConfig<
    unknown,
    Context,
    { id: User['id']; dto: Partial<Pick<User, 'name' | 'balance'>> }
> = {
    type: new GraphQLNonNull(typePerson),
    description:
        "Updates a user's information based on the provided input and returns the updated user.",

    args: {
        id: {
            type: new GraphQLNonNull(UUIDType),
            description: 'The unique identifier of the user to be updated.',
        },
        dto: {
            type: new GraphQLNonNull(UpdateUserInput),
            description: "The input data used to update the user's information.",
        },
    },
    resolve: async (_source, { id, dto }, ctx: Context) => {
        return ctx.prisma.user.update({ where: { id }, data: dto });
    },
};