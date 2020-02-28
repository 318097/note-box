const getDomain = () => {
  const url = window.location.href;
  const arr = url.split("/");
  return arr[2];
};

chrome.runtime.onMessage.addListener((request, sender, senderResponse) => {
  switch (request.action) {
    case "getURL":
      senderResponse(getDomain());
      break;
    case "logData":
      chrome.storage.sync.get("notes", data => console.log("NoteBox:", data));
  }
});
