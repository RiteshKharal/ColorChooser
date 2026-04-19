import { X, Copy, Check } from "lucide-react";
import React, { useState } from "react";
import { HEXtoHSL, HEXtoHWB, HEXtoRGB } from "./ColorConversions";
import * as font from "@/app/fonts";

function ColorRow({ label, value }: { label: string; value: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(value);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div
			onClick={handleCopy}
			className="group flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-150 border border-white/8 hover:border-white/20"
		>
			<span className="text-white/40 text-xs font-semibold tracking-widest uppercase">
				{label}
			</span>
			<div className="flex items-center gap-2">
				<span
					className={`text-sm text-white/90 font-mono ${font.nunito.className}`}
				>
					{value}
				</span>
				<span className="text-white/30 group-hover:text-white/70 transition-colors">
					{copied ? (
						<Check size={13} className="text-emerald-400" />
					) : (
						<Copy size={13} />
					)}
				</span>
			</div>
		</div>
	);
}

export function ColorCard({
	color,
	onClose,
}: {
	color: string;
	onClose: () => void;
}) {
	const rgb = HEXtoRGB(color);
	const hsl = HEXtoHSL(color);
	const hwb = HEXtoHWB(color);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/6"
			onClick={(e) => e.target === e.currentTarget && onClose()}
		>
			<div
				className={`relative w-100 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#111113] ${font.nunito.className} animate-[ScaleUp_0.08s_ease-in]`}
			>
				<div
					className="relative w-full h-44 mb-5"
					style={{ backgroundColor: color }}
				>
					<div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#111113] to-transparent" />

					<button
						onClick={onClose}
						className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white transition-all"
					>
						<X size={15} />
					</button>

					<span className="absolute bottom-5 left-5 text-white text-xl font-bold tracking-wider drop-shadow-md font-mono">
						{color.toUpperCase()}
					</span>
				</div>

				<div className="px-5 pb-6 pt-2 flex flex-col gap-2">
					<ColorRow label="HEX" value={color.toUpperCase()} />
					<ColorRow label="RGB" value={rgb} />
					<ColorRow label="HSL" value={hsl} />
					<ColorRow label="HWB" value={hwb} />
				</div>
			</div>
		</div>
	);
}
