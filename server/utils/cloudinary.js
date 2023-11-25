import { v2 as _cloudinary } from 'cloudinary';

/**
 * set up cloudinary configuration.
 * use run time config to acces env variables
 * set cloudinary config using env variabes
 * @returns {cloudinary} - cloudinary instance with config
 *
 */

const cloudinary = () => {
	// useRuntimeConfig to acces env variables
	const config = useRuntimeConfig();

	// set cloudinari config
	_cloudinary.config({
		cloud_name: config.cloudinaryCloudName,
		api_key: config.cloudinaryApiKey,
		api_secret: config.cloudinaryApiSecret
	});

	return _cloudinary;
};

export const uploadToCloudinary = (image) => {
	return new Promise((resolve, reject) => {
		/*
		 * @param {image} image - image.
		 * @param {callback} callback - access to error if any, and data information if uploaded sucesfully
		 */

		cloudinary().uploader.upload(image, (error, data) => {
			if (error) {
				reject(error);
			}
			resolve(data);
		});
	});
};
