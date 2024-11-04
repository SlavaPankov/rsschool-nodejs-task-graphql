import { Context } from '../../context.js';
import { Profile } from '@prisma/client';
import { UUIDType } from '../../types/uuid.js';
import { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLInt } from 'graphql';
import { typePerson } from '../users/typePerson.js';
import { typeMembers } from '../members/typeMembers.js';

export const typeProfile = new GraphQLObjectType<Profile, Context>({
    name: 'Profile',
    description: "Represents user's profile with personal preferences and membership information.",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(UUIDType),
            description: 'The unique identifier of the profile.',
        },
        isMale: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'Indicates the gender of the user. True for male, false for female.',
        },
        yearOfBirth: {
            type: new GraphQLNonNull(GraphQLInt),
            description: "The user's year of birth.",
        },
        memberType: {
            type: new GraphQLNonNull(typeMembers),
            description: "The membership type associated with the user's profile.",
            resolve: (profile, _args, ctx) =>
                ctx.fetchMemberTypesById.load(profile.memberTypeId),
        },
        user: {
            type: new GraphQLNonNull(typePerson),
            description: 'The user associated with this profile.',
            resolve: (profile, _args, ctx) => ctx.fetchUsersById.load(profile.userId),
        },
    }),
});