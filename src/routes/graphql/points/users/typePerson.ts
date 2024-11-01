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
import { typeProfile } from '../porfiles/typeProfile.js';

export const typePerson = new GraphQLObjectType<User, Context>({
  name: 'Person',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(typePost))),
      resolve: (user, _, ctx) => ctx.fetchPostsByUserId.load(user.id),
    },
    profile: {
      type: typeProfile,
      resolve: (user, _, ctx) => ctx.fetchProfilesByUserId.load(user.id),
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(typePerson))),
      resolve: (user, _, ctx) => ctx.fetchSubscriptionsToUser.load(user.id),
    },
    followers: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(typePerson))),
      resolve: (user, _, ctx) => ctx.fetchUserSubscriptions.load(user.id),
    },
  }),
});