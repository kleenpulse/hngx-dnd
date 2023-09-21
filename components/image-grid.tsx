"use client";
import { SearchResult } from "@/app/gallery/page";

import { CloudImages } from "./cloud-images";
import { useEffect, useState } from "react";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/lib/SortableItem";
import { createRange } from "@/lib/createRange";
import { Input } from "./ui/input";
import { ErrorImage } from "./errors/ErrorImage";

export function ImageGrid({ images }: { images?: SearchResult[] }) {
	const [tagName, setTagName] = useState("");
	const [filtered, setFiltered] = useState<SearchResult[] | undefined>([]);
	const initialItems = createRange<{ id: number; value: string }>(
		(images?.length && images.length) || 0,
		(index) => ({
			id: index + 1,
			index: index + 1,
			value: images?.length && images[index].public_id,
		})
	);
	const [items, setItems] = useState(initialItems);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	function handleDragEnd(event: any) {
		const { active, over } = event;

		if (active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}

	useEffect(() => {
		// Filter images based on the tagName
		const filteredImages = images?.filter((image) =>
			image.tags?.includes(tagName)
		);

		// Create initial items from the filtered images
		const filtered = createRange(
			(filteredImages?.length && filteredImages.length) || images?.length || 0,
			(index) => ({
				id: index + 1,
				index: index + 1,
				value: filteredImages?.length
					? filteredImages[index].public_id
					: (images && images[index].public_id) || "",
			})
		);
		//@ts-ignore
		setItems(filtered);
		setFiltered(filteredImages);
	}, [tagName, images]);

	return (
		<section>
			<div className="flex mb-8">
				<Input
					id="tag-name"
					value={tagName}
					onChange={(e) => {
						// Use a regular expression to allow only letters (a-z and A-Z) and spaces
						const newValue = e.target.value
							.replace(/[^a-zA-Z ]/g, "")
							.toLowerCase()
							.trim();
						setTagName(newValue);
					}}
					placeholder="Search by #tag..."
				/>
			</div>
			{tagName.length > 2 &&
			!images?.some((image) => image.tags?.includes(tagName)) ? (
				<div>
					<ErrorImage tagName={tagName} reset={setTagName} />
					<div className="flex flex-col items-center sm:hidden w-full justify-center mt-6">
						<p>
							Image with tag{" "}
							<span className="text-cyan-400 font-bold mx-3"> #{tagName} </span>{" "}
							not found
						</p>
						<button
							className="rounded-xl p-1 mt-5 border border-gray-200"
							onClick={() => setTagName("")}
						>
							Clear search?
						</button>
					</div>
				</div>
			) : (
				<DndContext
					onDragEnd={handleDragEnd}
					sensors={sensors}
					collisionDetection={closestCenter}
				>
					<SortableContext items={items} strategy={rectSortingStrategy}>
						<div className="flex flex-col items-center w-full sm:grid sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 sm:gap-6 overflow-hidden sm:place-items-center pt-3">
							{items.map(({ id, value }, i) => (
								<SortableItem
									key={id}
									id={id}
									value={value}
									tags={
										filtered?.length
											? filtered[i]?.tags
											: images && images[i]?.tags
									}
									imagedata={
										filtered?.length ? filtered[i] : images && images[i]
									}
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
			)}
		</section>
	);
}
