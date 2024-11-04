import { Profile } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';

export const deleteProfile: GraphQLFieldConfig<unknown, Context, { id: Profile['id'] }> = {
    type: new GraphQLNonNull(GraphQLBoolean),
    description:
        'Deletes a profile by its ID and returns true if the operation was successful.',
    args: {
        id: {
            type: new GraphQLNonNull(UUIDType),
            description: 'The unique identifier of the profile to be deleted.',
        },
    },
    resolve: async (_source, { id }, ctx: Context) => {
        try {
            await ctx.prisma.profile.delete({ where: { id } });
            return true;
        } catch (error) {
            console.error('Error deleting profile:', error);
            throw new Error('Failed to delete profile.');
        }
    },
};