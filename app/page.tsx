"use client";
import Image from "next/image";
import { HSLPicker } from "./components/HSLPicker";
import { useEffect, useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { RGBPicker } from "./components/RGBPicker";

export default function Home() {
	const [CurrentColor, setCurrentColor] = useState<string>(`hsla(0,0%,0%,1)`);
	const [PickerType, setPickerType] = useState<string>("HSL");
	const [copied, setCopied] = useState<boolean>(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (PickerType === "RGB") setCurrentColor("rgba(0, 0, 0, 1)");
		if (PickerType === "HSL") setCurrentColor("hsla(0,0%,0%,1)");
	}, [PickerType]);

	const Picker = (val: string) => {
		switch (val) {
			case "HSL":
				return (
					<HSLPicker
						OnColorChange={(color) => {
							setCurrentColor(color);
						}}
					/>
				);

			case "RGB":
				return (
					<RGBPicker
						OnColorChange={(color) => {
							setCurrentColor(color);
						}}
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
						// value={"HSL"}
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
						// value={"HSL"}
						onChange={() => {
							setPickerType("RGB");
						}}
					/>
					<label htmlFor="RGB">RGB</label>
				</div>
			</div>

			<div className="relative z-10 w-full flex flex-col justify-center items-center text-center gap-12">
				<div className="">{Picker(PickerType)}</div>

				<div
					className={`p-3 rounded-2xl flex flex-row gap-5 text-center justify-center w-80 transform transition ${copied ? "text-green-400 [-webkit-text-stroke: 1px black] " : ""} `}
					style={{
						backgroundColor: `hsla(0 0% 0% / 0.3)`,
					}}
				>
					<span className="transition ">{CurrentColor}</span>
					<span>
						{copied ? (
							<Check
								size={20}
								height={20}
								onClick={() => {
									navigator.clipboard.writeText(CurrentColor);
								}}
								className="text-center justify-center flex cursor-pointer animate-[ScaleUp_0.1s_ease-in-out] "
							/>
						) : (
							<ClipboardCopy
								size={20}
								height={20}
								onClick={() => {
									navigator.clipboard.writeText(CurrentColor);
									setCopied(true);

									setTimeout(() => {
										setCopied(false);
									}, 3000);
								}}
								className="text-center justify-center flex cursor-pointer animate-[ScaleUp_0.1s_ease-in-out]"
							/>
						)}
					</span>
				</div>
			</div>
		</div>
	);
}
