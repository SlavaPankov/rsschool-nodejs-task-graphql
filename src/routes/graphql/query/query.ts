import { GraphQLObjectType } from 'graphql';
import { Context } from '../context.js';
import { memberTypesQuery } from '../points/members/query/members.js';
import { memberTypeQuery } from '../points/members/query/member.js';
import { postsQuery } from '../points/posts/query/posts.js';
import { postQuery } from '../points/posts/query/post.js';
import { usersQuery } from '../points/users/query/users.js';
import { userQuery } from '../points/users/query/user.js';
import { profilesQuery } from '../points/profiles/query/profiles.js';
import { profileQuery } from '../points/profiles/query/profile.js';


export const typeQuery = new GraphQLObjectType<unknown, Context>({
    name: 'RootQuery',
    fields: () => ({
        memberTypes: memberTypesQuery,
        memberType: memberTypeQuery,

        posts: postsQuery,
        post: postQuery,

        users: usersQuery,
        user: userQuery,

        profiles: profilesQuery,
        profile: profileQuery,
    }),
});