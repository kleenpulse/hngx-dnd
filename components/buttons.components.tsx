"use client";

import { signIn, signOut } from "next-auth/react";

import { redirect } from "next/navigation";

export const LoginButton = () => {
	return (
		<button
			className="
						bg-cyan-400 uppercase text-lg sm:text-xl text-white font-bold submit-btn w-full py-[10px]"
			onClick={() =>
				signIn(undefined, { callbackUrl: "/gallery?path=gallery" })
			}
		>
			Sign in
		</button>
	);
};

export const LogoutButton = () => {
	return (
		<button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
	);
};
