import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CloudImages } from "@/components/cloud-images";
import { SearchResult } from "@/app/gallery/page";

export function SortableItem(props: any) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			style={{ touchAction: "none", ...style }}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
		>
			<CloudImages
				width="400"
				height="400"
				alt="image"
				src={props.value}
				imagedata={props.imagedata}
				tags={props.tags}
			/>
		</div>
	);
}
