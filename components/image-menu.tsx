"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MenuIcon from "./icons/MenuIcon";

import { SearchResult } from "@/app/gallery/page";
import { useState } from "react";
import Link from "next/link";
import { PencilIcon } from "lucide-react";

export function ImageMenu({ image }: { image: SearchResult }) {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" className="w-8 h-8 p-0">
						<MenuIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-[120px] sm:w-[165px] rounded-xl">
					<DropdownMenuItem asChild>
						<Link
							className="cursor-pointer hover:bg-secondary/80 rounded-xl  "
							href={`/edit?publicId=${encodeURIComponent(image.public_id)}`}
						>
							<PencilIcon className="pl-1 ml-1 sm:w-6 sm:h-6 mr-3 w-4 h-4 " />{" "}
							Edit Image
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
