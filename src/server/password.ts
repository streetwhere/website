import { hash as argonHash, verify } from '@node-rs/argon2'

const MEMORY_COST = 19456
const TIME_COST = 2
const OUTPUT_LENGHT = 32
const PARALLELISM = 1

export async function hash(password: string) {
	return argonHash(password, {
		memoryCost: MEMORY_COST,
		timeCost: TIME_COST,
		outputLen: OUTPUT_LENGHT,
		parallelism: PARALLELISM,
	})
}

export async function compare(password: string, hash: string) {
	return verify(hash, password, {
		memoryCost: MEMORY_COST,
		timeCost: TIME_COST,
		outputLen: OUTPUT_LENGHT,
		parallelism: PARALLELISM,
	})
}
