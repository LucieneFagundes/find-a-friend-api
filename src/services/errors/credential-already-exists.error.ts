export class CredentialAlreadyExistsError extends Error {
	constructor(credential: string) {
		super(`${credential} already exists.`);
	}
}
