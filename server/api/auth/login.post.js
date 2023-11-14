import { getUserByUsername } from '~/server/db/users';
import bcrypt from 'bcrypt';
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt';
import { userTransformer } from '~/server/transformers/user';
import { createRefreshToken } from '~/server/db/refreshTokens';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { username, password } = body;

	if (!username || !password) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: ' Invalid Params'
			})
		);
	}

	// Is the user register??
	const user = await getUserByUsername(username);
	if (!user) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Username or Password is Invalid'
			})
		);
	}
	// compare password
	const doesThePasswordMatch = await bcrypt.compare(password, user.password);
	if (!doesThePasswordMatch) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: 'Username or Password is Invalid'
			})
		);
	}

	// generate tokens
	// Access Token
	// Refresh Token
	const { accessToken, refreshToken } = generateTokens(user);

	// save refresh token in DB
	await createRefreshToken({
		token: refreshToken,
		userId: user.id
	});

	// add refresh token to http only cookie
	sendRefreshToken(event, refreshToken);

	return {
		// user: user,
		// doesThePasswordMatch,

		// access token is the only thing that will be exposed and the client will know and have access
		access_token: accessToken,
		user: userTransformer(user)

		/* 

        refresh token will be save in a http only cookie so only ther server can access it
		
        
        refresh_token = refreshToken 

        */
	};
});
