export function useGenerateCursor(color = "") {
  const d = 10;

  const $canvas = document.querySelector("#cursor");
  $canvas.height = $canvas.width = d;
  const ctx = $canvas.getContext("2d");

  ctx.beginPath();
  ctx.arc(d / 2, d / 2, d / 2, 0, 2 * Math.PI, false);

  if (color.slice(0, 2) === "s:") {
    ctx.lineWidth = 2;
    ctx.strokeStyle = color.slice(2);
    ctx.stroke();
  } else {
    ctx.fillStyle = color;
    ctx.fill();
  }

  document.querySelector(
    "#canvas"
  ).style.cursor = `url(${$canvas.toDataURL()}), auto`;
}
