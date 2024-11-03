import { GraphQLObjectType } from 'graphql';
import { Context } from '../context.js';
import { createPost } from '../points/posts/mutation/createPost.js';
import { changePost } from '../points/posts/mutation/changePost.js';
import { deletePost } from '../points/posts/mutation/deletePost.js';
import { createUser } from '../points/users/mutation/createUser.js';
import { updateUser } from '../points/users/mutation/updateUser.js';
import { deleteUser } from '../points/users/mutation/deleteUser.js';
import { subscribeTo } from '../points/users/mutation/subscribe.js';
import { unsubscribe } from '../points/users/mutation/unsubscribe.js';
import { createProfile } from '../points/profiles/mutation/createProfile.js';
import { updateProfile } from '../points/profiles/mutation/updateProfile.js';
import { deleteProfile } from '../points/profiles/mutation/deleteProfile.js';

export const typeMutation = new GraphQLObjectType<null, Context>({
  name: 'RootMutation',
  fields: () => ({
    createProfile: createProfile,
    changeProfile: updateProfile,
    deleteProfile: deleteProfile,

    createUser: createUser,
    changeUser: updateUser,
    deleteUser: deleteUser,

    subscribeTo: subscribeTo,
    unsubscribeFrom: unsubscribe,
    
    createPost: createPost,
    changePost: changePost,
    deletePost: deletePost,
  }),
});
