chrome.runtime.onMessage.addListener(
  ({ action, data }, sender, senderResponse) => {
    switch (action) {
      case "getURL":
        senderResponse({
          url: window.location.hostname,
          absUrl: window.location.href,
        });
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
