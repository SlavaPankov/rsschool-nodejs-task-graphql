import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt,
    GraphQLEnumType,
} from 'graphql';

export const typeMembersID = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        basic: { value: 'basic' },
        business: { value: 'business' },
    },
});

export const typeMembers = new GraphQLObjectType({
    name: 'MemberType',
    description: 'Defines the membership type and its associated privileges within the application.',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(typeMembersID),
            description: 'Unique identifier of the membership type.',
        },
        discount: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'Discount rate provided to the user, represented as a percentage.',
        },
        postsLimitPerMonth: {
            type: new GraphQLNonNull(GraphQLInt),
            description:
                'Maximum number of posts a user can create per month with this membership type.',
        },
    }),
});
