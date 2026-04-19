import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "ColorChooser",
		template: "%s | RK",
	},
	description:
		"ColorChooser is a lightweight web app for generating and copying CSS color strings with live preview.",
	keywords: [
		"RK",
		"Ritesh Kharal",
		"ColorChooser",
		"color picker",
		"color chooser",
		"HSL picker",
		"RGB picker",
		"hsla",
		"rgba",
		"CSS color",
		"color preview",
		"copy color string",
		"developer tool",
		"designer tool",
		"Next.js",
		"Next.js 16",
		"React",
		"React 19",
		"TypeScript",
		"Tailwind CSS",
		"PostCSS",
		"ESLint",
		"Lucide React",
	],
	authors: [{ name: "RK" }],
	creator: "RK",
	publisher: "RK",
	metadataBase: new URL("https://ColorChooser.vercel.app"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "ColorChooser",
		description:
			"ColorChooser is a lightweight web app for generating and copying CSS color strings with live preview.",
		url: "https://ColorChooser.vercel.app",
		siteName: "ColorChooser",
		images: [
			{
				url: "/ColorChooserIcon.ico",
				alt: "ColorChooser logo",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "ColorChooser",
		description:
			"ColorChooser is a lightweight web app for generating and copying CSS color strings with live preview.",
		images: ["/ColorChooserIcon.ico"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	icons: {
		icon: "/ColorChooserIcon.ico",
		shortcut: "/ColorChooserIcon.ico", // browser shortcut
		apple: "/ColorChooserIcon.ico", // Apple touch icon
		other: [
			{
				rel: "mask-icon",
				url: "/ColorChooserIcon.ico",
				color: "#5bbad5",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			data-scroll-behavior="smooth"
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
