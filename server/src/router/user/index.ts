import { z } from 'zod';
import { publicProcedure, createTRPCRouter } from '../../trpc';

export const UserRouter = createTRPCRouter({
	register: publicProcedure
		.input(
			z.object({
				email: z.string().nonempty(),
				password: z.string().min(8),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const user = await ctx.prisma.user.create({
				data: {
					email: input.email,
					password: input.password,
				},
			});
			const profile = await ctx.prisma.profile.create({
				data: {
					userId: user.id,
				},
			});

			return { user, profile };
		}),
});
