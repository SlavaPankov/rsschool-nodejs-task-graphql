import { User } from '@prisma/client';
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { Context } from '../../context.js';
import { typePost } from '../posts/typePosts.js';
import { typeProfile } from '../profiles/typeProfile.js';

export const typePerson = new GraphQLObjectType<User, Context>({
  name: 'User',
  description:
    `Represents a user of the application, 
    including their personal details, posts they have authored, 
    profiles associated with them, and their subscription relationships with other users.`,

  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(typePost))),
      resolve: (user, _, ctx: Context) => ctx.fetchPostsByUserId.load(user.id),
    },
    profile: {
      type: typeProfile,
      resolve: (user, _, ctx: Context) => ctx.fetchProfilesByUserId.load(user.id),
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(typePerson))),
      resolve: (user, _, ctx: Context) => ctx.fetchSubscriptionsToUser.load(user.id),
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(typePerson))),
      resolve: (user, _, ctx: Context) => ctx.fetchUserSubscriptions.load(user.id),
    },
  }),
});
