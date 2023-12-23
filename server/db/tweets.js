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
