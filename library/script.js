const myLibrary = [];
class Book {
  constructor(title, author, status,  id = crypto.randomUUID()) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.status = status;
  }
}

// Extract initial books from HTML table
function loadInitialBooks() {
 document.querySelectorAll('tbody tr').forEach(row => {
    const [title, author, statusCell] = row.cells;
    const status = statusCell.querySelector('.status').textContent.toLowerCase().replace('-', '');
    const id = `static-${crypto.randomUUID()}`;
    row.dataset.id = id;
    myLibrary.push(new Book(title.textContent, author.textContent, status, id));
  });
}

// Add Book to the library
function addBookToLibrary(title, author, status) {
  myLibrary.push(new Book(title, author, status));
}

// Display books in table
function displayBooks() {
  const tbody = document.querySelector('tbody');
  document.querySelectorAll('tr[data-id]').forEach(row => row.remove());
  myLibrary.forEach(book => {
    if (!document.querySelector(`tr[data-id="${book.id}"]`)) {
      const row = document.createElement('tr');
      row.dataset.id = book.id;
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
  document.querySelectorAll('.delete-btn').forEach(btn =>
    btn.onclick = () => {
      deleteBook(btn.dataset.id);
      displayBooks();
    }
  );
}

// Delete Book Function
function deleteBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  loadInitialBooks();
  displayBooks();
});

// Form Submission Handler
document.getElementById('book-form').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const status = document.getElementById('status').value.trim();
  if (title && author && status) {
    addBookToLibrary(title, author, status);
    displayBooks();
  } else {
    alert('Please fill in all the fields');
  }
});
