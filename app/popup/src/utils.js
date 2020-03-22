function messenger(action, cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs =>
    chrome.tabs.sendMessage(tabs[0].id, { action }, cb)
  );
}

function getData(key, cb) {
  chrome.storage.sync.get(key, cb);
}

export { messenger, getData };
