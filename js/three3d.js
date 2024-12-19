//這裡放的是跟THREE和gsap相關動畫
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.170.0/three.module.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';
import {
	Colors,
	CanvasMoveTime,
	getCanvasSize,
	setMeshPart,
	gsapTo,
	MovementMapDefault,
} from './common.js';
import { Configs, TailHair } from './draw.js';

/** 畫布初始大小 */
const CanvasSizes = getCanvasSize(window.innerWidth);
/** 場景 */
const scene = new THREE.Scene();
/** 相機 */
let camera;
const renderer = new THREE.WebGLRenderer({ alpha: true });
/** 所有圖案組件 */
let allParts = {};
/** 圖案組合 */
const group = new THREE.Group();
const headGroup = new THREE.Group();
const earGroup = new THREE.Group();
const bodyGroup = new THREE.Group();
const tailGroup = new THREE.Group();
/** #usagi canvas */
export let usagiCanvas = null;

/** 初始化場景、渲染器、相機、物體 */
export function initThree() {
	setLight(); //設定燈光
	setCamera(); //設定相機
	draw(); //畫圖
	render(); //渲染到畫面
}

/** 設定燈光 */
function setLight() {
	// 燈光效果
	const hemisphereLight = new THREE.HemisphereLight(
		Colors.white,
		Colors.whiteGray,
		1.7
	);
	const ambientLight = new THREE.AmbientLight(Colors.white, 0.8);
	const shadowLight = new THREE.DirectionalLight(Colors.white, 0.9);
	shadowLight.position.set(150, 350, 350);
	shadowLight.castShadow = true;

	// supportLight(shadowLight);
	scene.add(hemisphereLight);
	scene.add(shadowLight);
	scene.add(ambientLight);
}
/** 設定相機 */
function setCamera() {
	// 相機位置
	camera = new THREE.PerspectiveCamera(
		100,
		CanvasSizes.width / CanvasSizes.height,
		1,
		1000
	);
	camera.position.set(0, 30, 100);
	scene.add(camera);
}
/** 畫圖 */
function draw() {
	// 頭組件(part)：頭, 眉毛, 眼睛, 腮紅, 嘴
	const headParts = {
		head: setMeshPart(Configs.head),
		rigthEyebrow: setMeshPart(Configs.rigthEyebrow),
		leftEyebrow: setMeshPart(Configs.leftEyebrow),
		// 眼睛
		rightEye: setMeshPart(Configs.rightEye),
		leftEye: setMeshPart(Configs.leftEye),
		rightEyeUpWhite: setMeshPart(Configs.rightEyeUpWhite),
		leftEyeUpWhite: setMeshPart(Configs.leftEyeUpWhite),
		rightEyeDownWhite: setMeshPart(Configs.rightEyeDownWhite),
		leftEyeDownWhite: setMeshPart(Configs.leftEyeDownWhite),
		// 腮紅
		rightBlushBackground: setMeshPart(Configs.rightBlushBackground),
		leftBlushBackground: setMeshPart(Configs.leftBlushBackground),
		rightBlush1: setMeshPart(Configs.rightBlush1),
		leftBlush1: setMeshPart(Configs.leftBlush1),
		rightBlush2: setMeshPart(Configs.rightBlush2),
		leftBlush2: setMeshPart(Configs.leftBlush2),
		rightBlush3: setMeshPart(Configs.rightBlush3),
		leftBlush3: setMeshPart(Configs.leftBlush3),
		rightBlush4: setMeshPart(Configs.rightBlush4),
		leftBlush4: setMeshPart(Configs.leftBlush4),
		// 嘴
		rightMouth: setMeshPart(Configs.rightMouth),
		leftMouth: setMeshPart(Configs.leftMouth),
		centerMouth: setMeshPart(Configs.centerMouth),
	};
	// 耳朵組件(part)：耳朵
	const earParts = {
		rigthEar: setMeshPart(Configs.rigthEar),
		leftEar: setMeshPart(Configs.leftEar),
		rigthEarInner: setMeshPart(Configs.rigthEarInner),
		leftEarInner: setMeshPart(Configs.leftEarInner),
	};
	// 身體組件(part)：身體, 手, 腳
	const bodyParts = {
		// 身體
		body: setMeshPart(Configs.body),
		// 手
		rigthHand: setMeshPart(Configs.rigthHand),
		leftHand: setMeshPart(Configs.leftHand),
		rightFoot: setMeshPart(Configs.rightFoot),
		leftFoot: setMeshPart(Configs.leftFoot),
	};
	// 尾巴組件(part)：尾巴, 尾巴毛
	const tailParts = {
		tail: setMeshPart(Configs.tail),
		tailHair: TailHair,
	};

	// 第一層小組件
	earGroup.add(...Object.values(earParts));
	tailGroup.add(...Object.values(tailParts));
	// 第二層小組件
	headGroup.add(...Object.values(headParts), earGroup);
	bodyGroup.add(...Object.values(bodyParts), tailGroup);
	// 全部組件
	allParts = {
		...headParts,
		...earParts,
		...bodyParts,
		...tailParts,
	};
	group.add(headGroup, bodyGroup);
	scene.add(group);
}

/** 渲染到畫面 */
function render() {
	renderer.setClearColor(0x000000, 0);
	renderer.setSize(CanvasSizes.width, CanvasSizes.height);
	document.getElementById('usagi').appendChild(renderer.domElement);
	usagiCanvas = document.getElementById('usagi').childNodes[0]; //設定烏薩奇canvas元件
	renderer.render(scene, camera);
}

/** 初始姿勢(站) */
function initPose() {
	const initVector = [0, 0, 0];
	// 重設所有part
	for (const part in Configs) {
		const target = Configs[part];
		allParts[part].position.set(...target.position);
		if (target.rotation) {
			allParts[part].rotation.set(...target.rotation);
		} else {
			allParts[part].rotation.set(...initVector);
		}
	}
	// 重設所有group
	const allGroups = [group, headGroup, earGroup, bodyGroup, tailGroup];
	allGroups.forEach((aGroup) => {
		aGroup.position.set(...initVector);
		aGroup.rotation.set(...initVector);
	});

	renderer.render(scene, camera);
}
/** 趴下 */
function goProne() {
	allParts.rigthHand.position.set(-30, 10, 10);
	allParts.leftHand.position.set(30, 10, 10);
	allParts.rightFoot.position.set(10, -25, 12);
	allParts.leftFoot.position.set(-10, -25, 12);

	headGroup.position.set(0, -30, 5);
	headGroup.rotation.y = Math.PI * -0.15;
	earGroup.position.set(0, -5, 5);
	bodyGroup.position.set(45, 0, 0);
	bodyGroup.rotation.set(Math.PI * 0.5, 0, Math.PI * 0.5);
	group.position.set(-20, 0, 0);

	renderer.render(scene, camera);
}
/** 動作開始前預先動作-旋轉(走路, 跑步, 跳舞) */
function preRotate() {
	group.rotation.y = Math.PI * 1.9;
}
/** 動作開始前預先動作-舉手收腳(旋轉)  */
function preTurn() {
	allParts.rigthHand.rotation.set(0, 0, Math.PI * -0.75);
	allParts.leftHand.rotation.set(0, 0, Math.PI * 0.75);
	allParts.rightFoot.position.set(-5, -25, 0);
	allParts.leftFoot.position.set(5, -25, 0);

	renderer.render(scene, camera);
}

/** 肢體移動動畫(走路、跑步) */
function animateLimbMove(duration, repeat) {
	// 左手
	gsap.fromTo(
		allParts.leftHand.rotation,
		{ x: Math.PI * 0.2 },
		{
			...gsapTo(duration, repeat),
			x: -Math.PI * 0.3,
		}
	);
	// 右手
	gsap.fromTo(
		allParts.rigthHand.rotation,
		{ x: -Math.PI * 0.3 },
		{
			...gsapTo(duration, repeat),
			x: Math.PI * 0.2,
		}
	);
	// 右腳
	gsap.fromTo(
		allParts.rightFoot.rotation,
		{ x: Math.PI * 0.2 },
		{
			...gsapTo(duration, repeat),
			x: -Math.PI * 0.3,
		}
	);
	//左腳
	gsap.fromTo(
		allParts.leftFoot.rotation,
		{ x: -Math.PI * 0.3 },
		{
			...gsapTo(duration, repeat),
			x: Math.PI * 0.2,
		}
	);
}
/** 走路動畫 */
function animateWalk(time = CanvasMoveTime) {
	const duration = 0.8; //動畫組的duration
	const repeat = Math.ceil(time / duration);
	animateLimbMove(duration, repeat);
}
/** 跑步動畫 */
function animateRun(time = CanvasMoveTime) {
	const duration = 0.1; //動畫組的duration
	const repeat = Math.ceil(time / duration);
	// 頭
	gsap.fromTo(
		headGroup.rotation,
		{ x: 0 },
		{
			...gsapTo(duration * 10, time / (duration * 10) - 1),
			x: Math.PI * -0.01,
		}
	);
	// 耳朵
	gsap.fromTo(
		earGroup.rotation,
		{ x: 0 },
		{
			...gsapTo(duration * 10, time / (duration * 10) - 1),
			x: Math.PI * -0.01,
		}
	);
	animateLimbMove(duration, repeat);
}
/** 趴下扭扭動畫 */
function animateProne(time = CanvasMoveTime) {
	const duration = 1; //動畫組的duration
	const repeat = Math.ceil(time / duration);
	// 頭
	gsap.fromTo(
		headGroup.position,
		{ x: 1 },
		{
			...gsapTo(duration, repeat),
			x: -1,
		}
	);
	gsap.fromTo(
		headGroup.rotation,
		{ x: 0 },
		{
			...gsapTo(duration, repeat),
			x: Math.PI * 0.02,
		}
	);
	// 耳朵
	gsap.fromTo(
		earGroup.rotation,
		{ x: 0 },
		{
			...gsapTo(duration, repeat),
			x: Math.PI * -0.01,
		}
	);

	// 左手
	gsap.fromTo(
		allParts.leftHand.rotation,
		{ x: Math.PI * 0.1 },
		{
			...gsapTo(duration, repeat),
			x: 0,
		}
	);
	// 右手
	gsap.fromTo(
		allParts.rigthHand.rotation,
		{ x: Math.PI * 0.1 },
		{
			...gsapTo(duration, repeat),
			x: 0,
		}
	);
	// 尾巴
	gsap.fromTo(
		tailGroup.position,
		{ y: 3, z: -2 },
		{
			...gsapTo(duration, repeat),
			y: -3,
			z: 2,
		}
	);
}
/** 跳舞動畫 */
function animateDance(time = CanvasMoveTime) {
	const duration = 0.2; //動畫組的duration
	const repeat = Math.ceil(time / duration);
	// 頭
	gsap.fromTo(
		headGroup.position,
		{ x: 3 },
		{
			...gsapTo(duration, repeat),
			x: -3,
		}
	);
	gsap.fromTo(
		headGroup.rotation,
		{ x: 0 },
		{
			...gsapTo(duration, repeat),
			x: Math.PI * 0.02,
		}
	);
	// 尾巴
	gsap.fromTo(
		tailGroup.position,
		{ x: 3 },
		{
			...gsapTo(duration, repeat),
			x: -3,
		}
	);
	// 左手
	gsap.fromTo(
		allParts.leftHand.rotation,
		{ x: Math.PI * 0.05 },
		{
			...gsapTo(duration, repeat),
			x: Math.PI * -0.1,
		}
	);
	// 右手
	gsap.fromTo(
		allParts.rigthHand.rotation,
		{ x: Math.PI * -0.1 },
		{
			...gsapTo(duration, repeat),
			x: Math.PI * 0.05,
		}
	);
	// 右腳
	gsap.fromTo(
		allParts.rightFoot.rotation,
		{ x: Math.PI * 0.05 },
		{
			...gsapTo(duration, repeat),
			x: Math.PI * -0.1,
		}
	);
	// 左腳
	gsap.fromTo(
		allParts.leftFoot.rotation,
		{ x: Math.PI * -0.1 },
		{
			...gsapTo(duration, repeat),
			x: Math.PI * 0.05,
		}
	);
}
/** 旋轉動畫 */
function animateTurn(time = CanvasMoveTime) {
	const duration = 0.8; //動畫組的duration
	const repeat = Math.ceil(time / duration);
	// 整體旋轉
	gsap.fromTo(
		group.rotation,
		{ y: 0 },
		{
			...gsapTo(duration, repeat),
			yoyo: false,
			ease: 'none',
			y: Math.PI * 2,
		}
	);
}

/** 右到左移動整個畫布(順暢地從右到左), duration:移動時間 */
function moveCanvas(time = CanvasMoveTime) {
	const characterSize = getCanvasSize(window.innerWidth);
	const totalDistance = window.innerWidth + characterSize.width;

	gsap.to(usagiCanvas, {
		keyframes: {
			x: [0, -totalDistance],
			easeEach: 'power1.inOut',
		},
		duration: time,
		repeat: 0,
	});
}
/** 趴下時從右到左移動整個畫布 */
function proneMoveCanvas(time = CanvasMoveTime) {
	const characterSize = getCanvasSize(window.innerWidth);
	const totalDistance = window.innerWidth + characterSize.width;
	const usagiDuration = 1; //趴下動畫的duration
	const numberOfSteps = time / usagiDuration; //一個移動過程要幾次duration
	const distanceSpace = (usagiDuration * totalDistance) / time;

	// 產生移動點位陣列: 因為duration是1, 所以計算distance不會有浮點數問題
	const frameKeyXPoint = [];
	for (let i = 0; i <= numberOfSteps; i++) {
		const xPoint = -i * distanceSpace;
		frameKeyXPoint.push(Number(xPoint.toFixed(2)));
	}
	// console.log('frameKeyXPoint: ', frameKeyXPoint);
	gsap.to(usagiCanvas, {
		keyframes: {
			x: frameKeyXPoint,
			easeEach: 'power1.inOut',
		},
		duration: time,
		repeat: 0,
	});
}

/** 動畫開始動作 */
export function animate() {
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

/** 設定動作地圖(動畫建立前) 因為要取得dration */
function getMovementMap(usagiSetting) {
	// chrome.storage沒有資料，使用預設值
	if (!usagiSetting) return MovementMapDefault;
	// 使用chrome.storage的資料
	const movementMap = MovementMapDefault.map((movement) => {
		const config = usagiSetting[movement.name];
		return {
			...movement,
			weight: Number(config.weight),
			duration: Number(config.duration),
		};
	});
	console.log('movementMap: ', movementMap);
	return movementMap;
}

/** 初始化動作地圖 和與之相關的邏輯 */
export const initializeMove = (usagiSetting) => {
	/** 動作地圖(不含動畫) */
	const MovementMap = getMovementMap(usagiSetting);

	/** 走 */
	function walk() {
		const duration = MovementMap.find(
			(movement) => movement.name === 'walk'
		).duration;
		initPose();
		preRotate();
		moveCanvas(duration);
		animateWalk(duration);
	}
	/** 跑 */
	function run() {
		const duration = MovementMap.find(
			(movement) => movement.name === 'run'
		).duration;
		initPose();
		preRotate();
		moveCanvas(duration);
		animateRun(duration);
	}
	/** 趴 */
	function prone() {
		const duration = MovementMap.find(
			(movement) => movement.name === 'prone'
		).duration;
		initPose();
		goProne();
		animateProne(duration);
		proneMoveCanvas(duration);
	}
	/** 跳舞 */
	function dance() {
		const duration = MovementMap.find(
			(movement) => movement.name === 'dance'
		).duration;
		initPose();
		preRotate();
		moveCanvas(duration);
		animateDance(duration);
	}
	/** 旋轉 */
	function turn() {
		const duration = MovementMap.find(
			(movement) => movement.name === 'turn'
		).duration;
		initPose();
		preTurn();
		moveCanvas(duration);
		animateTurn(duration);
	}
	/** 動畫地圖 這裡的key對應動作地圖(movementMap)的name */
	const AnimateMap = {
		walk: walk,
		run: run,
		prone: prone,
		dance: dance,
		turn: turn,
	};

	/** 含有動畫的動作地圖 */
	const MovementMapWithAnimate = MovementMap.map((movement) => {
		return {
			...movement,
			animate: AnimateMap[movement.name] || AnimateMap.run, //設定動畫
		};
	});

	return MovementMapWithAnimate;
};

/** 監聽螢幕寬高來做簡單 RWD 設定 */
window.addEventListener('resize', function () {
	const { width, height } = getCanvasSize(window.innerWidth);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
});
