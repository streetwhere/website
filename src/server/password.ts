import { pbkdf2Sync, randomBytes } from "node:crypto";

const SALT_LENGTH = 64;
const ITERATIONS = 100000;

export function hashPassword(password: string, salt?: string) {
	return pbkdf2Sync(
		password,
		salt ?? createSalt(),
		ITERATIONS,
		SALT_LENGTH,
		"SHA512",
	).toString("hex");
}

export function comparePassword(
	password: string,
	hash: string,
	salt: string,
): boolean {
	return hash === hashPassword(password, salt);
}

function createSalt(): string {
	return randomBytes(SALT_LENGTH).toString("hex");
}
