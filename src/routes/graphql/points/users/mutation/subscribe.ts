import { User } from '@prisma/client';
import { GraphQLBoolean, GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';

export const subscribeTo: GraphQLFieldConfig<
  unknown,
  Context,
  { userId: User['id']; authorId: User['id'] }
> = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description:
    "Subscribes one user to another user's updates. Returns the subscriber user.",
  args: {
    userId: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The unique identifier of the subscribing user.',
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The unique identifier of the author to subscribe to.',
    },
  },
  resolve: async (_, { userId, authorId }, ctx: Context) => {
    await ctx.prisma.subscribersOnAuthors.create({
      data: {
        subscriberId: userId,
        authorId: authorId,
      }
    });

    ctx.fetchUserSubscriptions.clear(userId);
    ctx.fetchSubscriptionsToUser.clear(authorId);
    return true;
  }
};
