// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { UploadResult } from "../app/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const UploadBtn = () => {
	const router = useRouter();
	const [shouldRefresh, setShouldRefresh] = useState(false);

	// Use useEffect to trigger the refresh with a delay
	useEffect(() => {
		if (shouldRefresh) {
			const timeoutId = setTimeout(() => {
				router.refresh();
			}, 2000); // You can adjust the delay duration as needed

			// Clear the timeout if the component unmounts
			return () => clearTimeout(timeoutId);
		}
	}, [shouldRefresh, router]);

	return (
		<Button asChild className="rounded" size={"sm"}>
			<CldUploadButton
				uploadPreset="qgxaf2uh"
				// onUpload={(result: UploadResult) => {
				// 	router.refresh();
				// }}
				onClose={() => {
					setShouldRefresh(true); // Set a flag to trigger the refresh
				}}
				onPublicId={(result: UploadResult) => {
					setShouldRefresh(true);
				}}
			>
				<div className="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
						/>
					</svg>
					<span>Upload</span>
				</div>
			</CldUploadButton>
		</Button>
	);
};
