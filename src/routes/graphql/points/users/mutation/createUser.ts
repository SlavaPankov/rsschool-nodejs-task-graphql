import { User } from '@prisma/client';
import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLFieldConfig,
} from 'graphql';
import { Context } from '../../../context.js';
import { typePerson } from '../typePerson.js';

export const createUserType = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    description: 'Input type for creating a new user, including name and balance.',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the user.',
        },
        balance: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'The initial balance of the user.',
        },
    }),
});

export const createUser: GraphQLFieldConfig<unknown, Context, { dto: Omit<User, 'id'> }> =
{
    type: new GraphQLNonNull(typePerson),
    description: 'Creates a new user with the provided name and balance.',
    args: {
        dto: {
            type: new GraphQLNonNull(createUserType),
            description: 'The fields required to create a new user.',
        },
    },
    resolve: async (_source, { dto }, ctx: Context) => {
        return ctx.prisma.user.create({ data: dto });
    },
};