const config = {
  dbName: "note-box"
};

const getDomain = () => {
  const url = window.location.href;
  const arr = url.split("/");
  return arr[0] + "//" + arr[2];
};

window.onload = () => {
  const localDB = localStorage.getItem(config.dbName);
  const database = JSON.parse(localDB || "{}");

  // const mdFiles = document.querySelectorAll(".Box .Box-body");
  // console.log(`markdown body - ${mdFiles.length} matches :`, mdFiles);

  const initialize = () => {
    const listElements = document.querySelectorAll(".Box .Box-body li");
    listElements.forEach(listElement => {
      const link = listElement.querySelector("a");
      if (link) {
        const spanElement = document.createElement("span");
        spanElement.setAttribute("class", "checkboxContainer");

        const linkUrl = link.href;
        const isChecked = database[linkUrl];

        if (isChecked) {
          listElement.setAttribute("class", "finished");
        }

        const checkbox = document.createElement("input");
        checkbox.checked = isChecked;
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("class", "checkbox");
        checkbox.setAttribute("data-url", linkUrl);

        spanElement.appendChild(checkbox);

        listElement.insertBefore(spanElement, listElement.childNodes[0]);
      }
    });
  };

  const handleClick = event => {
    if (
      event.target.type === "checkbox" &&
      event.target.className === "checkbox"
    ) {
      const key = event.target.getAttribute("data-url");
      const checkedValue = event.target.checked;
      database[key] = checkedValue;
      localStorage.setItem(config.dbName, JSON.stringify(database));
    }
  };
  document.addEventListener("click", handleClick);

  /* ======================= */
  const url = getDomain();
  if (url.includes("github")) initialize();
};
