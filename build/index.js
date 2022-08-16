import { getAllImages } from "./utils.js";
// 获取gif的数据
const frameList = await getAllImages("./static/wjz.gif");
// 渲染数据
for (const frame of frameList) {
    const img = document.createElement("img");
    img.setAttribute("src", frame.url);
    document.body.appendChild(img);
}
