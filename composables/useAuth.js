import { jwtDecode } from 'jwt-decode';
export default () => {
	// useState is lite version of Pinia to help with state management
	const useAuthToken = () => useState('auth_token');
	const useAuthUser = () => useState('auth_user');
	const useAuthLoading = () => useState('auth_loading', () => true);

	// helper functions to set the token and user
	// not that we are not saving acces token in memory so refresh will invalidate it, we need to use refresh token
	const setToken = (newToken) => {
		const authToken = useAuthToken();
		authToken.value = newToken;
	};

	const setUser = (newUser) => {
		const authUser = useAuthUser();
		authUser.value = newUser;
	};

	const setIsAuthLoading = (value) => {
		const authLoading = useAuthLoading();
		authLoading.value = value;
	};

	const login = ({ username, password }) => {
		console.log(username, password);
		return new Promise(async (resolve, reject) => {
			try {
				const data = await $fetch('/api/auth/login', {
					method: 'POST',
					body: {
						username,
						password
					}
				});
				setToken(data.access_token);
				setUser(data.user);

				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};

	// refresh accesToken using refreshToken saved in cookies
	const refreshToken = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await $fetch('/api/auth/refresh');
				setToken(data.access_token);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};

	// this method will get the user from the endpoint user, but we need to pass the access token
	const getUser = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await useFetchApi('/api/auth/user');
				setUser(data.user);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	};

	const reRefreshAccessToken = () => {
		// we nned to decode the acces token we have in memory
		const authToken = useAuthToken();

		// check if authToken is present, else return
		if (!authToken.value) {
			return;
		}

		// decode the token to get the expiration time
		const jwt = jwtDecode(authToken.value);

		// now with the expire time we can substract x-minutes and refresh the access token
		const newRefreshTime = jwt.exp - 60000; // exp - 1 minute

		setTimeout(async () => {
			await refreshToken();
			reRefreshAccessToken();
		}, newRefreshTime);
	};

	// method that will run every time the page refresh and get the refresh token
	const initAuth = () => {
		setIsAuthLoading(true);
		return new Promise(async (resolve, reject) => {
			try {
				await refreshToken();
				await getUser();

				// once we have acces to user we need to re-generate the acces token every x-minutes before the current token expires so the user doest notice anything
				reRefreshAccessToken();

				resolve(true);
			} catch (error) {
				reject(error);
			} finally {
				setIsAuthLoading(false);
			}
		});
	};

	return {
		login,
		useAuthUser,
		useAuthToken,
		useAuthLoading,
		initAuth
	};
};
