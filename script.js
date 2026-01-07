const myLibrary = [];

const libraryEl = document.getElementById("library");
const dialog = document.getElementById("bookDialog");
const form = document.getElementById("bookForm");

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function renderLibrary() {
  libraryEl.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.dataset.id = book.id;

    card.innerHTML = `
<strong>${book.title}</strong>
<div class="meta">${book.author}</div>
<div class="meta">${book.pages} pages</div>
<div class="meta">${book.read ? "Read" : "Not read"}</div>
<div class="card-actions">
<button class="toggle">Toggle Read</button>
<button class="remove">Remove</button>
</div>
`;

    card.querySelector(".toggle").addEventListener("click", () => {
      book.toggleRead();
      renderLibrary();
    });

    card.querySelector(".remove").addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      myLibrary.splice(index, 1);
      renderLibrary();
    });

    libraryEl.appendChild(card);
  });
}

// Dialog controls
document.getElementById("newBookBtn").addEventListener("click", () => {
  dialog.showModal();
});

document.getElementById("cancelDialog").addEventListener("click", () => {
  form.reset();
  dialog.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addBookToLibrary(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.read.checked
  );

  form.reset();
  dialog.close();
  renderLibrary();
});
