function messenger(action, cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs =>
    chrome.tabs.sendMessage(tabs[0].id, { action }, cb)
  );
}

function getData(key, cb) {
  chrome.storage.sync.get(key, cb);
  // cb({
  //   notes: {
  //     "linked.com": [
  //       { id: 1, content: "linkedin notes", createdAt: new Date() },
  //       { id: 2, content: "linkedin notes 2", createdAt: new Date() },
  //       { id: 3, content: "linkedin notes 3", createdAt: new Date() }
  //     ],
  //     others: [
  //       { id: 1, content: "Other notes", createdAt: new Date() },
  //       { id: 2, content: "Other notes 2", createdAt: new Date() },
  //       { id: 3, content: "Other notes 3", createdAt: new Date() }
  //     ]
  //   }
  // });
}

export { messenger, getData };
