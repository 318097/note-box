window.onload = () => {
  const localDB = localStorage.getItem("note-box");
  const database = JSON.parse(localDB || "{}");

  const mdFiles = document.querySelectorAll(".Box .Box-body");
  console.log(`markdown body - ${mdFiles.length} matches :`, mdFiles);
  const initialize = () => {
    const links = document.querySelectorAll(".Box .Box-body li a");
    links.forEach(link => {
      const spanElement = document.createElement("span");
      spanElement.setAttribute("class", "checkboxContainer");

      const linkUrl = link.href;
      const isChecked = database[linkUrl];

      const checkbox = document.createElement("input");
      checkbox.checked = isChecked;
      checkbox.setAttribute("type", "checkbox");
      checkbox.setAttribute("class", "checkbox");
      checkbox.setAttribute("data-url", linkUrl);

      spanElement.appendChild(checkbox);

      const listElement = link.closest("li");
      listElement.insertBefore(spanElement, listElement.childNodes[0]);
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
      localStorage.setItem("note-box", JSON.stringify(database));
      console.log("foundd....");
    }
  };
  document.addEventListener("click", handleClick);

  initialize();
};
