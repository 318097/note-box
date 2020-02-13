window.onload = () => {
  const localDB = localStorage.getItem("note-box");
  const database = JSON.parse(localDB || "{}");
  // document.body.style.backgroundColor = "#f2f2f2";
  console.log("Hi, from chrome link..");
  const listCollection = document.querySelectorAll("ol");

  listCollection.forEach(list => {
    const links = list.querySelectorAll("li a");
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
      checkbox.onchange = e => {
        const key = e.target.getAttribute("data-url");
        const checkedValue = e.target.checked;
        database[key] = checkedValue;
        localStorage.setItem("note-box", JSON.stringify(database));
      };

      spanElement.appendChild(checkbox);

      const listElement = link.parentNode.parentNode;
      listElement.append(spanElement);
    });
  });
};
