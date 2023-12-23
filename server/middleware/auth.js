import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '../utils/jwt';
import { getUserById } from '../db/users';

/* 
    middleware is going to old all the logic
    and is going to grab information from the acces token
    decode it and then save it and attach it to the request
    
    this way we can have access t any user thats making the request whenever the acces token is attached
*/

export default defineEventHandler(async (event) => {
	// define where this middles is going to be running, if not defined  it will run in all request

	// define endpoints to run the middleware. Using module url-pattern
	const endpoints = ['/api/auth/user', '/api/user/tweets', '/api/tweets'];

	// checn if this middleware should run in this endpoint
	const isHandledByThisMiddleware = endpoints.some((endpoint) => {
		const pattern = new UrlPattern(endpoint);
		return pattern.match(event.node.req.url);
	});

	// if is false then we just exit
	if (!isHandledByThisMiddleware) {
		return;
	}

	// acces token
	const token = event.node.req.headers['authorization']?.split(' ')[1];

	console.log(token);

	// one we get the code we need to decode it
	const decoded = decodeAccessToken(token);

	console.log(decoded);

	// vaalidate that decoded is still valid
	if (!decoded) {
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: 'Unahutorized'
			})
		);
	}

	// with docoded token we have acces to userID so we get the user using getUserByIt
	try {
		const userId = decoded.userId;
		console.log(userId);
		const user = await getUserById(userId);
		console.log(user);

		event.context.auth = { user };
	} catch (error) {
		return;
	}
});
