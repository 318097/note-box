const notes = [];

const header = document.querySelector(".header");
const noteListContainer = document.querySelector(".noteList");
const textbox = document.querySelector(".inputbox");
const addNoteButton = document.querySelector(".addNote");

const getDomain = () => {
  const url = window.location.href;
  const arr = url.split("/");
  return arr[0] + "//" + arr[2];
};

const renderNotes = () => {
  const output = notes.map(note => {
    const element = document.createElement("div");
    element.setAttribute("class", "item");
    element.innerHTML = note.content;
    return element;
  });

  if (output.length) noteListContainer.appendChild(...output);
};

const handleClick = () => {
  const content = textbox.value;
  if (!content) return;

  notes.push({ id: 23, content });
  textbox.value = "";
  console.log(notes);
  renderNotes();
};

const initialize = () => {
  const url = getDomain();
  header.innerHTML = url;
  addNoteButton.addEventListener("click", handleClick);
  renderNotes();
};
initialize();
// chrome.storage.sync.get("color", function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute("value", data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function(
//     tabs
//   ) {
//     chrome.tabs.executeScript(tabs[0].id, {
//       code: 'document.body.style.backgroundColor = "' + color + '";'
//     });
//   });
// };
