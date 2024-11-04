import { Profile } from '@prisma/client';
import {
    GraphQLBoolean,
    GraphQLFieldConfig,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';
import { typeProfile } from '../typeProfile.js';
import { typeMembersID } from '../../members/typeMembers.js';

export const updateProfileType = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    description:
        'Input for updating a user profile, including gender, year of birth, and member type ID.',
    fields: () => ({
        isMale: {
            type: GraphQLBoolean,
            description: 'Gender of the user. True for male, false otherwise.',
        },
        yearOfBirth: { type: GraphQLInt, description: 'Year of birth of the user.' },
        memberTypeId: {
            type: typeMembersID,
            description: 'ID of the membership type associated with the user profile.',
        },
    }),
});

export const updateProfile: GraphQLFieldConfig<
    unknown,
    Context,
    {
        id: Profile['id'];
        dto: Partial<Pick<Profile, 'memberTypeId' | 'isMale' | 'yearOfBirth'>>;
    }
> = {
    type: new GraphQLNonNull(typeProfile),
    description:
        'Updates an existing profile with provided data and returns the updated profile.',
    args: {
        id: {
            type: new GraphQLNonNull(UUIDType),
            description: 'The unique identifier of the profile to update.',
        },
        dto: {
            type: new GraphQLNonNull(updateProfileType),
            description: 'The fields of the profile to update.',
        },
    },
    resolve: async (_, { id, dto }, ctx: Context) =>
        ctx.prisma.profile.update({ where: { id }, data: dto }),
};