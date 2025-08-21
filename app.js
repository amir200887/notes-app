// 
const createButton = document.querySelector(".create-button");
const closeModalBtn = document.querySelector(".close");
const closeXBtn = document.querySelector(".close-x-btn");
const modal = document.querySelector(".modal-screen");
const textarea = document.querySelector("textarea");
const createNoteBtn = document.querySelector(".continue");
const colorsBoxes = document.querySelectorAll(".color-box");
const notesContainer = document.querySelector(".notes-container");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
let allNotes = [];
let mainColor = "#0891b2";

function showModal() {
  modal.classList.remove("hidden");
}

function hideModal() {
  modal.classList.add("hidden");
}

function addNote() {
  const note = textarea.value;
  const id = Math.floor(Math.random() * 100)
  const theNote = {
    id: id,
    title: note,
    color: mainColor
  }
  allNotes.push(theNote)
  textarea.value = ""
  addToLocalstorage(allNotes)
  hideModal()
  showNotes()
}
function addToLocalstorage(k) {
  localStorage.setItem("notes", JSON.stringify(k))
}

function searchInNotes() {
  const searchValue = searchInput.value;
  const notes = document.querySelectorAll(".note");

  notes.forEach(function (note) {
    const noteContentElem = note.querySelector(".note-content");

    if (noteContentElem.innerHTML.includes(searchValue)) {
      note.style.display = "flex";
    } else {
      note.style.display = "none";
    }
  });
}
notesContainer.addEventListener("click", function (e) {
  if (e.target.classList = ("fa fa-trash delete")) {
    const indexx = allNotes.findIndex(function (r) {
      return r.id == e.target.parentElement.parentElement.id
    })
    console.log(indexx);

    allNotes.splice(indexx, 1)
    addToLocalstorage(allNotes)
    showNotes()


  }
})

colorsBoxes.forEach(function (colorBox) {
  colorBox.addEventListener("click", function (event) {
    mainColor = event.target.dataset.color;

    //* Way 1
    // colorsBoxes.forEach(function (item) {
    //   item.classList.remove("selected");
    // });

    //* Way 2
    const selectedColorBox = document.querySelector(".selected");
    selectedColorBox.classList.remove("selected");

    event.target.classList.add("selected");

  });
});

createButton.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", hideModal);
closeXBtn.addEventListener("click", hideModal);
createNoteBtn.addEventListener("click", addNote);
searchInput.addEventListener("keyup", searchInNotes);
document.body.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    hideModal();
  }
});
function showNotes() {
  let Notes = JSON.parse(localStorage.getItem("notes"))
  notesContainer.innerHTML = ""
  if (Notes && Notes.length) {
    allNotes = Notes
    Notes.forEach(function (n) {
      notesContainer.insertAdjacentHTML("beforeend",
        `<article id="${n.id}" class="note"  style="background:${n.color}"><p class="note-content">${n.title}</p><div><i class="fa fa-trash delete"></i></div></article>
`
      )
    })
  }
  else {
    notesContainer.insertAdjacentHTML("beforeend", `<span><h3>هیچ یادداشتی یافت نشد </h3></span>`)
  }
}