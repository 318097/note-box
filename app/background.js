const setBadge = (url) => {
  console.log("url", url);
  if (!url) return chrome.action.setBadgeText({ text: "" }, () => null);

  chrome.storage.sync.get("notes", ({ notes = [] } = {}) => {
    const count = notes.reduce(
      (sum, note) => (url === note.url ? sum + 1 : sum),
      0
    );
    chrome.action.setBadgeText(
      { text: count ? String(count) : "" },
      () => null
    );
  });
};

chrome.tabs.onActivated.addListener((o) => {
  chrome.tabs.get(o.tabId, (tab) => {
    console.log("tab url", tab, tab.url);
    const ob = new URL(tab.url);
    setBadge(ob.hostname);
  });
});

// chrome.tabs.onUpdated.addListener((tabId) => {
//   chrome.tabs.sendMessage(tabId, { action: "getURL" }, ({ url } = {}) => {
//     setBadge(url);
//   });
// });
