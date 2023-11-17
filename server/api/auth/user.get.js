import { userTransformer } from '~/server/transformers/user';
export default defineEventHandler((event) => {
	return {
		// when this route is accesed it will trigger the middlewate and then add user to context.

		// then we retrive user from context and transform it to only expose what we need
		user: userTransformer(event.context.auth?.user)
	};
});
