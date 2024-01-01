export default () => {
	const postTweet = (formData) => {
		const form = new FormData();

		// get the Text from form data
		form.append('text', formData.text);
		// get the replyTO form data
		form.append('replyTo', formData.replyTo);

		// get files from mediaFiles, iterate to get all files
		formData.mediaFiles.forEach((mediaFile, index) => {
			form.append(`media_file_${index}`, mediaFile);
		});
		return useFetchApi('/api/user/tweets', {
			method: 'POST',
			body: form
		});
	};

	const getHomeTweets = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await useFetchApi('/api/tweets', {
					method: 'GET'
				});
				// console.log(response);
				// resolve so it wont loop infinite
				resolve(response);
			} catch (error) {
				reject(error);
			}
		});
	};

	const getTweetById = (tweetId) => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await useFetchApi(`/api/tweets/${tweetId}`, {
					method: 'GET'
				});
				resolve(response);
			} catch (error) {
				console.log(error);
			}
		});
	};

	return {
		postTweet,
		getHomeTweets,
		getTweetById
	};
};
