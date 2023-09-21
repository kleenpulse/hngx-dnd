"use client";

import { useSession } from "next-auth/react";

export const User = () => {
	const { data: session, status: authenticate } = useSession();
	const userSession = session?.user;

	return (
		<>
			<h1>Client Session</h1>
			<p>{userSession?.name}</p>
			<p>{userSession?.email}</p>
			<p>{authenticate}</p>
		</>
	);
};
