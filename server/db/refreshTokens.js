import { prisma } from '.';

// create RefreshToken and store it in DB
export const createRefreshToken = (refreshToken) => {
	return prisma.refreshToken.create({
		data: refreshToken
	});
};

// get refreshToken from DB
export const getRefreshTokenByToken = (token) => {
	return prisma.refreshToken.findUnique({
		where: {
			token
		}
	});
};
