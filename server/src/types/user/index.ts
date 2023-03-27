import { z } from 'zod';
import { ProfileSchema, SessionSchema, UserSchema } from '../../generated/zod';

export const AuthMutationOutput = z.object({
	user: UserSchema,
	profile: ProfileSchema.optional().nullable(),
	token: z.string(),
	session: SessionSchema,
});

export const RegisterMutationInput = z.object({
	email: z.string().nonempty(),
	password: z.string().min(8),
});

export const LoginMutationInput = z.object({
	email: z.string().nonempty(),
	password: z.string().min(8),
});

export const MeQueryInput = z.object({
	profile: z.boolean().optional().nullable().default(false),
	session: z.boolean().optional().nullable().default(false),
});
