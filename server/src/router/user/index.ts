import {
	publicProcedure,
	createTRPCRouter,
	protectedProcedure,
} from '../../trpc';
import { hashPassword, verifyPassword } from '../../util/password';
import {
	RegisterMutationInput,
	AuthMutationOutput,
	LoginMutationInput,
	MeQueryInput,
	FieldErrorItem,
} from '../../types';
import { TRPCError } from '@trpc/server';
import { genToken, getExpiryAt } from '../../util/token';

export const UserRouter = createTRPCRouter({
	register: publicProcedure
		.input(RegisterMutationInput)
		.output(AuthMutationOutput)
		.mutation(async ({ ctx, input }) => {
			if (
				await ctx.prisma.user.findUnique({
					where: {
						email: input.email,
					},
				})
			) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'User email already',
					cause: new FieldErrorItem('email', 'email already').toFieldError(),
				});
			}
			const user = await ctx.prisma.user.create({
				data: {
					email: input.email,
					password: await hashPassword(input.password),
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

			const expiryAt = getExpiryAt();

			const session = await ctx.prisma.session.create({
				data: {
					userId: user.id,
					expiryAt,
				},
			});

			return { user, profile, token: genToken(session.id), session };
		}),
	login: publicProcedure
		.input(LoginMutationInput)
		.output(AuthMutationOutput)
		.mutation(async ({ ctx, input }) => {
			const user = await ctx.prisma.user.findUnique({
				where: {
					email: input.email,
				},
				include: {
					profile: true,
				},
			});
			if (!user) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'User not found',
					cause: new FieldErrorItem('email', 'user not found').toFieldError(),
				});
			}
			if (!(await verifyPassword(user.password, input.password))) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Password not match',
					cause: new FieldErrorItem(
						'email',
						'password incorrect'
					).toFieldError(),
				});
			}
			const expiryAt = getExpiryAt();

			const session = await ctx.prisma.session.create({
				data: {
					userId: user.id,
					expiryAt,
				},
			});
			return {
				user,
				profile: user.profile,
				token: genToken(session.id),
				session,
			};
		}),
	me: protectedProcedure.input(MeQueryInput).query(async ({ ctx, input }) => {
		return await ctx.prisma.user.findUnique({
			where: {
				id: ctx.session.userId,
			},
			include: {
				session: input.session
					? {
							where: {
								id: ctx.session.id,
							},
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  }
					: false,
				profile: input.profile || false,
			},
		});
	}),
});
