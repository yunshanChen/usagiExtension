// 這裡放的是一些常數和共用function
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.170.0/three.module.js';

/** 一個範例組件 */
const part = {
	geometry: new THREE.Mesh(new THREE.SphereGeometry(50, 32, 32)),
	material: new THREE.MeshStandardMaterial({ color: 0xffe7b7 }),
	castShadow: true, // 選填,預設為true
	receiveShadow: true, // 選填,預設為true
	scale: [1, 0.8, 0.8], // x,y,z
	position: [0, 40, 0], // x.y,z
	rotation: [0, 0, 0], // x,y,z
};
/** 視窗轉換畫布的倍率 */
const WindowToCanvasScale = 1 / 60; // 約1.66%
/** 畫布大小 */
export const CanvasSizes = {
	width: 7 * window.innerWidth * WindowToCanvasScale,
	height: 9 * window.innerWidth * WindowToCanvasScale,
};
/** 畫布移動時間預設值 (16秒) */
export const CanvasMoveTime = 16;
/** 調色盤 */
export const Colors = {
	white: 0xffffff,
	whiteEye: 0xdddddd,
	whiteGray: 0xeeeeee,
	yellow: 0xffe7b7,
	pink: 0xf2bdc8,
	pink: 0xffc0cb,
	brownDark: 0x23190f,
	red: 0xff0000, //測試用顏色
};
/** 動作地圖預設值 */
export const MovementMapDefault = [
	{
		name: 'walk',
		duration: 25, //整體動作所花的時間(秒)
		weight: 1, //權重(動作出現的機率權重)
	},
	{
		name: 'run',
		duration: CanvasMoveTime,
		weight: 1,
	},
	{
		name: 'prone',
		duration: 32,
		weight: 1,
	},
	{
		name: 'dance',
		duration: CanvasMoveTime,
		weight: 1,
	},
	{
		name: 'turn',
		duration: CanvasMoveTime,
		weight: 1,
	},
];
/** 取得目前畫布大小 */
export function getCanvasSize(width = 0) {
	//視窗寬度1440情況下, 24*7:24*9
	const canvasSizeScale = width * WindowToCanvasScale;
	return {
		width: 7 * canvasSizeScale,
		height: 9 * canvasSizeScale,
	};
}
/** 畫圖-設定一個小組件 */
export function setMeshPart(partConfig) {
	const part = new THREE.Mesh(partConfig.geometry, partConfig.material);
	part.castShadow = partConfig.castShadow || true;
	part.receiveShadow = partConfig.receiveShadow || true;
	if (partConfig.scale) part.scale.set(...partConfig.scale);
	if (partConfig.position) part.position.set(...partConfig.position);
	if (partConfig.rotation) part.rotation.set(...partConfig.rotation);
	return part;
}
/** 畫圖-給定半徑內給予向量陣列 Float32BufferAttribute用 */
export function createVectors(radius, count) {
	const vectors = [];
	for (let i = 0; i < count; i++) {
		const x = THREE.MathUtils.randFloatSpread(2 * radius);
		const y = THREE.MathUtils.randFloatSpread(2 * radius);
		const z = THREE.MathUtils.randFloatSpread(2 * radius);
		// 這個向量必須在圓內
		if (Math.sqrt(x ** 2 + y ** 2 + z ** 2) < radius) {
			vectors.push(x, y, z);
		}
	}
	return vectors;
}
/** 動畫(gsap)-基礎動畫到達的位置 */
export function gsapTo(duration = 0, repeat = 0) {
	return {
		duration: duration,
		yoyo: true,
		ease: 'power1.inOut',
		repeat: repeat,
	};
}
