"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, RefreshCw, Copy, Check, LockKeyhole } from "lucide-react";
import { RandomHEX } from "../components/ColorConversions";
import { useRouter } from "next/navigation";
import * as font from "@/app/fonts";

export default function Page() {
	const router = useRouter();
	const [ColorLength, setColorLength] = useState<number>(5);
	const [colors, setColors] = useState<string[]>([]);
	const [copied, setCopied] = useState<number | null>(null);
	const [locked, setLocked] = useState<number[]>([]);

	const regenerate = () =>
		setColors(
			Array.from({ length: 5 }, (v, i) => {
				if (!locked.includes(i)) {
					return RandomHEX();
				} else {
					return colors[i];
				}
			}),
		);

	const copyColor = (val: string, i: number) => {
		navigator.clipboard.writeText(val);
		setCopied(i);
		setTimeout(() => setCopied(null), 1500);
	};

	useEffect(() => {
		setColors(Array.from({ length: 5 }, () => RandomHEX()));

		const handler = (ev: KeyboardEvent) => {
			if (ev.key === " ") regenerate();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="relative flex flex-col min-h-screen w-full bg-[#0b0b10] overflow-hidden font-mono">
			<div className="ambient" aria-hidden="true">
				<div className="blob b1" />
				<div className="blob b2" />
				<div className="blob b3" />
				<div className="blob b4" />
				<div className="scanlines" />
				<div className="grain" />
			</div>

			{/* Header */}
			<header className="relative z-10 flex items-center justify-between px-6 py-5">
				<button
					onClick={() => router.back()}
					className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm tracking-widest uppercase"
				>
					<ArrowLeft size={16} /> Back
				</button>

				<button
					onClick={regenerate}
					className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm tracking-widest uppercase"
				>
					<RefreshCw size={14} /> Regenerate
				</button>
			</header>

			<div className="relative z-10 px-6 pb-6 flex justify-between">
				<div>
					<p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-1">
						Random Palette
					</p>

					<div className="flex flex-row text-white text-3xl font-bold gap-5">
						<h1 className="">{colors.length}</h1>
						<label htmlFor="clrlegth">Colors</label>
					</div>
				</div>

				<div className="">
					<section className="opacity-70">
						Click <span className="font-bold">Space</span> to regenerate!
					</section>
				</div>
			</div>

			<div
				className="relative z-10 flex flex-row flex-1 min-h-0 mx-6 mb-6 rounded-2xl overflow-hidden shadow-2xl"
				style={{ height: "60vh" }}
			>
				{colors.map((color, i) => (
					<div
						key={i}
						className="relative flex-1 group cursor-pointer transition-all duration-200 hover:flex-2 text-center justify-center place-items-center"
						style={{ backgroundColor: color }}
						onClick={() => copyColor(color, i)}
					>
						<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

						<div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-black/40 backdrop-blur-sm">
							<p className="text-white text-xs font-bold tracking-widest uppercase">
								{color}
							</p>
						</div>

						<div className="flex flex-col w-full h-full text-center justify-center invisible group-hover:visible font-bold place-items-center gap-5">
							<section
								className={`[-webkit-text-stroke:0.09px_black] font-bold tracking-wider  bg-black/20 w-fit rounded-xl text-xl p-2 ${font.exo2.className}`}
							>
								{color}
							</section>

							<section className="">
								<LockKeyhole />
							</section>
						</div>

						<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							{copied === i ? (
								<Check size={14} className="text-white" />
							) : (
								<Copy size={14} className="text-white/80" />
							)}
						</div>
					</div>
				))}
			</div>

			<div className="relative z-10 flex flex-row gap-0 px-6 mb-10">
				{colors.map((val, i) => (
					<div key={i} className="flex-1 text-center">
						<div
							className="w-4 h-4 rounded-full mx-auto mb-2"
							style={{ backgroundColor: val }}
						/>
						<p className="text-white/40 text-[10px] tracking-wider uppercase">
							{val}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
