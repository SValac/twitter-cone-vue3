import { getTweetById } from '~/server/db/tweets';
import { tweetTransformer } from '~/server/transformers/tweet';

export default defineEventHandler(async (event) => {
	const { id } = event.context.params;
	const tweet = await getTweetById(id);

	return {
		tweet: tweetTransformer(tweet)
	};
});
