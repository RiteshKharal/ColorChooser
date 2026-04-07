"use client";
import React, { useEffect, useState } from "react";
import * as font from "@/app/fonts";
import { ClipboardCopy } from "lucide-react";

export function HSLPicker({
	OnColorChange,
}: {
	OnColorChange: (color: string) => void;
}) {
	const [hue, setHue] = useState<number>(360);
	const [saturation, setSaturation] = useState<number>(100);
	const [lightness, setLightness] = useState<number>(100);
	const [transparency, setTransparency] = useState<number>(100);
	const color = `hsla(${hue / 10}, ${saturation / 10}%, ${lightness / 10}%, ${transparency / 100})`;

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setHue(Math.min(Math.ceil(Math.random() * 3600), 3600));
		setSaturation(Math.min(Math.ceil(Math.random() * 1000), 1000));
		setLightness(Math.min(Math.ceil(Math.random() * 1000), 1000));
	}, []);

	useEffect(() => {
		OnColorChange(color);
	}, [OnColorChange, color, hue, lightness, saturation, transparency]);

	return (
		<div
			className={`${font.cabin.className} text-xl flex gap-10 flex-col w-full items-center justify-center`}
		>
			<div className="flex flex-row w-full h-fit items-center gap-20 justify-center">
				<div
					className="w-60 h-60 rounded-3xl"
					style={{
						backgroundColor: color,
						boxShadow: `0 0 2px ${color}`,
						border: `3px solid hsla(360 100% 99.9% / 0.5)`,
					}}
				></div>

				<div className="flex flex-col gap-10 w-90">
					<input
						type="range"
						name="hue"
						id=""
						className=""
						min={0}
						max={3600}
						onChange={(val) => {
							setHue(Number(val.target.value));
						}}
						value={hue}
					/>

					<input
						type="range"
						id=""
						className=""
						min={0}
						max={1000}
						value={saturation}
						onChange={(val) => {
							setSaturation(Number(val.target.value));
						}}
					/>
					<input
						type="range"
						id=""
						className=""
						min={0}
						max={1000}
						value={lightness}
						onChange={(val) => {
							setLightness(Number(val.target.value));
						}}
					/>

					<input
						type="range"
						id=""
						className=""
						min={0}
						max={100}
						value={transparency}
						onChange={(val) => {
							setTransparency(Number(val.target.value));
						}}
					/>
				</div>
			</div>
		</div>
	);
}
