import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt,
    GraphQLEnumType,
  } from 'graphql';
  
  export const typeMembers = new GraphQLObjectType({
    name: 'TypeMembers',
    fields: () => ({
      id: { type: new GraphQLNonNull(typeMembersID) },
      discount: { type: new GraphQLNonNull(GraphQLFloat) },
      postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
    }),
  });
  
  const typeMembersID = new GraphQLEnumType({
    name: 'TypeMembersID',
    values: {
      BASIC: { value: 'basic' },
      BUSINESS: { value: 'business' },
    },
  });