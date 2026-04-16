"use client";
import { HSLPicker } from "./pickers/HSLPicker";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClipboardCopy, Check, DicesIcon } from "lucide-react";
import { RGBPicker } from "./pickers/RGBPicker";
import { toHex, HEXtoRGB, HEXtoHSL } from "./components/ColorConversions";
import * as font from "@/app/fonts";
import { DropDown } from "./components/DropDown";
import { HEXtoHWB } from "./components/ColorConversions";
import { HWBPicker } from "./pickers/HWBPicker";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter()
	const [CurrentColor, setCurrentColor] = useState<string>(``);
	const [ConvertedColor, setConvertedColor] = useState<string>(CurrentColor);
	const [CurrentColorHex, setCurrentColorHex] = useState<string>("");
	

	const [PickerType, setPickerType] = useState<string>("HSL");
	const [ColorType, setColorType] = useState<string>("");

	const handleColorChange = useCallback((color: string) => {
		setCurrentColor((prev) => (prev === color ? prev : color));
	}, []);

	useEffect(() => {
		setCurrentColor(
			`hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 100)}%, ${Math.floor(Math.random() * 100)}%)`,
		);
	}, []);

	useEffect(() => {
		if (PickerType === "RGB") setCurrentColor(HEXtoRGB(CurrentColorHex));
		if (PickerType === "HSL") setCurrentColor(HEXtoHSL(CurrentColorHex));
		if (PickerType === "HWB") setCurrentColor(HEXtoHWB(CurrentColorHex));
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
			case "HWB":
				setConvertedColor(HEXtoHWB(hex));
				break;

			default:
				setConvertedColor(CurrentColor);
				break;
		}
	}, [CurrentColor, ColorType, PickerType]);

	const Picker = (val: string) => {
		switch (val) {
			case "HSL":
				return (
					<HSLPicker
						OnColorChange={handleColorChange}
						CurrentColor={HEXtoHSL(CurrentColorHex)}
					/>
				);

			case "RGB":
				return (
					<RGBPicker
						OnColorChange={handleColorChange}
						CurrentColor={HEXtoRGB(CurrentColorHex)}
					/>
				);
			case "HWB":
				return (
					<HWBPicker
						OnColorChange={handleColorChange}
						CurrentColor={HEXtoHWB(CurrentColorHex)}
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

			<section
				className={`absolute top-3 right-10 text-[1.15rem] bg-black/40 font-bold  rounded-xl px-5 p-2 ${font.inconsolata.className} flex flex-row gap-3 cursor-pointer`}
				onClick={()=>{
					router.push('/random')
				}}
			>
				<DicesIcon className={``} />
				Random Colors
			</section>

			<div className="relative z-10 flex flex-col w-full text-center items-center">
				<div className="flex flex-row gap-10">
					<div className="flex flex-row gap-3">
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
					</div>

					<div className="flex flex-row gap-3">
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

					<div className="flex flex-row gap-3">
						<input
							type="radio"
							name="ColorType"
							id="HWB"
							onChange={() => {
								setPickerType("HWB");
							}}
						/>

						<label htmlFor="HWB">HWB</label>
					</div>
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

					<div key={"Picker"}>{Picker(PickerType)}</div>
				</div>

				<div
					className={`p-3 rounded-2xl flex flex-row gap-5 text-center items-center w-110 transform transition`}
					style={{
						backgroundColor: `hsla(0 0% 0% / 0.3)`,
					}}
				>
					<div className="relative mr-auto">
						<DropDown
							OnChange={(type) => {
								setColorType(type);
							}}
							PickerType={PickerType}
						/>
					</div>

					<div
						className={`transition h-full tracking-wider ${font.comfortaa.className} mr-auto ml-auto`}
					>
						{ConvertedColor}
					</div>

					<span className="flex items-center justify-center mr-auto ml-auto">
						<ClipboardCopy
							size={20}
							height={20}
							className="cursor-pointer"
							onClick={(e) => {
								navigator.clipboard.writeText(ConvertedColor);
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
		</div>
	);
}
