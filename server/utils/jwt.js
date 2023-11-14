import jwt from 'jsonwebtoken';

const generateAccessToken = (user) => {
	// using the .env varibles to generate access token
	const config = useRuntimeConfig();

	/*
		Generating Acces Token
		using jwt.sign(
			payload, -> whatever this jwt will contain 
			secretOrPrivateKey, 
			[options, callback])
	*/
	return jwt.sign({ userId: user.id }, config.jwtAccessSecret, {
		expiresIn: '10m'
	});
};
const generateRefreshToken = (user) => {
	const config = useRuntimeConfig();

	return jwt.sign({ userId: user.id }, config.jwtRefreshSecret, {
		expiresIn: '4h'
	});
};

// to generate the tokes we need an identifier, in this case user ID
export const generateTokens = (user) => {
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);

	// we will have 2 secret keys 1 for accesstoken and 1 for Refresh Token in .env
	return {
		accessToken: accessToken,
		refreshToken: refreshToken
	};
};

export const sendRefreshToken = (event, token) => {
	setCookie(event, 'refresh_token', token, {
		httpOnly: true,
		sameSite: true
	});
};
