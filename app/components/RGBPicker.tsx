"use client";
import React, { useEffect, useState } from "react";
import * as font from "@/app/fonts";

export function RGBPicker({
	OnColorChange,
	CurrentColor,
}: {
	OnColorChange: (CurrentColor: string) => void;
	CurrentColor: string;
}) {
	const [red, setRed] = useState<number | string>(255);
	const [green, setGreen] = useState<number | string>(255);
	const [blue, setBlue] = useState<number | string>(255);
	const [transparency, setTransparency] = useState<number | string>(100);
	const [TempAlpha, setTempAlpha] = useState<string>("1");
	const color =
		Number(transparency) / 100 === 1
			? `rgb(${red}, ${green}, ${blue})`
			: `rgba(${red}, ${green}, ${blue}, ${Number(transparency) / 100})`;

	useEffect(() => {
		const ColorValues = CurrentColor.match(/[\d.]+/g)?.map(Number);
		if (!ColorValues) return;

		setRed(ColorValues[0] ?? Math.min(Math.ceil(Math.random() * 255), 255));

		setGreen(ColorValues[1] ?? Math.min(Math.ceil(Math.random() * 255), 255));

		setBlue(ColorValues[2] ?? Math.min(Math.ceil(Math.random() * 255), 255));

		setTransparency(ColorValues[3] !== undefined ? ColorValues[3] * 100 : 100);

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
						name="red"
						id=""
						className=""
						min={0}
						max={255}
						onChange={(val) => {
							setRed(Number(val.target.value));
						}}
						value={red}
					/>

					<input
						type="range"
						id=""
						className=""
						min={0}
						max={255}
						value={green}
						onChange={(val) => {
							setGreen(Number(val.target.value));
						}}
					/>

					<input
						type="range"
						id=""
						className=""
						min={0}
						max={255}
						value={blue}
						onChange={(val) => {
							setBlue(Number(val.target.value));
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

				<div className="flex flex-col gap-10 w-15 ">
					<input
						type="text"
						name="red"
						className="text-center rounded"
						onChange={(el) => {
							const val = Number(Number(el.target.value).toFixed(2));

							if (val < 0 || val > 255 || isNaN(val)) {
								el.target.style.outline = "2px solid red";
								return;
							}

							el.target.style.outline = "0px";

							setRed(el.target.value);
						}}
						onBlur={(el) => {
							if (!el.target.value) {
								el.target.value = String(0);
							}
							if (Number(el.target.value)) el.target.style.outline = "0px";
						}}
						value={red}
					/>

					<input
						type="text"
						className="text-center rounded"
						value={green}
						onChange={(el) => {
							const val = Number(Number(el.target.value).toFixed(2));

							if (val < 0 || val > 255 || isNaN(val)) {
								el.target.style.outline = "2px solid red";
								return;
							}

							el.target.style.outline = "0px";

							setGreen(el.target.value);
						}}
						onBlur={(el) => {
							if (!el.target.value) el.target.value = "0";

							if (Number(el.target.value)) el.target.style.outline = "0px";
						}}
					/>

					<input
						type="text"
						className="text-center rounded"
						value={blue}
						onChange={(el) => {
							const val = Number(Number(el.target.value).toFixed(2));

							if (val < 0 || val > 255 || isNaN(val)) {
								el.target.style.outline = "2px solid red";
								return;
							}

							el.target.style.outline = "0px";

							setBlue(el.target.value);
						}}
						onBlur={(el) => {
							if (!el.target.value) {
								el.target.value = String(0);
							}

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

							if (!el.target.value) {
								el.target.value = "0";
							}

							if (val < 0 || val > 1 || !Number(el.target.value))
								el.target.style.outline = "1px solid red";
						}}
					/>
				</div>
			</div>
		</div>
	);
}
