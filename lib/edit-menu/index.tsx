interface ButtonProps {
	action: "blur" | "grayscale" | "zoom" | "removeBackground" | "";
	label: string;
	bgColor?: string;
}

export const buttonFilters: ButtonProps[] = [
	{
		action: "blur",
		label: "Blur",
		bgColor: "bg-pink-400",
	},
	{
		action: "grayscale",
		label: "Black and White",
		bgColor: "bg-violet-400",
	},
	{
		action: "zoom",
		label: "Zoom",
		bgColor: "bg-emerald-400",
	},
	{
		action: "removeBackground",
		label: "BG removal",
		bgColor: "bg-yellow-300/90",
	},
	{
		action: "",
		label: "Clear All",
		bgColor: "bg-red-400",
	},
];
