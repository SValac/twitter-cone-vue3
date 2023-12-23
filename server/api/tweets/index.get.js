import { getTweets } from '~/server/db/tweets';
import { tweetTransformer } from '~/server/transformers/tweet';

export default defineEventHandler(async (event) => {
	const tweets = await getTweets({
		orderBy: [
			{
				createdAt: 'desc'
			}
		],
		// include auther and mediafiles models in this request and replies
		include: {
			author: true,
			mediaFiles: true,
			replies: {
				// here we include author insise replies tweet
				include: {
					author: true
				}
			},
			replyTo: {
				// include replyTo
				include: {
					author: true
				}
			}
		}
	});
	return {
		// utilize transofrmer to get desired properties only.
		// tweetTransformer doest no take any argument because map use that funcition for each element in the arrray and pass it as argument
		tweets: tweets.map(tweetTransformer)
	};
});
