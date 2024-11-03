import { User } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';
import { typePerson } from '../typePerson.js';

export const subscribeTo: GraphQLFieldConfig<
  unknown,
  Context,
  { userId: User['id']; authorId: User['id'] }
> = {
  type: new GraphQLNonNull(typePerson),
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
  resolve: async (_, { userId, authorId }, ctx: Context) =>

    ctx.prisma.user.update({
      where: {id: userId},
      data: { userSubscribedTo: {create:{authorId}}},
    }),
};
