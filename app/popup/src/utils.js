function messenger(payload, cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) =>
    chrome.tabs.sendMessage(tabs[0].id, payload, cb)
  );
}

function getDataFromStorage(key, cb) {
  chrome.storage.sync.get([key], cb);
}

function setDataInStorage(key, value) {
  chrome.storage.sync.set({ [key]: value });
}

export { messenger, getDataFromStorage, setDataInStorage };
