"use client";
import { HSLPicker } from "./components/HSLPicker";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClipboardCopy, Check, ChevronDown } from "lucide-react";
import { RGBPicker } from "./components/RGBPicker";
import { toHex, HEXtoRGB, HEXtoHSL } from "./components/ColorConversions";
import * as font from "@/app/fonts";

export default function Home() {
	const [CurrentColor, setCurrentColor] = useState<string>(``);
	const [PickerType, setPickerType] = useState<string>("HSL");
	const [copied, setCopied] = useState<boolean>(false);
	const [CurrentColorHex, setCurrentColorHex] = useState<string>("");
	const [ColorType, setColorType] = useState<string>("");
	const [ConvertedColor, setConvertedColor] = useState<string>(CurrentColor);
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const handleColorChange = useCallback((color: string) => {
		setCurrentColor(color);
	}, []);

	useEffect(() => {
		setCurrentColor(
			`hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 100)}%, ${Math.floor(Math.random() * 100)}%)`,
		);
	}, []);

	useEffect(() => {
		if (PickerType === "RGB") setCurrentColor(HEXtoRGB(CurrentColorHex));
		if (PickerType === "HSL") setCurrentColor(HEXtoHSL(CurrentColorHex));
	}, [PickerType]);

	useEffect(() => {
		const hex = toHex(CurrentColor);
		setCurrentColorHex(hex);

		switch (ColorType.toUpperCase()) {
			case PickerType.toUpperCase():
				setConvertedColor(CurrentColor);
				break;

			case "RGB":
				const rgb = HEXtoRGB(hex);
				setConvertedColor(rgb);
				break;

			case "HSL":
				setConvertedColor(HEXtoHSL(hex));
				break;

			default:
				setConvertedColor(CurrentColor);
				break;
		}
	}, [CurrentColor, ColorType, PickerType]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setFilterOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const Picker = (val: string) => {
		switch (val) {
			case "HSL":
				return (
					<HSLPicker
						OnColorChange={handleColorChange}
						CurrentColor={HEXtoHSL(CurrentColorHex)}
						key={"hsl"}
					/>
				);

			case "RGB":
				return (
					<RGBPicker
						OnColorChange={handleColorChange}
						CurrentColor={HEXtoRGB(CurrentColorHex)}
						key={"rgb"}
					/>
				);

			default:
				break;
		}
	};

	return (
		<div className="relative flex flex-col text-foreground justify-center min-h-screen w-full items-center font-bold gap-10 bg-[#0b0b10] overflow-hidden">
			<div className="ambient" aria-hidden="true">
				<div className="blob b1"></div>
				<div className="blob b2"></div>
				<div className="blob b3"></div>
				<div className="blob b4"></div>
				<div className="scanlines"></div>
				<div className="grain"></div>
			</div>

			<div className="relative z-10 flex flex-col w-full text-center items-center">
				<div className="flex flex-row gap-4">
					<input
						type="radio"
						name="ColorType"
						id="HSL"
						placeholder="HSL"
						onChange={() => {
							setPickerType("HSL");
						}}
						defaultChecked
					/>
					<label htmlFor="HSL">HSL</label>

					<input
						type="radio"
						name="ColorType"
						id="RGB"
						onChange={() => {
							setPickerType("RGB");
						}}
					/>
					<label htmlFor="RGB">RGB</label>
				</div>
			</div>

			<div className="relative z-10 w-full flex flex-col justify-center items-center text-center gap-12">
				<div className="flex flex-row gap-20 h-80 items-center">
					<div className="flex flex-col items-center justify-center gap-5">
						<div
							className="w-60 h-60 rounded-3xl"
							style={{
								backgroundColor: CurrentColor,
								boxShadow: `0 0 2px ${CurrentColor}`,
								border: `3px solid hsla(360 100% 99.9% / 0.5)`,
							}}
						></div>

						<div
							className="p-3 rounded-2xl flex flex-row gap-5 text-center justify-center w-80 transition"
							style={{ backgroundColor: "hsla(0 0% 0% / 0.5)" }}
						>
							<span className="transition">{CurrentColorHex}</span>
							<span className="flex items-center justify-center">
								<ClipboardCopy
									size={20}
									height={20}
									className="cursor-pointer"
									onClick={(e) => {
										navigator.clipboard.writeText(CurrentColorHex);
										const icon = e.currentTarget;
										const check = icon.nextElementSibling as HTMLElement;
										const wrapper = icon.closest<HTMLElement>(".rounded-2xl")!;

										icon.style.display = "none";
										check.style.display = "block";
										wrapper.classList.add("text-green-400");

										setTimeout(() => {
											icon.style.display = "block";
											check.style.display = "none";
											wrapper.classList.remove("text-green-400");
										}, 3000);
									}}
								/>
								<Check
									size={20}
									height={20}
									className="cursor-pointer"
									style={{ display: "none" }}
								/>
							</span>
						</div>
					</div>

					<div>{Picker(PickerType)}</div>
				</div>

				<div
					className={`p-3 rounded-2xl flex flex-row gap-5 text-center items-center w-110 transform transition ${copied ? "text-green-400 [-webkit-text-stroke: 1px black] " : ""} `}
					style={{
						backgroundColor: `hsla(0 0% 0% / 0.3)`,
					}}
				>
					<div ref={containerRef} className="relative mr-auto">
						<button
							onClick={() => setFilterOpen(!filterOpen)}
							className={`
							${font.nunito.className}
							flex items-center gap-2
							px-4 py-2 rounded-lg
							bg-[#00000000]/60
							hover:bg-[#ffffff]/10
							transition text-sm
						`}
						>
							<span
								className={
									filterOpen ? "text-[#ffffff]/80" : "text-[#ffffff]/60"
								}
							>
								{ColorType ? ColorType.toUpperCase() : PickerType.toUpperCase()}
							</span>
							<ChevronDown
								className={`w-4 h-4 transition-transform text-[#ffff] ${filterOpen ? "rotate-180" : ""}`}
							/>
						</button>

						{filterOpen && (
							<div className="absolute top-full left-0 mt-2 w-44 bg-[#000000]/90 rounded-xl shadow-md  z-99">
								<ul className="py-1 text-sm text-[#ffff] text-center p-1">
									<li
										className="px-4 py-2 hover:bg-[#ffff]/10 cursor-pointer transition"
										onClick={() => {
											setColorType("HSL");
											setFilterOpen(false);
										}}
									>
										HSL
									</li>

									<li
										className="px-4 py-2 hover:bg-[#ffff]/10 cursor-pointer transition"
										onClick={() => {
											setColorType("RGB");
											setFilterOpen(false);
										}}
									>
										RGB
									</li>
								</ul>
							</div>
						)}
					</div>

					<div
						className={`transition h-full tracking-wider ${font.comfortaa.className}`}
					>
						{ConvertedColor}
					</div>

					<div className="ml-auto">
						{copied ? (
							<Check
								size={20}
								height={20}
								onClick={() => {
									navigator.clipboard.writeText(ConvertedColor);
								}}
								className="text-center justify-center flex cursor-pointer animate-[ScaleUp_0.1s_ease-in-out] "
							/>
						) : (
							<ClipboardCopy
								size={20}
								height={20}
								onClick={() => {
									navigator.clipboard.writeText(ConvertedColor);
									setCopied(true);

									setTimeout(() => {
										setCopied(false);
									}, 3000);
								}}
								className="text-center justify-center flex cursor-pointer animate-[ScaleUp_0.1s_ease-in-out]"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
