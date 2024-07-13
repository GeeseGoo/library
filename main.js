class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	toggleRead() {
		this.read = !this.read;
		renderBooks();
	}
}
class Library {
	#myLibrary = [];
	constructor(defaultLibrary) {
		this.#myLibrary = defaultLibrary;
	}

	addBookToLibrary(title, author, pages, read) {
		this.#myLibrary.push(new Book(title, author, pages, read));
	}

	removeSelf(index) {
		this.#myLibrary.splice(index, 1);
		renderBooks();
	}

	toggleRead(index) {
		this.#myLibrary.toggleRead();
	}

	get myLibrary() {
		return [...this.#myLibrary];
	}
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

function renderBooks() {
	const container = document.querySelector(".books");
	const html = library.myLibrary
		.map(
			(book, index) =>
				`<div class="bookitem">
			<h2 class="info">${book.title}</h2>
            <h2 class="author">By ${book.author}</h2>
			<h2 class="pages">${book.pages} Pages</h2>
			<div class="bookbuttons">
				<button onclick="library.toggleRead(${index})" class="${
					book.read ? "isread" : "notread"
				} add-books book-utility-button"></button>
				<button onclick="library.removeSelf(${index})" class="removebook add-books book-utility-button">
					Remove
				</button>
			</div>
		</div>`
		)
		.join("");

	container.innerHTML = html;
}

function submitBook(e) {
	const modal = document.querySelector("dialog");

	modal.hasAttribute("Open") ? (bookButton.textContent = "Add Book") : (bookButton.textContent = "Close");

	const data = new FormData(form);
	library.addBookToLibrary(data.get("title"), data.get("author"), data.get("pages"), Boolean(data.get("read")));
	form.reset();
	renderBooks();
}

const bookButton = document.querySelector(".bookbutton .add-books");
bookButton.addEventListener("click", toggleBookModal);
const form = document.querySelector("form");
form.addEventListener("submit", submitBook);

const bookGrid = document.querySelector("books");

let defaultLibrary = [
	{
		title: "50 Shades of Grey",
		author: "E.L James",
		pages: 420,
		read: true,
	},
	{
		title: "Call Me By Your Name",
		author: "Andre Aciman",
		pages: 583,
		read: false,
	},
];
let library = new Library(defaultLibrary);
renderBooks();
