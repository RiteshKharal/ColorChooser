"use client";
import React, { useEffect, useState } from "react";
import * as font from "@/app/fonts";
import { ClipboardCopy } from "lucide-react";

export function RGBPicker({
    OnColorChange,
}: {
    OnColorChange: (color: string) => void;
}) {
    const [red, setRed] = useState<number>(360);
    const [green, setGreen] = useState<number>(100);
    const [blue, setBlue] = useState<number>(100);
    const [transparency, setTransparency] = useState<number>(100);
    const color = `rgba(${red }, ${green}%, ${blue }%, ${transparency})`;  
    console.log(color)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRed(Math.min(Math.ceil(Math.random() * 255), 255));
        setGreen(Math.min(Math.ceil(Math.random() * 255), 255));
        setBlue(Math.min(Math.ceil(Math.random() * 255), 255));
    }, []);

    useEffect(() => {
        OnColorChange(color);
    }, [OnColorChange, color, red, blue, green, transparency]);

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
            </div>
        </div>
    );
}
