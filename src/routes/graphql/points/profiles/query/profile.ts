import { Profile } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';
import { typeProfile } from '../typeProfile.js';

export const profileQuery: GraphQLFieldConfig<unknown, Context, { id: Profile['id'] }> = {
  type: typeProfile as GraphQLObjectType,
  args: { id: 
    { type: new GraphQLNonNull(UUIDType) }
  },
  resolve: async (_, { id }, ctx: Context) => ctx.prisma.profile.findUnique({ where: { id } }),
};