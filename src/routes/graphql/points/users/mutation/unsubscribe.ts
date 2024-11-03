import { User } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';

export const unsubscribe: GraphQLFieldConfig<
  unknown,
  Context,
  { userId: User['id']; authorId: User['id'] }
> = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description: "Allows a user to unsubscribe from another user's updates.",
  args: {
    userId: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The unique identifier of the subscribing user.',
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The unique identifier of the author from whom to unsubscribe.',
    },
  },
  resolve: async (_, { userId, authorId }, ctx: Context) => {
    try {
      await ctx.prisma.subscribersOnAuthors.delete({
        
        
        where: {

          subscriberId_authorId: {

            subscriberId: userId,
            authorId: authorId,

          },
        },
      });
      return true;
    } catch (error) {
      console.error('Error unsubscribing:', error);
      throw new Error('Unsubscription failed. Please try again later.');
      return false;
    }
  },
};
