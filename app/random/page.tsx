"use client";

import { useEffect, useState } from "react";
import {
	ArrowLeft,
	RefreshCw,
	Copy,
	Check,
	Lock,
	LockOpen,
} from "lucide-react";
import {
	HEXtoHSL,
	HEXtoHWB,
	HEXtoRGB,
	RandomHEX,
} from "../components/ColorConversions";
import { useRouter } from "next/navigation";
import * as font from "@/app/fonts";

export default function Page() {
	const router = useRouter();
	const [ColorLength, setColorLength] = useState<number>(5);
	const [colors, setColors] = useState<string[]>([]);
	const [copied, setCopied] = useState<number | null>(null);
	const [locked, setLocked] = useState<number[]>([]);
	const [ColorType, setColorType] = useState<string>("");
	const tips = [
		"Click color to copy!",
		"Use arrow keys to increment or decrement",
	];
	const [CurrentTip, setCurrentTip] = useState<string>(
		"Use arrow keys to increment or decrement",
	);

	useEffect(() => {
		let i = 0;
		const interval = setInterval(() => {
			setCurrentTip(tips[i % tips.length]);
			i++;
		}, 5000);

		return () => clearInterval(interval); // cleanup
	}, []);

	const regenerate = (currentColors: string[], currentLocked: number[]) => {
		setColors(
			Array.from({ length: ColorLength }, (_, i) =>
				currentLocked.includes(i) ? currentColors[i] : RandomHEX(),
			),
		);
	};

	const copyColor = (val: string, i: number) => {
		navigator.clipboard.writeText(val);
		setCopied(i);
		setTimeout(() => setCopied(null), 1500);
	};

	const convertColor = (hex: string, type: string) => {
		switch (type.toUpperCase()) {
			case "RGB":
				return HEXtoRGB(hex);
			case "HSL":
				return HEXtoHSL(hex);
			case "HWB":
				return HEXtoHWB(hex);
			default:
				return hex;
		}
	};

	const toggleLock = (i: number, e: React.MouseEvent) => {
		e.stopPropagation();
		setLocked((prev) =>
			prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
		);
		(e.currentTarget as HTMLElement).blur();
	};

	useEffect(() => {
		setColors(Array.from({ length: ColorLength }, () => RandomHEX()));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handler = (ev: KeyboardEvent) => {
			if (ev.key === " ") {
				setColors((prev) =>
					Array.from({ length: ColorLength }, (_, i) =>
						locked.includes(i) ? prev[i] : RandomHEX(),
					),
				);
			}

			if (ev.key === "ArrowUp") {
				setColorLength((prev) => (prev < 9 ? prev + 1 : prev));
			}
			if (ev.key === "ArrowDown") {
				setColorLength((prev) => (prev > 2 ? prev - 1 : prev));
			}
		};

		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [locked, ColorLength]);

	useEffect(() => {
		setColors((prev) =>
			Array.from({ length: ColorLength }, (_, i) =>
				locked.includes(i) && prev[i] ? prev[i] : (prev[i] ?? RandomHEX()),
			),
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ColorLength]);

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

			<header className="relative z-10 flex items-center justify-between px-6 py-5">
				<button
					onClick={() => router.back()}
					className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm tracking-widest uppercase"
				>
					<ArrowLeft size={16} /> Back
				</button>
				<button
					onClick={() => regenerate(colors, locked)}
					className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm tracking-widest uppercase"
				>
					<RefreshCw size={14} /> Regenerate
				</button>
			</header>

			<div className="relative z-10 px-6 pb-6 flex justify-between items-end">
				<div>
					<p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-1">
						Random Palette
					</p>
					<h1 className="text-white text-3xl font-bold">
						{ColorLength} Colors
					</h1>
				</div>
				<section
					className={`opacity-60 flex gap-2 text-center justify-center mt-3 ${font.josefin.className} transform transition-all`}
				>
					<span className="font-bold">Tip: </span>
					{CurrentTip}
				</section>
				<p className="text-white/30 text-xs tracking-widest uppercase">
					Press <span className="text-white/60 font-bold">Space</span> to
					regenerate
				</p>
			</div>

			<div
				className="relative z-10 flex flex-row mx-6 mb-6 rounded-2xl overflow-hidden shadow-2xl"
				style={{ height: "69vh" }}
			>
				{colors.map((color, i) => (
					<div
						key={i}
						className="relative flex-1 group cursor-pointer transition-all duration-300 hover:flex-2"
						style={{ backgroundColor: color }}
						onClick={() => copyColor(color, i)}
					>
						<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

						{locked.includes(i) && (
							<div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full p-1.5">
								<Lock size={12} className="text-white" />
							</div>
						)}

						<div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
							{copied === i ? (
								<Check size={13} className="text-white drop-shadow" />
							) : (
								<Copy size={13} className="text-white/70 drop-shadow" />
							)}
						</div>

						<div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
							<span className="text-white text-[11px] font-bold tracking-widest uppercase bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1 w-full text-center">
								{color}
							</span>

							<button
								onClick={(e) => toggleLock(i, e)}
								className="flex items-center gap-1.5 text-[11px] text-white/80 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5 hover:bg-black/60 transition-colors w-full justify-center"
							>
								{locked.includes(i) ? (
									<>
										<Lock size={11} /> Locked
									</>
								) : (
									<>
										<LockOpen size={11} /> Lock
									</>
								)}
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="relative z-10 flex flex-row px-6 mb-10">
				{colors.map((val, i) => (
					<div key={i} className="flex-1 flex flex-col items-center gap-1.5">
						<div
							className="w-3 h-3 rounded-full ring-1 ring-white/10"
							style={{ backgroundColor: val }}
						/>
						<p className="text-white/70 text-[9px] tracking-wider uppercase">
							{val}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
