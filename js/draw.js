// 這裡放的是和畫圖(組件)相關的參數
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.170.0/three.module.js';

import { Colors, createVectors } from './common.js';

/** 常用元素：黃色standard */
export const material = new THREE.MeshStandardMaterial({
	color: Colors.yellow,
});
/** 所有組件參數(除了尾巴毛) */
export const Configs = {
	//Math.PI表示180度(逆時鐘旋轉)
	/** 頭 */
	head: {
		geometry: new THREE.SphereGeometry(50, 32, 32),
		material: material,
		scale: [1, 0.8, 0.8],
		position: [0, 40, 0], //x,y,z
	},

	/** 右眉 */
	rigthEyebrow: {
		geometry: new THREE.TorusGeometry(12, 1, 16, 100, Math.PI / 2),
		material: new THREE.MeshPhongMaterial({ color: Colors.brownDark }),
		rotation: [0, 0, Math.PI / 2],
		position: [-10, 43, 35], //x,y,z
	},
	/** 左眉 */
	leftEyebrow: {
		geometry: new THREE.TorusGeometry(12, 1, 16, 100, Math.PI / 2),
		material: new THREE.MeshPhongMaterial({ color: Colors.brownDark }),
		position: [10, 43, 35], //x,y,z
	},

	/** 右眼 */
	rightEye: {
		geometry: new THREE.SphereGeometry(6, 16, 16),
		material: new THREE.MeshPhongMaterial({ color: Colors.brownDark }),
		scale: [1, 1, 0.8],
		position: [10, 38, 35], //x,y,z
	},
	/** 左眼 */
	leftEye: {
		geometry: new THREE.SphereGeometry(6, 16, 16),
		material: new THREE.MeshPhongMaterial({ color: Colors.brownDark }),
		scale: [1, 1, 0.8],
		position: [-10, 38, 35], //x,y,z
	},
	/** 右眼上白 */
	rightEyeUpWhite: {
		geometry: new THREE.SphereGeometry(1.5, 16, 16),
		material: new THREE.MeshBasicMaterial({ color: Colors.whiteEye }),
		scale: [1.1, 1, 0.7],
		position: [-10.5, 38, 39], //x,y,z
	},
	/** 左眼上白 */
	leftEyeUpWhite: {
		geometry: new THREE.SphereGeometry(1.5, 16, 16),
		material: new THREE.MeshBasicMaterial({ color: Colors.whiteEye }),
		scale: [1.1, 1, 0.7],
		position: [10.5, 38, 39], //x,y,z
	},

	/** 右眼下白 */
	rightEyeDownWhite: {
		geometry: new THREE.SphereGeometry(0.6, 16, 16),
		material: new THREE.MeshBasicMaterial({ color: Colors.whiteEye }),
		scale: [2.2, 0.7, 1],
		position: [-10.5, 35.7, 39], //x,y,z
	},
	/** 左眼下白 */
	leftEyeDownWhite: {
		geometry: new THREE.SphereGeometry(0.6, 16, 16),
		material: new THREE.MeshBasicMaterial({ color: Colors.whiteEye }),
		scale: [2.2, 0.7, 1],
		position: [10.5, 35.7, 39], //x,y,z
	},

	/** 右腮紅底 */
	rightBlushBackground: {
		geometry: new THREE.SphereGeometry(4, 16, 16),
		material: new THREE.MeshBasicMaterial({ color: Colors.pink }),
		scale: [1.7, 1, 0.5],
		rotation: [0, Math.PI * -0.2, 0],
		position: [-19.8, 32, 35], //x,y,z
	},
	/** 左腮紅底 */
	leftBlushBackground: {
		geometry: new THREE.SphereGeometry(4, 16, 16),
		material: new THREE.MeshBasicMaterial({ color: Colors.pink }),
		scale: [1.7, 1, 0.5],
		rotation: [0, Math.PI * 0.2, 0],
		position: [19.8, 32, 35], //x,y,z
	},

	/** 右腮紅線1(由外至內) */
	rightBlush1: {
		geometry: new THREE.CapsuleGeometry(1, 2, 10, 40), //radius, length
		material: new THREE.MeshBasicMaterial({ color: Colors.brownDark }),
		rotation: [0, Math.PI * -0.2, Math.PI * -0.2],
		position: [-22, 32, 35], //x,y,z
	},
	/** 左腮紅線1(由外至內) */
	leftBlush1: {
		geometry: new THREE.CapsuleGeometry(1, 2, 10, 40), //radius, length
		material: new THREE.MeshBasicMaterial({ color: Colors.brownDark }),
		rotation: [0, Math.PI * 0.2, Math.PI * -0.2],
		position: [22, 32, 35], //x,y,z
	},

	/** 右腮紅線2(由外至內) */
	rightBlush2: {
		geometry: new THREE.CapsuleGeometry(1, 2, 10, 40), //radius, length
		material: new THREE.MeshBasicMaterial({ color: Colors.brownDark }),
		rotation: [0, Math.PI * -0.2, Math.PI * -0.2],
		position: [-20, 32, 36.5], //x,y,z
	},
	/** 左腮紅線2(由外至內) */
	leftBlush2: {
		geometry: new THREE.CapsuleGeometry(1, 2, 10, 40), //radius, length
		material: new THREE.MeshBasicMaterial({ color: Colors.brownDark }),
		rotation: [0, Math.PI * 0.2, Math.PI * -0.2],
		position: [20, 32, 36.5], //x,y,z
	},

	/** 右腮紅線3(由外至內) */
	rightBlush3: {
		geometry: new THREE.CapsuleGeometry(1, 2, 10, 40), //radius, length
		material: new THREE.MeshBasicMaterial({ color: Colors.brownDark }),
		rotation: [0, Math.PI * -0.2, Math.PI * -0.2],
		position: [-18, 32, 37.5], //x,y,z
	},
	/** 左腮紅線3(由外至內) */
	leftBlush3: {
		geometry: new THREE.CapsuleGeometry(1, 2, 10, 40), //radius, length
		material: new THREE.MeshBasicMaterial({ color: Colors.brownDark }),
		rotation: [0, Math.PI * 0.2, Math.PI * -0.2],
		position: [18, 32, 37.6], //x,y,z
	},

	/** 右腮紅線4(由外至內) */
	rightBlush4: {
		geometry: new THREE.CapsuleGeometry(1, 2, 10, 40), //radius, length
		material: new THREE.MeshBasicMaterial({ color: Colors.brownDark }),
		rotation: [0, Math.PI * -0.1, Math.PI * -0.2],
		position: [-16.2, 32, 38.2], //x,y,z
	},
	/** 左腮紅線4(由外至內) */
	leftBlush4: {
		geometry: new THREE.CapsuleGeometry(1, 2, 10, 40), //radius, length
		material: new THREE.MeshBasicMaterial({ color: Colors.brownDark }),
		rotation: [0, Math.PI * 0.1, Math.PI * -0.2],
		position: [16.2, 32, 38.2], //x,y,z
	},

	/** 右嘴 */
	rightMouth: {
		geometry: new THREE.TorusGeometry(4, 0.8, 16, 100, Math.PI),
		material: new THREE.MeshPhongMaterial({ color: Colors.brownDark }),
		rotation: [0, 0, Math.PI * 1.1],
		position: [-4, 31, 38], //x,y,z
	},
	/** 左嘴 */
	leftMouth: {
		geometry: new THREE.TorusGeometry(4, 0.8, 16, 100, Math.PI),
		material: new THREE.MeshPhongMaterial({ color: Colors.brownDark }),
		rotation: [0, 0, Math.PI * 0.9],
		position: [4, 31, 38], //x,y,z
	},
	/** 中嘴 */
	centerMouth: {
		geometry: new THREE.TorusGeometry(4, 0.8, 16, 100, Math.PI * 0.6),
		material: new THREE.MeshPhongMaterial({ color: Colors.brownDark }),
		rotation: [Math.PI / 6, 0, Math.PI],
		scale: [1, 1.4, 1],
		position: [0, 27, 38], //x,y,z
	},

	/** 身體 */
	body: {
		geometry: new THREE.CapsuleGeometry(35, 30, 10, 40), //radius, length
		material: material,
		scale: [1, 1, 0.8],
		position: [0, 15, 0], //x,y,z
	},

	/** 右耳 */
	rigthEar: {
		geometry: new THREE.CapsuleGeometry(8, 40, 10, 40), //radius, length
		material: material,
		position: [-15, 90, 0], //x,y,z
	},
	/** 左耳 */
	leftEar: {
		geometry: new THREE.CapsuleGeometry(8, 40, 10, 40), //radius, length
		material: material,
		position: [15, 90, 0], //x,y,z
	},

	/** 右耳內圈 */
	rigthEarInner: {
		geometry: new THREE.CapsuleGeometry(4, 30, 10, 40), //radius, length
		material: new THREE.MeshStandardMaterial({ color: Colors.pink }),
		position: [-15, 90, 5], //x,y,z
	},
	/** 左耳內圈 */
	leftEarInner: {
		geometry: new THREE.CapsuleGeometry(4, 30, 10, 40), //radius, length
		material: new THREE.MeshStandardMaterial({ color: Colors.pink }),
		position: [15, 90, 5], //x,y,z
	},

	/** 右手 */
	rigthHand: {
		geometry: new THREE.CapsuleGeometry(8, 20, 10, 40), //radius, length
		material: material,
		scale: [1, 1, 0.8],
		position: [-35, 10, 0], //x,y,z
		rotation: [0, 0, Math.PI * 0.75],
	},
	/** 左手 */
	leftHand: {
		geometry: new THREE.CapsuleGeometry(8, 20, 10, 40), //radius, length
		material: material,
		// material: new THREE.MeshStandardMaterial({ color: Colors.red }),
		scale: [1, 1, 0.8],
		position: [35, 10, 0], //x,y,z
		rotation: [0, 0, Math.PI * 0.25],
	},

	/** 右腳 */
	rightFoot: {
		geometry: new THREE.CapsuleGeometry(8, 25, 10, 40), //radius, length
		material: material,
		position: [-10, -25, 0], //x,y,z
	},
	/** 左腳 */
	leftFoot: {
		geometry: new THREE.CapsuleGeometry(8, 25, 10, 40), //radius, length
		material: material,
		position: [10, -25, 0], //x,y,z
	},

	/** 尾巴(中間實心) */
	tail: {
		geometry: new THREE.SphereGeometry(4, 32, 32),
		material: new THREE.MeshStandardMaterial({ color: Colors.whiteGray }),
		position: [0, -20, -25], //x,y,z
	},
};
/** 尾巴毛組件 */
export const TailHair = createTailHair();
/** 建立尾巴毛組件 */
function createTailHair() {
	const tailHairVertices = createVectors(5, 500);
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute(
		'position',
		new THREE.Float32BufferAttribute(tailHairVertices, 3)
	);
	const tailHair = new THREE.Points(
		geometry,
		new THREE.PointsMaterial({ color: Colors.whiteEye })
	);
	tailHair.position.set(0, -20, -25);
	return tailHair;
}
