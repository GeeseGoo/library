const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
	myLibrary.push(new Book(title, author, pages, read));
}

function toggleBookModal() {
	const modal = document.querySelector("dialog");

	if (modal.hasAttribute("Open")) {
		modal.removeAttribute("Open");
		bookButton.textContent = "Add Book";
	} else {
		bookButton.textContent = "Close";
		modal.setAttribute("Open", "");
	}
}

function submitBook(e) {
	const modal = document.querySelector("dialog");

	modal.hasAttribute("Open") ? (bookButton.textContent = "Add Book") : (bookButton.textContent = "Close");

	const data = new FormData(form);
	addBookToLibrary(data.get("title"), data.get("author"), data.get("pages"), Boolean(data.get("read")));
	console.table(myLibrary);
	form.reset();
	renderBooks();
}

function removeSelf(index) {
	myLibrary.splice(index, 1);
	renderBooks();
}

function toggleRead(index) {
	myLibrary[index].read = !myLibrary[index].read;
	renderBooks();
}

function renderBooks() {
	const container = document.querySelector(".books");
	const html = myLibrary
		.map(
			(book, index) =>
				`<div class="bookitem">
			<h2 class="info">${book.title}</h2>
			<h2 class="pages">${book.pages} Pages</h2>
			<div class="bookbuttons">
				<button onclick="toggleRead(${index})" class="${
					book.read ? "isread" : "notread"
				} add-books book-utility-button"></button>
				<button onclick="removeSelf(${index})" class="removebook add-books book-utility-button">
					Remove
				</button>
			</div>
		</div>`
		)
		.join("");

	container.innerHTML = html;
}
const bookButton = document.querySelector(".bookbutton .add-books");
bookButton.addEventListener("click", toggleBookModal);
const form = document.querySelector("form");
form.addEventListener("submit", submitBook);

const bookGrid = document.querySelector("books");

addBookToLibrary("50 Shades of Grey", "E.L James", 420, true);
addBookToLibrary("Call Me By Your Name", "Andre Aciman", 583, false);
renderBooks();
