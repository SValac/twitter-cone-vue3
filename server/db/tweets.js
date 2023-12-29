import { prisma } from '.';

export const createTweet = (tweetData) => {
	// create tweet using prisma model tweet
	// return the promise
	return prisma.tweet.create({
		data: tweetData
	});
};

export const getTweets = (params = {}) => {
	return prisma.tweet.findMany({
		...params
	});
};

export const getTweetById = (tweetId, params = {}) => {
	return prisma.tweet.findUnique({
		...params,
		where: {
			// spread paramse wirthout overridend id
			...params.where,
			id: tweetId
		}
		// ...params spreading params after where will override all whithin where key so it shuld be before where
	});
};
