export interface Organization {
	id?: string;
  name: string;
	email: string;
	password: string;
	telephone: string;
  address: {
		street: String;
		neighborhood: String;
		city: String;
		zip_code: String;
	}
}