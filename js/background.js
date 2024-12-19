chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'GET_STORAGE') {
		chrome.storage.sync.get(null, (items) => {
			sendResponse(items.usagiSetting);
		});
		return true;
	}
});
