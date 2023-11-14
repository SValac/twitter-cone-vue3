import { createUser } from '../../db/users';
import { userTransformer } from '~/server/transformers/user';

export default defineEventHandler(async (event) => {
	const body = await readBody(event);

	const { username, email, name, password, repeatPassword } = body;

	if (!username || !email || !name || !password || !repeatPassword) {
		return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid Params' }));
	}

	if (password !== repeatPassword) {
		return sendError(
			event,
			createError({ statusCode: 400, statusMessage: 'Password does not match' })
		);
	}

	const userData = {
		username,
		email,
		password,
		name,
		profileImage: 'https://picsum.photos/200/200'
	};

	const user = await createUser(userData);

	return {
		body: userTransformer(user)
	};
});
