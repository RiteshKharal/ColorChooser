// "use client";
// import { useRef, useCallback } from "react";

// interface SliderProps {
//   min?: number;
//   max?: number;
//   value: number;
//   onChange: (value: number) => void;
// }

// export default function Slider({ min = 0, max = 100, value, onChange }: SliderProps) {
//   const trackRef = useRef<HTMLDivElement>(null);

//   const getValueFromEvent = useCallback((clientX: number) => {
//     const track = trackRef.current;
//     if (!track) return;
//     const { left, width } = track.getBoundingClientRect();
//     const ratio = Math.min(Math.max((clientX - left) / width, 0), 1);
//     onChange(Math.round(min + ratio * (max - min)));
//   }, [min, max, onChange]);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     getValueFromEvent(e.clientX);
//     const onMove = (e: MouseEvent) => getValueFromEvent(e.clientX);
//     const onUp = () => {
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };
//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     const onMove = (e: TouchEvent) => getValueFromEvent(e.touches[0].clientX);
//     const onEnd = () => {
//       window.removeEventListener("touchmove", onMove);
//       window.removeEventListener("touchend", onEnd);
//     };
//     window.addEventListener("touchmove", onMove);
//     window.addEventListener("touchend", onEnd);
//   };

//   const percent = ((value - min) / (max - min)) * 100;

//   return (
//     <div
//       ref={trackRef}
//       onMouseDown={handleMouseDown}
//       onTouchStart={handleTouchStart}
//       className="relative h-2 w-full rounded-full bg-zinc-200 cursor-pointer select-none"
//     >
//       <div
//         className="absolute h-full rounded-full bg-blue-500"
//         style={{ width: `${percent}%` }}
//       />
//       <div
//         className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-blue-500"
//         style={{ left: `${percent}%` }}
//       />
//     </div>
//   );
// }