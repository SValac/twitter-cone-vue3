export default (url, options = {}) => {
	const { useAuthToken } = useAuth();

	return $fetch(url, {
		// spread options
		...options,
		// override headers
		headers: {
			...options.headers,
			Authorization: `Bearer ${useAuthToken().value}`
		}
	});
};
