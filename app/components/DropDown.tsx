"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import * as font from "@/app/fonts";
import { ChevronDown } from "lucide-react";

export function DropDown({
	PickerType,
	OnChange,
	...props
}: React.ComponentProps<"div"> & {
	OnChange: (ColorType: string) => void;
	PickerType: string;
}) {
	const [filterOpen, setFilterOpen] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [ColorType, setColorType] = useState<string>("");

	useEffect(() => {
		OnChange(ColorType);
	}, [ColorType, OnChange]);

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

	return (
		<div ref={containerRef} className="relative mr-auto" {...props}>
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
					className={filterOpen ? "text-[#ffffff]/80" : "text-[#ffffff]/60"}
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

                            <li
                                className="px-4 py-2 hover:bg-[#ffff]/10 cursor-pointer transition"
                                onClick={() => {
                                    setColorType("HWB");
                                    setFilterOpen(false);
                                }}
                            >
                                HWB
                            </li>
					</ul>
				</div>
			)}
		</div>
	);
}
