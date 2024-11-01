import { Context } from '../../context.js';
import { Profile } from '@prisma/client';
import { UUIDType } from '../../types/uuid.js';
import { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLInt } from 'graphql';
import { typePerson } from '../users/typePerson.js';
import { typeMembers } from '../members/typeMembers.js';

export const typeProfile = new GraphQLObjectType<Profile, Context>({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(typeMembers),
      resolve: (profile, _args, ctx) =>
        ctx.fetchMemberTypesById.load(profile.memberTypeId),
    },
    user: {
      type: new GraphQLNonNull(typePerson),
      resolve: (profile, _args, ctx) => ctx.fetchUsersById.load(profile.userId),
    },
  }),
});