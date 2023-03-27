import { createHash } from 'crypto';
export async function hashPassword(raw: string) {
	return createHash('sha256').update(raw, 'utf-8').digest('hex');
}
export async function verifyPassword(hash: string, raw: string) {
	return createHash('sha256').update(raw, 'utf-8').digest('hex') == hash;
}
