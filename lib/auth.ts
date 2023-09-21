import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const user = {
	id: "1",
	name: "Admin",
	email: "user@example.com",
	password: "1Password",
};
export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "example@example.com",
					// pattern: "user@example.com",
					title: "email must be user@example.com",
					autoComplete: "off",
				},
				password: {
					label: "Password",
					type: "password",

					// pattern: "1Password",
					title: "Password must be 1Password",
				},
			},
			async authorize(credentials) {
				if (
					credentials?.email !== user.email ||
					credentials?.password !== user.password
				) {
					return null;
				}
				return user;
			},
		}),
	],
};
