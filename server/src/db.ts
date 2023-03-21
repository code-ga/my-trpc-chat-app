import { PrismaClient } from '@prisma/client';
const globals = globalThis as unknown as typeof globalThis & {
	prisma?: PrismaClient;
};
function GetPrismaClient() {
	const prisma = new PrismaClient();

	prisma.$use(async (params, next) => {
		if (params.model == 'Session' && params.action.startsWith('find')) {
			const sessions = await prisma.session.findMany({});
			for (const session of sessions) {
				const expiryAt = new Date(session.createdAt).getTime();
				
			}
		}
		// Manipulate params here
		const result = await next(params);
		// See results here
		return result;
	});
	return prisma;
}
if (!globals.prisma) {
	globals.prisma = GetPrismaClient();
}
export const prisma = globals.prisma || GetPrismaClient();
