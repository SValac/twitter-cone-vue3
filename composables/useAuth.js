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

	// method that will run every time the page refresh and get the refresh token
	const initAuth = () => {
		setIsAuthLoading(true);
		return new Promise(async (resolve, reject) => {
			try {
				await refreshToken();
				await getUser();
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
