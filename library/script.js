
const myLibrary = [];

class Book {
  constructor(title, author, status) {
    this.title = title;
    this.author = author;
    this.id = crypto.randomUUID();
    this.status = status;
  }
}

// Extract initial books from HTML table
function loadInitialBooks() {
  const tableRows = document.querySelectorAll('tbody tr');
  tableRows.forEach(row => {
    const title = row.cells[0].textContent;
    const author = row.cells[1].textContent;
    const status = row.cells[2]
      .querySelector('.status')
      .textContent.toLowerCase().replace('-', '');
    const id = `static-${crypto.randomUUID()}`;
    row.dataset.id = id; // Mark the original row
    myLibrary.push(new Book(title, author, status, id));
  });
}

// Loading DOM
document.addEventListener('DOMContentLoaded', function () {
  loadInitialBooks();
  displayBooks();
});

// Form Submission Handler
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const status = document.getElementById('status').value;

  if (title && author && status) {
    addBookToLibrary(title, author, status);
    displayBooks();
  } else {
    alert('Please fill in all the fields');
  }
});

// Adding Book to the library
function addBookToLibrary(title, author, status) {
  const book = new Book(title, author, status);
  myLibrary.push(book);
  return book;
}

function displayBooks() {
  const tbody = document.querySelector('tbody');
  // Remove only dynamically added rows (identified by data-id)
  document.querySelectorAll('tr[data-id]').forEach(row => row.remove());

  // Add only new books (those not already in the table)
  myLibrary.forEach(book => {
    if (!document.querySelector(`tr[data-id="${book.id}"]`)) {
      const row = document.createElement('tr');
      row.dataset.id = book.id; // Mark row with book ID
      row.innerHTML = `
        <td>${book.title}</td>
        <td class="link">${book.author}</td>
        <td><span class="status ${book.status === 'read' ? 'read' : 'not-read'}">
          ${book.status === 'read' ? 'Read' : 'Not Read'}
        </span></td>
        <td><button class="delete-btn" data-id="${book.id}">Delete</button></td>
      `;
      tbody.appendChild(row);
    }
  });

  // Add event listeners
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const bookID = this.getAttribute('data-id');
      deleteBook(bookID);
      displayBooks();
    });
  });
}

// Delete Book Function
function deleteBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}
