import { $mobx } from "https://cdnjs.cloudflare.com/ajax/libs/mobx/6.6.1/mobx.esm.development.js";
import { getAllImages } from "./utils.js";
const mainCanvas = document.querySelector("#main-canvas");
const mainCanvasCtx = mainCanvas.getContext("2d");
console.log(mainCanvas);
// 获取gif的数据
const frameList = await getAllImages("./static/wjz.gif");
mainCanvasCtx.drawImage(frameList[0].image, 0, 0);
console.log($mobx);
