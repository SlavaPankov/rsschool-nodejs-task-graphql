import { User } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../../types/uuid.js';
import { Context } from '../../../context.js';
import { typePerson } from '../typePerson.js';

export const userQuery: GraphQLFieldConfig<unknown, Context, { id: User['id'] }> = {

  type: typePerson as GraphQLObjectType,
  
  args: { id: { type: new GraphQLNonNull(UUIDType) } },

  resolve: async (_, { id }, ctx: Context) => ctx.prisma.user.findUnique({ where: { id } }),
};
