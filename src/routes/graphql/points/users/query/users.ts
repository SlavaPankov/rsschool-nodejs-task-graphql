import { GraphQLFieldConfig, GraphQLNonNull, GraphQLList, GraphQLType } from 'graphql';
import { simplify, parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';
import { Context } from '../../../context.js';
import { typePerson } from '../typePerson.js';
import { indexBy } from '../../../setupDataLoaders.js';

export const usersQuery: GraphQLFieldConfig<unknown, Context> = {

    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(typePerson))),
    resolve: async (_source, _args, ctx: Context, info) => {
        const parsedInfo = parseResolveInfo(info);
        const { fields } = simplify(parsedInfo as ResolveTree, typePerson);
        const needsSubscriptions = 'subscribedToUser' in fields;
        const needsFollowers = 'userSubscribedTo' in fields;
        const users = await ctx.prisma.user.findMany({
            include: {
                subscribedToUser: needsSubscriptions,
                userSubscribedTo: needsFollowers,
            },
        });

        if (needsSubscriptions || needsFollowers) {
            const usersMap = indexBy(users, (user) => user.id);

            users.forEach((user) => {
                if (needsSubscriptions) {
                    ctx.fetchSubscriptionsToUser.prime(
                        user.id,
                        user.subscribedToUser.map((relation) => usersMap[relation.subscriberId]),
                    );
                }
                if (needsFollowers) {
                    ctx.fetchUserSubscriptions.prime(
                        user.id,
                        user.userSubscribedTo.map((relation) => usersMap[relation.authorId]),
                    );
                }
            });
        }

        return users;
    },
};