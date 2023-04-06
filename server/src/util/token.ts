import { PrismaClient } from '@prisma/client';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
export const expiryAfterSecond =
	24 /* time in day */ * 60 /* min in a hour */ * 60; /* second in a min */

export function getExpiryAt() {
	const result = new Date();
	result.setSeconds(result.getSeconds() + expiryAfterSecond);

	return result;
}

export type TokenPayload = JwtPayload & { sessionID: string };

export function genToken(sessionID: string) {
	return sign({ sessionID } as TokenPayload, process.env.JWT_SECRET || '', {
		expiresIn: expiryAfterSecond,
	});
}

export async function decodeToken(token: string, prisma: PrismaClient) {
	try {
		const tokenPayload = verify(
			token,
			process.env.JWT_SECRET || ''
		) as TokenPayload;
		return await prisma.session.findUnique({
			where: {
				id: tokenPayload.sessionID,
			},
		});
	} catch (error) {
		return null;
	}
}
