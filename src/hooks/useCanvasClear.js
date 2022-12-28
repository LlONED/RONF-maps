export function useCanvasClear() {
  const $canvas = document.querySelector("#canvas");
  $canvas.width = $canvas.clientWidth;
  $canvas.height = $canvas.clientHeight;
  const ctx = $canvas.getContext("2d");

  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}
