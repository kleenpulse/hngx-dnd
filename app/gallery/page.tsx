import { Metadata } from "next";

import GalleryGrid from "./gallery-grid";
import ForceRefresh from "@/components/force-refresh";
import cloudinary from "cloudinary";
import { SearchBox } from "@/components/SearchBox";
import Nav from "@/components/Nav";

import { LogoutButton } from "@/components/buttons.components";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: { path: string };
}): Promise<Metadata> {
	return {
		title: `${searchParams.path?.toUpperCase()}` || "Gallery",
	};
}

export type SearchResult = {
	public_id: string;
	tags: string[];
};

export default async function Gallery({
	searchParams: { path },
}: {
	searchParams: { path: string };
}) {
	const results = (await cloudinary.v2.search
		.expression(`resource_type:image`)

		.with_field("tags")
		.max_results(30)
		.execute()) as { resources: SearchResult[] };
	return (
		<>
			<Nav path={path} />

			<section className="mt-20 px-4">
				<ForceRefresh />
				<div className="flex flex-col gap-8 pb-8">
					<div className="flex justify-between">
						<h1 className="text-3xl font-bold">Gallery</h1>

						<div className="flex cursor-pointer bg-[var(--submit)] uppercase text-lg text-white font-bold submit-btn p-1 m-4">
							<LogoutButton />
						</div>
					</div>

					<GalleryGrid images={results?.resources} />
				</div>
			</section>
		</>
	);
}
