// 引入 main.js
const mainScript = document.createElement('script');
mainScript.setAttribute('type', 'module');
mainScript.setAttribute('src', chrome.runtime.getURL('js/main.js'));
const head =
	document.head ||
	document.getElementsByTagName('head')[0] ||
	document.documentElement;
head.insertBefore(mainScript, head.lastChild);

// 確定main.js已經完全載入
// 這時候在main.js綁定的eventListener才會收到這裡發送的customEvent
window.addEventListener('mainReady', () => {
	// 取得chromeStorage的設定
	chrome.runtime.sendMessage({ type: 'GET_STORAGE' }, (usagiSetting) => {
		if (chrome.runtime.lastError) {
			console.error('Error:', chrome.runtime.lastError.message);
			return;
		}
		// 發送chromeStorage的設定
		const event = new CustomEvent('usagiSetting', {
			detail: usagiSetting,
		});
		window.dispatchEvent(event);
	});
});
