/** 通过gif的url获取到所有帧数据  */
export async function getAllImages(gifUrl) {
    // 用于生成图像image
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");
    const gifFetchRes = await fetch(gifUrl);
    const gifReadStream = gifFetchRes.body;
    if (!gifReadStream) {
        throw new Error("未能读取到图片");
    }
    const imageDecoder = new ImageDecoder({
        data: gifReadStream,
        type: "image/gif",
    });
    const out = [];
    let imageIndex = 0;
    await imageDecoder.tracks.ready;
    // 获取动画轨迹信息
    const track = imageDecoder.tracks.selectedTrack;
    while (imageIndex < track.frameCount) {
        const decodeRes = await imageDecoder.decode({ frameIndex: imageIndex });
        imageIndex += 1;
        canvasContext.drawImage(decodeRes.image, 0, 0);
        const imageUrl = canvas.toDataURL();
        out.push({
            image: decodeRes.image,
            url: imageUrl,
            duration: decodeRes.image.duration || 0,
        });
    }
    return out;
}
