const movementDefault = {
	walk: { weight: 1, duration: 25 },
	run: { weight: 1, duration: 16 },
	prone: { weight: 1, duration: 16 },
	dance: { weight: 1, duration: 16 },
	turn: { weight: 1, duration: 16 },
};
/** 根據動作名稱，取得需要設定的Element */
// ----------設定 相關資料------------
/** 取得動作的weight, percent, duration的Element */
function getElements(movement) {
	const weightName = movement + 'Weight';
	const weightShowName = movement + 'WeightShow';
	const percentName = movement + 'Percent';
	const durationName = movement + 'Duration';
	const durationShowName = movement + 'DurationShow';
	return {
		weight: document.getElementById(weightName),
		weightShow: document.getElementById(weightShowName),
		percent: document.getElementById(percentName),
		duration: document.getElementById(durationName),
		durationShow: document.getElementById(durationShowName),
	};
}
/** 監聽weight權重設定(input), 取得目前數字 */
function setWeightEventListener(elements) {
	elements.weight.addEventListener('input', () => {
		setInputShow(elements.weight, elements.weightShow);
		updatePercent();
	});
}
/** 監聽duration權重設定(input), 取得目前數字 */
function setDurationEventListener(elements) {
	elements.duration.addEventListener('input', () => {
		setInputShow(elements.duration, elements.durationShow);
	});
}
/** 設定input的數字 */
function setInputShow(inputElement, showElement) {
	const thumbOffset = getThumbOffset(inputElement);
	showElement.textContent = inputElement.value;
	showElement.style.left = `${thumbOffset}px`;
}
/** 根據權重設定，設定機率 */
function updatePercent() {
	const weightInputs = document.querySelectorAll('input[id$="Weight"]'); //取得input id結尾是Weight的
	const totalWeight = getTotalWeight(weightInputs);
	weightInputs.forEach((input) => {
		const percent = ((input.value / totalWeight) * 100).toFixed(2);
		const elements = getElements(input.id.replace('Weight', ''));
		elements.percent.textContent = `${percent}%`;
	});
}
/** 取得input range的offset */
function getThumbOffset(input) {
	const rangeWidth = input.offsetWidth; //range的寬度
	const valuePercent = (input.value - input.min) / (input.max - input.min);
	const thumbOffset = valuePercent * rangeWidth;
	return thumbOffset;
}
/** 設定一個動作的相關參數：權重顯示、更新機率、監聽其input, 出現時間 */
function setConfig(movement, config) {
	const elements = getElements(movement);
	// 權重相關
	elements.weight.value = config.weight;
	setInputShow(elements.weight, elements.weightShow);
	updatePercent();
	setWeightEventListener(elements);
	// 出現時間相關
	elements.duration.value = config.duration;
	setInputShow(elements.duration, elements.durationShow);
	setDurationEventListener(elements);
}
/** 取得所有權重加總 */
function getTotalWeight(weightInputs) {
	let totalWeight = 0;
	weightInputs.forEach((input) => {
		totalWeight += parseFloat(input.value);
	});
	return totalWeight;
}

// ----------按鈕功能------------
/** 綁定按鈕和function */
function bindButtonFunction(id, func) {
	const button = document.getElementById(id);
	if (button) button.addEventListener('click', func);
}
/** 取得所有input資料 */
function getInputData() {
	const data = structuredClone(movementDefault);

	const weightInputs = document.querySelectorAll('input[id$="Weight"]');
	const durationInputs = document.querySelectorAll('input[id$="Duration"]');

	weightInputs.forEach((input) => {
		data[input.id.replace('Weight', '')]['weight'] = input.value || 1;
	});
	durationInputs.forEach((input) => {
		data[input.id.replace('Duration', '')]['duration'] = input.value || 16;
	});
	return data;
}
/** 重設為程式預設值(將設定寫入chromeStorage) */
function setDefault() {
	Object.keys(movementDefault).forEach((movement) => {
		const config = movementDefault[movement];
		const elements = getElements(movement);
		elements.weight.value = config.weight; //設定權重input
		setInputShow(elements.weight, elements.weightShow); //設定權重show
		elements.duration.value = config.duration; //設定時間input
		setInputShow(elements.duration, elements.durationShow); //設定時間show
	});
	updatePercent();
	// Save to chrome.storage
	chrome.storage.sync.set({ usagiSetting: movementDefault }, () => {
		window.alert('設定為程式預設值成功');
	});
}
/** 重設(取得chromeStorage的設定) */
function reset() {
	chrome.storage.sync.get('usagiSetting', (result) => {
		const config = result.usagiSetting;
		if (!config) {
			window.alert('沒有設定過，請先送出你的設定');
			return;
		}
		Object.keys(config).forEach((movement) => {
			const movementConfig = config[movement];
			const elements = getElements(movement);
			elements.weight.value = movementConfig.weight; //設定權重input
			setInputShow(elements.weight, elements.weightShow); //設定權重show
			elements.duration.value = movementConfig.duration; //設定時間input
			setInputShow(elements.duration, elements.durationShow); //設定時間show
		});
		updatePercent();
		window.alert('重設成功');
	});
}
/** 送出(將設定寫入chrome.storage) */
function submit() {
	const usagiSetting = getInputData();
	chrome.storage.sync.set({ usagiSetting: usagiSetting }, () => {
		window.alert('設定成功');
	});
	// 在home.html上取得設定(測試用)
	// chrome.storage.sync.get(null, (items) => console.log(items));
}

// -------------------------------
// 開始設定相關參數(設定權重顯示數字、出現機率、出現時間)
// 取得chrome.storage的設定
chrome.storage.sync.get('usagiSetting', (result) => {
	const config = result.usagiSetting;
	if (config) {
		// 如果chromeStorage有東西
		Object.keys(config).forEach((movement) => {
			const movementConfig = config[movement];
			setConfig(movement, movementConfig);
		});
	} else {
		// 使用預設值
		Object.keys(movementDefault).forEach((movement) => {
			const movementConfig = movementDefault[movement];
			setConfig(movement, movementConfig);
		});
	}
});

// 綁定按鈕功能
document.addEventListener('DOMContentLoaded', () => {
	// id:function
	const buttonMap = {
		DefaultButton: setDefault, //設定為預設值
		ResetButton: reset, //重設
		SubmitButton: submit, //送出
	};
	Object.keys(buttonMap).forEach((id) => {
		bindButtonFunction(id, buttonMap[id]);
	});
});
