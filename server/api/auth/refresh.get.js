import { getRefreshTokenByToken } from '~/server/db/refreshTokens';
import { decodeRefreshToken, generateTokens } from '~/server/utils/jwt';
import { getUserById } from '~/server/db/users';

export default defineEventHandler(async (event) => {
	// Refresh Token is stored in cookies so we need to acces cokkies and retrieve it
	const refreshToken = getCookie(event, 'refresh_token');

	// validate that refreshToken is present else send error
	if (!refreshToken) {
		sendError(
			event,
			createError({
				statusCode: 401, // Unauthorized
				statusMessage: 'Refresh Token is Invalid'
			})
		);
	}

	// check if RefreshToken is present in the DB
	const refreshTokenInDb = await getRefreshTokenByToken(refreshToken);

	// validate that refreshTokenInDb is present else send error
	if (!refreshTokenInDb) {
		sendError(
			event,
			createError({
				statusCode: 401, // Unauthorized
				statusMessage: 'Refresh Token is Invalid'
			})
		);
	}

	// validate that token is NOT expired
	const token = decodeRefreshToken(refreshToken);

	// after getting the token and validate that is present and not expired then we need to ge the User and Generate Access Token again
	try {
		const user = await getUserById(token.userId);
		const { accessToken } = generateTokens(user);
		return {
			access_token: accessToken
		};
	} catch (error) {
		sendError(
			event,
			createError({
				statusCode: 500, // Unauthorized
				statusMessage: 'Something went wrong'
			})
		);
	}

	return {
		hello: token
	};
});
