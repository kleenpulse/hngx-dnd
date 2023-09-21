//@ts-nocheck
"use client";
import { SearchResult } from "@/app/gallery/page";

import { CloudImages } from "./cloud-images";
import { useState } from "react";
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

export function ImageGrid({ images }: { images?: SearchResult[] }) {
	const initialItems = createRange<{ id: number; value: string }>(
		images.length,
		(index) => ({
			id: index + 1,
			index: index + 1,
			value: images[index].public_id,
		})
	);
	const [items, setItems] = useState(initialItems);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	function handleDragEnd(event) {
		const { active, over } = event;

		if (active.id !== over.id) {
			setItems((items) => {
				const oldIndex = items.findIndex((item) => item.id === active.id);
				const newIndex = items.findIndex((item) => item.id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}

	return (
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
							tags={images[i].tags}
							imagedata={images[i]}
						/>
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
}
