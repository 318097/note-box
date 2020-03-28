const getDomain = () => {
  const url = window.location.href;
  const arr = url.split("/");
  return arr[2];
};

chrome.runtime.onMessage.addListener(
  ({ action, data }, sender, senderResponse) => {
    switch (action) {
      case "getURL":
        senderResponse(getDomain());
        break;
      case "log":
        if (data) console.log("LOG", data);
        else
          chrome.storage.sync.get("notes", data =>
            console.log("NoteBox:", data)
          );
        break;
      case "clear":
        chrome.storage.sync.clear();
        console.log("Cleared..");
        break;
    }
  }
);
