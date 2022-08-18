import { GifSlider } from "./module/index.js";
import { getAllImages } from "./utils.js";

const mainCanvas: HTMLCanvasElement = document.querySelector("#main-canvas")!;
const mainCanvasCtx = mainCanvas.getContext("2d")!;

const startBtn: HTMLButtonElement = document.querySelector("#start-btn")!;
startBtn.onclick = start;
// 获取gif的数据
const frameList = await getAllImages("./static/wjz.gif");

const maxLen = frameList.map((f) => f.duration).reduce((a, b) => a + b, 0);

mainCanvasCtx.drawImage(frameList[0].image, 0, 0);
const gifSlider = new GifSlider(
  "test",
  0,
  0,
  maxLen,
  document.querySelector("#gif-slider")!,
  (v, p) => {
    if (getFrameIndex(v) === getFrameIndex(p)) {
      return;
    }
    mainCanvasCtx.drawImage(frameList[getFrameIndex(v)].image, 0, 0);
  }
);

let stId: number | undefined;
function start() {
  const run = () => {
    if (gifSlider.value >= gifSlider.max) {
      return;
    }
    gifSlider.setValue(gifSlider.value + 1000 * 10);
    stId = setTimeout(run, 10);
  };
  if (stId) {
    clearTimeout(stId);
  }
  gifSlider.setValue(0);
  setTimeout(run);
}

export {};

function getFrameIndex(time: number) {
  let out = 0;
  if (time >= maxLen) {
    return frameList.length - 1;
  }
  if (time === 0) {
    return 0;
  }
  let timeCount = 0;
  for (; out < frameList.length - 1; out++) {
    if (time >= timeCount && time < timeCount + frameList[out].duration) {
      return out;
    }
    timeCount += frameList[out].duration;
  }
  return out;
}
