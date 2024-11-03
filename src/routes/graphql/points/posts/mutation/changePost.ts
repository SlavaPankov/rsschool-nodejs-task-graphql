import { Post } from '@prisma/client';
import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLFieldConfig,
    GraphQLNonNull,
} from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';
import { typePost } from '../typePosts.js';

export const UpdatePostInput = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    description: 'Input fields for updating a post. Both fields are optional.',
    fields: () => ({
        content: { type: GraphQLString, description: 'The new content of the post.' },
        title: { type: GraphQLString, description: 'The new title of the post.' },
    }),
});

export const changePost: GraphQLFieldConfig<
    unknown,
    Context,
    { id: Post['id']; dto: Partial<Pick<Post, 'title' | 'content' | 'authorId' | 'id'>> }
> = {
    type: new GraphQLNonNull(typePost),
    description: 'Updates a post identified by its ID with new title and/or content.',
    args: {
        id: {
            type: new GraphQLNonNull(UUIDType),
            description: 'The unique identifier of the post to be updated.',
        },
        dto: {
            type: new GraphQLNonNull(UpdatePostInput),
            description:
                'The input object containing the new title and/or content for the post.',
        },
    },

    resolve: (_source, { id, dto }, ctx: Context) =>
        ctx.prisma.post.update({ where: { id }, data: dto }),
};