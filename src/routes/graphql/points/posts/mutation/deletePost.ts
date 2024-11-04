import { Post } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { Context } from '../../../context.js';

export const deletePost: GraphQLFieldConfig<unknown, Context, Pick<Post, 'id'>> = {
    type: new GraphQLNonNull(GraphQLBoolean),
    description:
        'Deletes a post by its ID and returns true if the deletion was successful.',
    args: {
        id: {
            type: new GraphQLNonNull(UUIDType),
            description: 'The unique identifier of the post to be deleted.',
        },
    },
    resolve: async (_, { id }, ctx: Context) => {
        try {
            await ctx.prisma.post.delete({ where: { id } });
            return true;
        } catch (error) {
            console.error('Error deleting post:', error);
            throw new Error(
                'Failed to delete the post. Please try again or contact support if the problem persists.',
            );
        }
    },
};