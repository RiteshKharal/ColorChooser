"use client";
import Image from "next/image";
import { HSLPicker } from "./components/HSLPicker";
import { useState } from "react";

export default function Home() {
	const [CurrentColor, setCurrentColor] = useState<string>(`hsla(0,0%,0%,1)`);
	const [PickerType, setPickerType] = useState<string>("HSL");

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

			default:
				break;
		}
	};

	return (
		<div
			className="flex flex-col text-foreground justify-center min-h-screen w-full items-center font-bold gap-10 "
			style={{
				backgroundColor: "#0b0b10",
				backgroundImage: `
					radial-gradient(circle at 10% 10%, rgba(255, 0, 128, 0.22), transparent 20%), radial-gradient(circle at 90% 15%, rgba(0, 200, 255, 0.22), transparent 38%), radial-gradient(circle at 20% 85%, rgba(255, 200, 0, 0.18), transparent 45%), radial-gradient(circle at 85% 80%, rgba(120, 255, 180, 0.18), transparent 45%), repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 6px, transparent 6px 12px)`,
				backgroundBlendMode: "screen, screen, screen, screen, normal",
			}}
		>
			<div className="flex flex-col w-full text-center items-center">
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
				</div>
			</div>

			<div className="w-full">
				<div className="w-full">{Picker(PickerType)}</div>
			</div>
		</div>
	);
}
