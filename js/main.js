import { gsap } from 'https://cdn.skypack.dev/gsap';
import { usagiCanvas, initThree, animate, initializeMove } from './three3d.js';
/** 設定烏薩奇動作(取得動作地圖才執行以下這些項目) */
function setUsagi(usagiSetting) {
	const MovementMap = initializeMove(usagiSetting);
	/** 動作總權重 */
	const TotalWeight = MovementMap.reduce(
		(sum, movement) => sum + movement.weight,
		0
	);
	/** 建立usagi div (#usagi) */
	function createUsagiDiv() {
		const usagi = document.createElement('div');
		usagi.setAttribute('id', 'usagi');
		//加到body內
		document.body.appendChild(usagi);
	}

	/** 隨機產生一個動作 並 回傳目前動作的config */
	function randomMovement() {
		const randomValue = Math.random() * TotalWeight;
		// console.log('randomValue: ', randomValue);
		let cumulativeWeight = 0; //計算累加器
		for (const movement of MovementMap) {
			cumulativeWeight += movement.weight;
			if (randomValue < cumulativeWeight) {
				movement.animate();
				return movement;
			}
		}
		return MovementMap[0]; //防止計算意外，回傳第一個動作(走)
	}
	/** 瞬間移動：隨機在bottom 0%~70%之間移動 */
	function usagiMove() {
		//random取得０～7０之間任意值，作為bottom值
		const bottom = Math.random() * 70;
		usagiCanvas.style.bottom = bottom + '%';
	}

	/** 整體開始動作(每經過各自的秒數後換下一個) */
	function animateSequence() {
		gsap.globalTimeline.clear(); // Clear all animations
		const movement = randomMovement();

		gsap.delayedCall(movement.duration + 1, animateSequence);
	}

	// ----------開始動作------------
	createUsagiDiv();
	initThree();
	animate();
	usagiCanvas.addEventListener('click', usagiMove);
	animateSequence();
}

// 通知content.js main.js已經完全載入
const readyEvent = new Event('mainReady');
window.dispatchEvent(readyEvent);

// 取得content.js傳進來的chrome.storage的資料
window.addEventListener('usagiSetting', (event) => {
	console.log('main.js usagiSetting:', event.detail);

	const usagiSetting = event.detail;
	setUsagi(usagiSetting);
});
