chrome.runtime.onMessage.addListener(
  ({ action, data }, sender, senderResponse) => {
    switch (action) {
      case "getURL":
        senderResponse(window.location.hostname);
        break;
      case "log":
        if (data) console.log("LOG", data);
        else
          chrome.storage.sync.get("notes", (data) =>
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
