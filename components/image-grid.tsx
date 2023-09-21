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
	DragOverlay,
	UniqueIdentifier,
	DragStartEvent,
	DragEndEvent,
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
		console.log(filteredImages, "================", filtered);
	}, [tagName, images]);

	return (
		<section>
			<div className="flex gap-2 max-sm:flex-col mb-8">
				<Input
					id="tag-name"
					value={tagName}
					onChange={(e) => setTagName(e.target.value)}
				/>
			</div>

			<DndContext
				onDragEnd={handleDragEnd}
				sensors={sensors}
				collisionDetection={closestCenter}
			>
				<SortableContext items={items} strategy={rectSortingStrategy}>
					<div className="flex flex-col items-center w-full sm:grid sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 sm:gap-6">
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
								imagedata={filtered?.length ? filtered[i] : images && images[i]}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</section>
	);
}
