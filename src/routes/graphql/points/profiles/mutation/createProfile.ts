import { Profile } from '@prisma/client';
import {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFieldConfig,
} from 'graphql';
import { Context } from '../../../context.js';
import { UUIDType } from '../../../types/uuid.js';
import { typeMembersID } from '../../members/typeMembers.js';
import { typeProfile } from '../typeProfile.js';

export const CreateProfileInputType = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    description:
        'Input type for creating a new user profile, including gender, year of birth, user ID, and member type ID.',
    fields: {
        isMale: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'Indicates if the user is male. True for male, false for female.',
        },
        yearOfBirth: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The year the user was born.',
        },
        userId: {
            type: new GraphQLNonNull(UUIDType),
            description: 'The unique identifier of the user this profile belongs to.',
        },
        memberTypeId: {
            type: new GraphQLNonNull(typeMembersID),
            description:
                'The unique identifier of the membership type associated with this profile.',
        },
    },
});

export const createProfile: GraphQLFieldConfig<
    null,
    Context,
    { dto: Omit<Profile, 'id'> }
> = {
    type: new GraphQLNonNull(typeProfile),
    description:
        'Creates a new profile with specified details and returns the created profile.',
    args: {
        dto: {
            type: new GraphQLNonNull(CreateProfileInputType),
            description:
                'The input object containing all required fields to create a new profile.',
        },
    },
    resolve: async (_, { dto }, ctx: Context) => {
        return ctx.prisma.profile.create({ data: dto });
    },
};