export default () => {
	const postTweet = (formData) => {
		const form = new FormData();

		// get the Text from form data
		form.append('text', formData.text);

		// get files from mediaFiles, iterate to get all files

		formData.mediaFiles.forEach((mediaFile, index) => {
			form.append(`media_file_${index}`, mediaFile);
		});
		return useFetchApi('/api/user/tweets', {
			method: 'POST',
			body: form
		});
	};

	return {
		postTweet
	};
};
