import { Post } from '@prisma/client';
import {
    GraphQLFieldConfig,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';
import { typePost } from '../typePosts.js';

export const typeCreatePost = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    description:
        'Input type for creating a new post, including title, content, and author ID.',
    fields: () => ({
        authorId: {
            type: new GraphQLNonNull(UUIDType),
            description: 'The UUID of the author creating the post.',
        },
        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The title of the post.',
        },
        content: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The content body of the post.',
        },
    }),
});

export const createPost: GraphQLFieldConfig<unknown, Context, { dto: Omit<Post, 'id'> }> = {
    type: new GraphQLNonNull(typePost),
    description: 'Creates a new post and returns the created post object.',
    args: {
        dto: {
            type: new GraphQLNonNull(typeCreatePost),
            description: 'The input data needed to create a new post.',
        },
    },
    resolve: async (_, { dto }, ctx: Context) => {
        return ctx.prisma.post.create({ data: dto });
    },
};