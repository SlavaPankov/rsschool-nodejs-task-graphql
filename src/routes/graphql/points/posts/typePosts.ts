import { Post } from '@prisma/client';
import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { Context } from '../../context.js';
import { typePerson } from '../users/typePerson.js';

export const typePost = new GraphQLObjectType<Post, Context>({
    name: 'Post',
    description: 'Represents a blog post or article written by a user',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType),
            description: 'The unique identifier of the post',
        },

        title: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The title of the post',
        },

        content: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The content body of the post',
        },
        author: {
            type: new GraphQLNonNull(typePerson),
            description: 'The user who authored the post',
            resolve: async (p, _, ctx) => ctx.fetchUsersById.load(p.authorId),
        },

    }),
})