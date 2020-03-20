function messenger(action, cb) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs =>
    chrome.tabs.sendMessage(tabs[0].id, { action }, cb)
  );
  // cb();
}

function getData(key, cb) {
  chrome.storage.sync.get(key, cb);
  // cb({
  //   notes: {
  //     "linked.com": [
  //       { id: 1, content: "linkedin notes", createdAt: new Date() },
  //       { id: 2, content: "linkedin notes 2", createdAt: new Date() },
  //     ],
  //     others: [
  //       { id: 1, content: "Other notes", createdAt: new Date() },
  //       {
  //         id: 2,
  //         content:
  //           "Other notes lsdkf ljkdf klsdj jlksd ljkadjsf lksdfj lkdsklf j lksdfjlkjdklf klsjdlkf slkdjf klsdjf  2",
  //         createdAt: new Date()
  //       },
  //       { id: 3, content: "Other notes 3", createdAt: new Date() },
  //       { id: 4, content: "Other notes 4", createdAt: new Date() },
  //       { id: 5, content: "Other notes 5", createdAt: new Date() },
  //       { id: 6, content: "Other notes 6", createdAt: new Date() },
  //       { id: 7, content: "Other notes 7", createdAt: new Date() },
  //       { id: 8, content: "Other notes 8", createdAt: new Date() },
  //       { id: 9, content: "Other notes 9", createdAt: new Date() },
  //       { id: 10, content: "Other notes 10", createdAt: new Date() }
  //     ]
  //   }
  // });
}

export { messenger, getData };
