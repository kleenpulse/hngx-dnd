import { LoginButton } from "@/components/buttons.components";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await getServerSession(authOptions);
	if (session) {
		return redirect("/gallery?path=gallery");
	}
	return (
		<>
			<main className="flex min-h-screen items-center justify-center p-4 w-full  relative">
				<div className="absolute top-0 w-full flex justify-center">
					<p className="bg-gradient-to-r from-[#0ff] via-yellow-500 to-[#ff00b7] bg-clip-text text-transparent uppercase  text-3xl sm:text-5xl font-bold mt-2 sm:h-[70px]">
						Image gallery
					</p>
				</div>
				<div className="flex flex-col items-center gap-16 w-ful px-4">
					<h1 className=" text-2xl sm:text-5xl font-bold h-[100px] uppercase">
						Hi there, Welcome!
					</h1>
					<LoginButton />
				</div>
			</main>
		</>
	);
}
