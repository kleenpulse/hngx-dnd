// @ts-nocheck

"use client";
import ForceRefresh from "@/components/force-refresh";
import { Button } from "@/components/ui/button";
import { buttonFilters } from "@/lib/edit-menu";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingAnimation from "@/components/LoadingAnimation";
import Link from "next/link";

export default function EditPage({
	searchParams: { publicId },
}: {
	searchParams: { publicId: string };
}) {
	const [transformation, setTransformation] = useState("");
	const [prompt, setPrompt] = useState("");
	const [pendingPrompt, setPendingPrompt] = useState("");
	const [isInput, setIsInput] = useState(false);
	// set state for custom height and width
	const [customHeight, setCustomHeight] = useState("3146");
	const [customWidth, setCustomWidth] = useState("2752");
	const [isTransform, setIsTransform] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	return (
		<section>
			<ForceRefresh />
			<div className="flex flex-col gap-8 pb-8">
				<div className="flex justify-between mt-3 px-2">
					<h1 className="sm:text-3xl text-sm font-bold uppercase">
						Edit:{" "}
						<span className="text-cyan-300">
							{publicId.replace(/\/.*/, "")}
						</span>
					</h1>
					<Link
						href={"/gallery?path=gallery"}
						className="bg-yellow-300 text-black font-medium hover:bg-yellow-400 flex justify-center items-center px-1 rounded-xl"
					>
						← Back
					</Link>
				</div>
				<div className="flex flex-wrap gap-4 pl-4">
					<div className="flex flex-col gap-4">
						<Button
							onClick={() => setIsInput(!isInput)}
							className="bg-cyan-300 text-black"
						>
							Generative Fill
						</Button>
						{isInput && (
							<>
								<Label htmlFor="prompt">Prompt</Label>
								<Input
									id="prompt"
									autoComplete="off"
									placeholder="What do you want to see?"
									value={pendingPrompt}
									onChange={(e) => setPendingPrompt(e.target.value)}
								/>
								<Input
									id="height"
									autoComplete="off"
									placeholder="Custom Height"
									value={customHeight}
									onChange={(e) => setCustomHeight(e.target.value)}
								/>
								<Input
									id="width"
									autoComplete="off"
									placeholder="custom Width"
									value={customWidth}
									onChange={(e) => setCustomWidth(e.target.value)}
								/>
								<Button
									onClick={() => {
										setIsLoading(true);
										setTransformation("generative-fill");
										setIsInput(false);
										setPrompt(pendingPrompt);
										setPendingPrompt("");
									}}
								>
									Generate
								</Button>
							</>
						)}
					</div>
					{buttonFilters.map((btn) => (
						<Button
							onClick={() => setTransformation(btn.action)}
							className={`text-black ${btn.bgColor} max-sm:p-2`}
							key={btn.label}
						>
							{btn.label}
						</Button>
					))}
				</div>
				<div className="grid sm:grid-cols-2 gap-12 relative sm:pl-4 max-sm:px-3">
					<div>
						<p>Original</p>
						<CldImage
							src={publicId}
							alt="Image"
							className="rounded-2xl"
							width="1000"
							height="1000"
						/>
					</div>
					<div>
						{isTransform && <p>Transformed</p>}
						{isLoading && (
							<div className="flex justify-center items-center flex-col">
								<LoadingAnimation />
								<div className="animate-blink">
									<p className=" mt-4 text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-fit text-transparent bg-clip-text ">
										Loading...
									</p>
								</div>
							</div>
						)}

						{transformation === "generative-fill" && (
							<CldImage
								src={publicId}
								alt="Image"
								className="rounded-2xl"
								width={customWidth}
								height={customHeight}
								crop="pad"
								fillBackground={{ prompt }}
								onLoadingComplete={() => {
									setIsLoading(false);
									setIsTransform(true);
								}}
							/>
						)}
						{transformation === "blur" && (
							<CldImage
								src={publicId}
								alt="Image"
								className="rounded-2xl"
								width="2500"
								height="2500"
								blur="800"
								onLoadingComplete={() => {
									setIsLoading(false);
									setIsTransform(true);
								}}
							/>
						)}
						{transformation === "grayscale" && (
							<CldImage
								src={publicId}
								alt="Image"
								className="rounded-2xl"
								width="2500"
								height="2500"
								grayscale
								onLoadingComplete={() => {
									setIsLoading(false);
									setIsTransform(true);
								}}
							/>
						)}
						{transformation === "zoom" && (
							<CldImage
								src={publicId}
								alt="Image"
								className="rounded-2xl"
								width="2500"
								height="2500"
								zoompan
								onLoadingComplete={() => {
									setIsLoading(false);
									setIsTransform(true);
								}}
							/>
						)}

						{transformation === "removeBackground" && (
							<CldImage
								src={publicId}
								alt="Image"
								className="rounded-2xl"
								width="1500"
								height="1500"
								removeBackground
								onLoadingComplete={() => {
									setIsLoading(false);
									setIsTransform(true);
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
