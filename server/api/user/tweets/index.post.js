import formidable from 'formidable';
import { createTweet } from '../../../db/tweets.js';
import { createMediaFile } from '~/server/db/mediaFiles.js';
import { tweetTransformer } from '~/server/transformers/tweet.js';
import { uploadToCloudinary } from '~/server/utils/cloudinary.js';

export default defineEventHandler(async (event) => {
	/* 
        Fisrt we need to acces the body
        in this case is not just a normal JSON
        is a MultiForm form data becase it include an image.
        otherwise 2 rquest my be needed 1 for text 1 for image

        there are many ways to acces the body of MultiForm
        here we wil use a library called "formidable"
    */

	// creating formidable instance
	const form = formidable({});

	// we want to await in ordet to formidable complete the parse
	// so we wrap it into a prmise

	const response = await new Promise((resolve, reject) => {
		form.parse(event.node.req, (err, fields, files) => {
			// if error reject and pass the errpr
			if (err) {
				reject(err);
			}
			// else resolve passing an object with fields and files
			resolve({ fields, files });
		});
	});

	// destructuringn response to acces files and files information and create a twee
	const { fields, files } = response;

	// get who is creating the tweet from context, specify in middle ware that auth should be run in this endppoint
	const userId = event.context?.auth?.user?.id; // ? in case of undefined

	// define tweetData
	const tweetData = {
		text: fields.text[0],
		authorId: userId
	};

	// create a tweet with tweetData
	const tweet = await createTweet(tweetData);

	// creating the MediaFiles,
	// iterating using keys to get the image value
	// for each file map the key "image"
	// return createMediaFile for each file
	// provie fields for MediaFile
	// returns an Array of Promises saved in variable
	const filePromises = Object.keys(files).map(async (key) => {
		// extrract image from file
		const file = files[key][0];
		// await to uoloadfile
		const cloudinaryResource = await uploadToCloudinary(file.filepath);

		console.log(response);

		return createMediaFile({
			url: cloudinaryResource.secure_url,
			providerPublicId: cloudinaryResource.public_id,
			userId: userId,
			tweetId: tweet.id
		});
	});

	// await to complete the FilePromises
	await Promise.all(filePromises);

	return {
		//tweet: tweetTransformer(tweet)
		files
	};
});
