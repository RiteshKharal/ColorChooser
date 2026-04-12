export function toHex(color: string): string {
	if (typeof window === "undefined") return "";

	const canvas = document.createElement("canvas");
	canvas.width = canvas.height = 1;

	const ctx = canvas.getContext("2d")!;
	ctx.fillStyle = color;
  
	ctx.fillRect(0, 0, 1, 1);
	const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;

  
	const hex = [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
	return `#${hex}${a === 255 ? "" : a.toString(16).padStart(2, "0")}`;
}

export function HEXtoRGB(hex: string): string {
	if (typeof window === "undefined") return "";

	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
	return a == 1
		? `rgb(${parseFloat(r.toFixed(2))}, ${parseFloat(g.toFixed(2))}, ${parseFloat(b.toFixed(2))})`
		: `rgba(${parseFloat(r.toFixed(2))}, ${parseFloat(g.toFixed(2))}, ${parseFloat(b.toFixed(2))}, ${parseFloat(a.toFixed(2))})`;
}

export function HEXtoHSL(hex: string): string {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;
	const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;

	const max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	const l = (max + min) / 2;
	let h = 0,
		s = 0;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
				break;
			case g:
				h = ((b - r) / d + 2) / 6;
				break;
			case b:
				h = ((r - g) / d + 4) / 6;
				break;
		}
	}

	return a === 1
		? `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
		: `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${parseFloat(a.toFixed(2))})`;
}
