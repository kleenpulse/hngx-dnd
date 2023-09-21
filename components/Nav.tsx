"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import logo from "../public/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { UploadBtn } from "./upload-btn";
import { useRouter } from "next/navigation";

export default function Nav({ path }: { path?: string }) {
	const [isXP, setIsXP] = useState(true);
	const [showXP, setshowXP] = useState(path === "gallery");
	const router = useRouter();
	return (
		<div className=" flex w-full container mx-auto sm:px-8 relative">
			<div className="flex h-16 lg:h-20 items-center px-4   justify-between w-full fixed top-0 left-0 border-b z-[99999] backdrop-blur-xl">
				<div className="flex">
					<Link
						href="/gallery?path=gallery"
						className="max-sm:hidden  p-1 rounded-xl bg-emerald-400 font-medium text-black hover:bg-emerald-500"
					>
						Image Gallery
					</Link>
					<Link href={"/gallery?path=gallery"}>
						<Image
							src={logo}
							alt="Logo"
							width={100}
							height={100}
							className="sm:hidden object-contain h-10 w-10 invert"
						/>
					</Link>
				</div>
				<div className="flex gap-4  ">
					<div className="flex cursor-pointer" onClick={() => setIsXP(!isXP)}>
						<p
							className={` border border-rose-500 flex items-center cursor-pointer bg-[var(--submit)] uppercase text-lg text-white font-bold submit-btn p-1 m-4 ${
								!isXP || !showXP ? "hidden" : ""
							}`}
						>
							Experimental
						</p>
						<div
							className={`${!isXP ? "flex flex-col items-center" : "hidden"}`}
						>
							<UploadBtn />
							<p className="experimental text-sm ml-2">refresh after upload</p>
						</div>
					</div>
				</div>
				<div className=" flex items-center space-x-4">
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</div>
	);
}
