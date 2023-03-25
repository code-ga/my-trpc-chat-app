import { z } from 'zod';
import { publicProcedure, createTRPCRouter } from '../../trpc';
import { ProfileSchema, UserSchema } from '../../generated/zod';

export const UserRouter = createTRPCRouter({
	register: publicProcedure
		.input(
			z.object({
				email: z.string().nonempty(),
				password: z.string().min(8),
			})
		)
		.output(
			z.object({
				user: UserSchema,
				profile: ProfileSchema,
				token: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const user = await ctx.prisma.user.create({
				data: {
					email: input.email,
					password: input.password,
				},
			});

			const username = user.email.split('@')[0];
			const tag =
				(
					await ctx.prisma.profile.findMany({
						where: {
							username,
						},
					})
				).length + 1;
			const profile = await ctx.prisma.profile.create({
				data: {
					userId: user.id,
					username: username,
					bio: '',
					tag,
				},
			});
			
			

			return { user, profile, token: '' };
		}),
});
