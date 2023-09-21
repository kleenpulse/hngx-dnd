"use client";

import { ErrorCard } from "@/components/errors/ErrorCard";

export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return <ErrorCard reset={reset} />;
}
