"use client";
import React, { useEffect, useState } from "react";
import * as font from "@/app/fonts";

export function HWBPicker({
	OnColorChange,
	CurrentColor,
}: {
	OnColorChange: (CurrentColor: string) => void;
	CurrentColor: string;
}) {
	const [hue, setHue] = useState<number | string>(0);
	const [whiteness, setWhiteness] = useState<number | string>(0);
	const [blackness, setBlackness] = useState<number | string>(0);
	const [transparency, setTransparency] = useState<number | string>(100);
	const [TempAlpha, setTempAlpha] = useState<string>("1");

	const color =
		Number(transparency) / 100 === 1
			? `hwb(${hue} ${whiteness}% ${blackness}%)`
			: `hwb(${hue} ${whiteness}% ${blackness}% / ${Number(transparency) / 100})`;

	useEffect(() => {
		const ColorValues = CurrentColor.match(/[\d.]+/g)?.map(Number);

		if (ColorValues && ColorValues.length >= 3) {
			if (ColorValues[0] !== undefined) setHue(ColorValues[0]);
			if (ColorValues[1] !== undefined) setWhiteness(ColorValues[1]);
			if (ColorValues[2] !== undefined) setBlackness(ColorValues[2]);
			if (ColorValues[3] !== undefined) setTransparency(ColorValues[3] * 100);
		} else {
			setHue(Math.min(Math.ceil(Math.random() * 360), 360));
			setWhiteness(Math.min(Math.ceil(Math.random() * 100), 100));
			setBlackness(Math.min(Math.ceil(Math.random() * 100), 100));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const val = String(Number(transparency) / 100);
		if (val !== TempAlpha) setTempAlpha(val);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transparency]);

	useEffect(() => {
		OnColorChange(color);
	}, [OnColorChange, color]);

	return (
		<div
			className={`${font.cabin.className} text-xl flex gap-10 flex-col w-full items-center justify-center`}
		>
			<div className="flex flex-row w-full h-fit items-center gap-20 justify-center">
				<div className="flex flex-col gap-10 w-90">
					<input
						type="range"
						name="hue"
						className=""
						min={0}
						max={3600}
						onChange={(val) => {
							setHue(Number(val.target.value) / 10);
						}}
						value={Number(hue) * 10}
					/>

					<input
						type="range"
						className=""
						min={0}
						max={1000}
						value={Number(whiteness) * 10}
						onChange={(val) => {
							setWhiteness(Number(val.target.value) / 10);
						}}
					/>

					<input
						type="range"
						className=""
						min={0}
						max={1000}
						value={Number(blackness) * 10}
						onChange={(val) => {
							setBlackness(Number(val.target.value) / 10);
						}}
					/>

					<input
						type="range"
						className=""
						min={0}
						max={100}
						value={transparency}
						onChange={(val) => {
							setTransparency(Number(val.target.value));
						}}
					/>
				</div>

				<div className="flex flex-col gap-10 w-15">
					<input
						type="text"
						name="hue"
						className="text-center rounded"
						onChange={(el) => {
							const val = Number(Number(el.target.value).toFixed(2));

							if (val < 0 || val > 360 || isNaN(val)) {
								el.target.style.outline = "2px solid red";
								return;
							}

							el.target.style.outline = "0px";
							setHue(el.target.value);
						}}
						onBlur={(el) => {
							if (!el.target.value) el.target.value = String(0);
							if (Number(el.target.value)) el.target.style.outline = "0px";
						}}
						value={hue}
					/>

					<input
						type="text"
						className="text-center rounded"
						value={whiteness}
						onChange={(el) => {
							const val = Number(Number(el.target.value).toFixed(2));

							if (val < 0 || val > 100 || isNaN(val)) {
								el.target.style.outline = "2px solid red";
								return;
							}

							el.target.style.outline = "0px";
							setWhiteness(el.target.value);
						}}
						onBlur={(el) => {
							if (!el.target.value) el.target.value = "0";
							if (Number(el.target.value)) el.target.style.outline = "0px";
						}}
					/>

					<input
						type="text"
						className="text-center rounded"
						value={blackness}
						onChange={(el) => {
							const val = Number(Number(el.target.value).toFixed(2));

							if (val < 0 || val > 100 || isNaN(val)) {
								el.target.style.outline = "2px solid red";
								return;
							}

							el.target.style.outline = "0px";
							setBlackness(el.target.value);
						}}
						onBlur={(el) => {
							if (!el.target.value) el.target.value = String(0);
							if (Number(el.target.value)) el.target.style.outline = "0px";
						}}
					/>

					<input
						type="text"
						className="text-center rounded"
						value={TempAlpha}
						onChange={(el) => {
							const val = Number(Number(el.target.value).toFixed(2));
							setTempAlpha(el.target.value);

							if (val < 0 || val > 1 || isNaN(val)) {
								el.target.style.outline = "1px solid red";
								return;
							}

							el.target.style.outline = "0px";
							setTransparency(val * 100);
						}}
						onBlur={(el) => {
							const val = Number(el.target.value);
							if (!el.target.value) el.target.value = "0";
							if (val < 0 || val > 1 || !Number(el.target.value))
								el.target.style.outline = "1px solid red";
						}}
					/>
				</div>
			</div>
		</div>
	);
}