import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Image Gallery",
	description: "Xplore the wonders of Photography",
};
/**
 * Renders the side menu component.
 *
 * @return {JSX.Element} The rendered side menu.
 */

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark">
			<body className={inter.className}>
				<div className="flex">
					<NextAuthProvider>
						<div className="w-full">{children}</div>
					</NextAuthProvider>
				</div>
			</body>
		</html>
	);
}
