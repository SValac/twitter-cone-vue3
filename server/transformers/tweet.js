import { mediaFileTransformer } from './mediaFiles';
import { userTransformer } from './user';
import ago from 's-ago';

export const tweetTransformer = (tweet) => {
	return {
		id: tweet.id,
		text: tweet.text,
		// if mediaFile is present then use transformer
		mediaFiles: !!tweet.mediaFiles ? tweet.mediaFiles.map(mediaFileTransformer) : [],
		// if author is present then use transformer
		author: !!tweet.author ? userTransformer(tweet.author) : null,
		replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
		// !! transofmr falsy o thrty value in boolean
		replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
		// get number of replies
		repliesCount: tweet.replies ? tweet.replies.length : 0,
		postedAtAgo: ago(tweet.createdAt)
	};
};
