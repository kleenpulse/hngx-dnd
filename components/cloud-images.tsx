//@ts-nocheck
"use client";

import { CldImage } from "next-cloudinary";

import { useState, useTransition } from "react";
import { SearchResult } from "../app/gallery/page";
import { ImageMenu } from "./image-menu";
import LoadingAnimation from "./LoadingAnimation";

export const CloudImages = (
	props: {
		imagedata: SearchResult;
		tags: string[];
	} & React.ComponentProps<typeof CldImage>
) => {
	const [, startTransition] = useTransition();
	const [imgLoading, setImgLoading] = useState(false);

	return (
		<div className="relative flex flex-col h-[300px] w-[300px] xl:h-[400px]  xl:w-[400px] bg-white/25 rounded-xl sm:h-[270px] sm:w-[270px]">
			{imgLoading && (
				<div className="w-full h-full flex items-center justify-center flex-col">
					<LoadingAnimation />
					<h1 className="mt-3">Loading Image</h1>
				</div>
			)}
			<CldImage
				{...props}
				loading="eager"
				priority
				className="object-cover select-none absolute top-0 left-0 w-full h-full rounded-xl"
				onLoadingComplete={() => setImgLoading(false)}
			/>
			{!imgLoading && (
				<div className="absolute bottom-0 left-0 flex items-center  tags w-full">
					<p className="m-1 flex gap-3 w-full flex-wrap ">
						{props.tags.slice(0, 4).map((tag, i) => (
							<span
								className="border border-gray-300 text-gray-300 p-1 py-0 lg:text-sm text-[10px]"
								key={props.tags + i}
							>
								{tag}
							</span>
						))}
					</p>
				</div>
			)}
			<div className="absolute top-2 left-2">
				<ImageMenu image={props.imagedata} />
			</div>
		</div>
	);
};
