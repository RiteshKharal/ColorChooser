"use client";
import React, { useEffect, useState } from "react";
import * as font from "@/app/fonts";

export function HSLPicker({
	OnColorChange,
}: {
	OnColorChange: (color: string) => void;
}) {
	const [hue, setHue] = useState<number | string>(360);
	const [saturation, setSaturation] = useState<number | string>(100);
	const [lightness, setLightness] = useState<number | string>(100);
	const [transparency, setTransparency] = useState<number | string>(100);
	const [TempAlpha, setTempAlpha] = useState<string>("1");
	const color = `hsla(${Number(hue)}, ${Number(saturation)}%, ${Number(lightness)}%, ${Number(transparency) / 100})`;

	useEffect(() => {
		setHue(Math.min(Math.ceil(Math.random() * 360), 360));
		setSaturation(Math.min(Math.ceil(Math.random() * 100), 100));
		setLightness(Math.min(Math.ceil(Math.random() * 100), 100));
	}, []);

	useEffect(() => {
		setTempAlpha(String(Number(transparency) / 100));
	}, [transparency]);

	useEffect(() => {
		OnColorChange(color);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [color, hue, lightness, saturation, transparency]);

	return (
		<div
			className={`${font.cabin.className} text-xl flex gap-10 flex-col w-full items-center justify-center`}
		>
			<div className="flex flex-row w-full h-fit items-center gap-20 justify-center">
				<div className="flex flex-col gap-10 w-90">
					<input
						type="range"
						name="hue"
						id=""
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
						id=""
						className=""
						min={0}
						max={1000}
						value={Number(saturation) * 10}
						onChange={(val) => {
							setSaturation(Number(val.target.value) / 10);
						}}
					/>
					<input
						type="range"
						id=""
						className=""
						min={0}
						max={1000}
						value={Number(lightness) * 10}
						onChange={(val) => {
							setLightness(Number(val.target.value) / 10);
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
							if (!el.target.value) {
								el.target.value = String(0);
							}
							if (Number(el.target.value)) el.target.style.outline = "0px";
						}}
						value={hue}
					/>

					<input
						type="text"
						className="text-center rounded"
						value={saturation}
						onChange={(el) => {
							const val = Number(Number(el.target.value).toFixed(2));

							if (val < 0 || val > 100 || isNaN(val)) {
								el.target.style.outline = "2px solid red";
								return;
							}

							el.target.style.outline = "0px";

							setSaturation(el.target.value);
						}}
						onBlur={(el) => {
							if (!el.target.value) el.target.value = "0";

							if (Number(el.target.value)) el.target.style.outline = "0px";
						}}
					/>

					<input
						type="text"
						className="text-center rounded"
						value={lightness}
						onChange={(el) => {
							const val = Number(Number(el.target.value).toFixed(2));

							if (val < 0 || val > 100 || isNaN(val)) {
								el.target.style.outline = "2px solid red";
								return;
							}

							el.target.style.outline = "0px";

							setLightness(el.target.value);
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
