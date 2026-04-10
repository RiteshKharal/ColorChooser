

export function toHex(color: string):string {
    if(typeof window === 'undefined') return ''

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);

  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  return `#${[r, g, b, a].map(v => v.toString(16).padStart(2, "0")).join("")}`;
}