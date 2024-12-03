import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.170.0/three.module.js";

import {
  Colors,
  CanvasMoveTime,
  getCanvasSize,
  setMeshPart,
  gsapTo,
} from "./common.js";
import { Configs, TailHair } from "./draw.js";

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
/** usagi canvas element */
let usagiCanvas = null;

// 初始化場景、渲染器、相機、物體
function init() {
  setLight(); //設定燈光
  setCamera(); //設定相機
  draw(); //畫圖
  render(); //渲染到畫面
  usagiCanvas.addEventListener("click", usagiMove); //建立click效果
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
  allParts = { ...headParts, ...earParts, ...bodyParts, ...tailParts };
  group.add(headGroup, bodyGroup);
  scene.add(group);
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
/** 渲染到畫面 */
function render() {
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(CanvasSizes.width, CanvasSizes.height);
  document.getElementById("usagi").appendChild(renderer.domElement);
  usagiCanvas = document.getElementById("usagi").childNodes[0]; //設定烏薩奇canvas元件
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
function animateWalk() {
  const duration = 0.8; //動畫組的duration
  const repeat = CanvasMoveTime / duration - 1;
  animateLimbMove(duration, repeat);
}
/** 跑步動畫 */
function animateRun() {
  const duration = 0.1; //動畫組的duration
  const repeat = CanvasMoveTime / duration - 1;
  // 頭
  gsap.fromTo(
    headGroup.rotation,
    { x: 0 },
    {
      ...gsapTo(duration * 10, CanvasMoveTime / (duration * 10) - 1),
      x: Math.PI * -0.01,
    }
  );
  // 耳朵
  gsap.fromTo(
    earGroup.rotation,
    { x: 0 },
    {
      ...gsapTo(duration * 10, CanvasMoveTime / (duration * 10) - 1),
      x: Math.PI * -0.01,
    }
  );
  animateLimbMove(duration, repeat);
}
/** 趴下扭扭動畫 */
function animateProne() {
  const duration = 0.8; //動畫組的duration
  const repeat = CanvasMoveTime / duration - 1;
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
function animateDance() {
  const duration = 0.2; //動畫組的duration
  const repeat = CanvasMoveTime / duration - 1;
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

/** 右到左移動整個畫布(順暢地從右到左) */
function moveCanvas() {
  const characterSize = getCanvasSize(window.innerWidth);
  const totalDistance = window.innerWidth + characterSize.width;

  gsap.to(usagiCanvas, {
    keyframes: {
      x: [0, -totalDistance],
      easeEach: "power1.inOut",
    },
    duration: CanvasMoveTime,
    repeat: 0,
  });
}
/** 趴下時從右到左移動整個畫布 */
function proneMoveCanvas() {
  const frameKeyXPoint = [];
  const characterSize = getCanvasSize(window.innerWidth);
  const totalDistance = window.innerWidth + characterSize.width;
  const usagiDuration = 0.8; //趴下動畫的duration
  const distanceSpace = (usagiDuration * totalDistance) / CanvasMoveTime;

  // 產生移動點位陣列
  for (let i = 0; i < totalDistance; i += distanceSpace) {
    frameKeyXPoint.push(-i);
  }
  frameKeyXPoint.push(-totalDistance); //避免計算後有浮點數的問題，直接使用總距離
  // console.log(frameKeyXPoint);
  gsap.to(usagiCanvas, {
    keyframes: {
      x: frameKeyXPoint,
      easeEach: "power1.inOut",
    },
    duration: CanvasMoveTime,
    repeat: 0,
  });
}

/** 動畫開始動作 */
function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

/** 動作開始前預先旋轉(走路, 跑步, 跳舞) */
function preRotate() {
  group.rotation.y = Math.PI * 1.9;
}

/** 監聽螢幕寬高來做簡單 RWD 設定 */
window.addEventListener("resize", function () {
  const { width, height } = getCanvasSize(window.innerWidth);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

/** 走 */
function walk() {
  initPose();
  preRotate();
  moveCanvas();
  animateWalk();
}
/** 跑 */
function run() {
  initPose();
  preRotate();
  moveCanvas();
  animateRun();
}
/** 趴 */
function prone() {
  initPose();
  goProne();
  animateProne();
  proneMoveCanvas();
}
/** 跳舞 */
function dance() {
  initPose();
  preRotate();
  moveCanvas();
  animateDance();
}

/** 建立usagi div */
function createUsagiDiv() {
  const usagi = document.createElement("div");
  usagi.setAttribute("id", "usagi");
}
/** 動作地圖 */
const movementMap = [walk, run, prone, dance];
/** 隨機產生一個動作 */
function randomMovement() {
  const randomInt = Math.floor(Math.random() * 4);
  movementMap[randomInt]();
}
/** 被hover時，隨機在bottom 0%~70%之間移動 */
function usagiMove() {
  //random取得０～7０之間任意值，作為bottom值
  const bottom = Math.random() * 70;
  usagiCanvas.style.bottom = bottom + "%";
}

// ----------開始動作------------
createUsagiDiv();
init();
animate();
randomMovement();
setInterval(() => {
  randomMovement();
}, (CanvasMoveTime + 1) * 1000);
