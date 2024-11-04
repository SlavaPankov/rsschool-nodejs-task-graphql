import { User } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';

export const deleteUser: GraphQLFieldConfig<unknown, Context, { id: User['id'] }> = {
    type: new GraphQLNonNull(GraphQLBoolean),
    description:
        'Deletes a user by their unique ID and returns true if the operation was successful.',
    args: {
        id: {
            type: new GraphQLNonNull(UUIDType),
            description: 'The unique identifier of the user to be deleted.',
        },
    },
    resolve: async (_, { id }, ctx: Context) => {
        try {
            await ctx.prisma.user.delete({ where: { id } });
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error(
                'Deletion of the user failed. Please check the server logs for more details.',
            );
        }
    },
};