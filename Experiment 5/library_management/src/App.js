import { useEffect, useState } from "react";

const API = "http://localhost:3001/books";


function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: "", author: "", year: "", isbn: "" });
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH ALL BOOKS ----------------
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ---------------- HANDLE FORM INPUT ----------------
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------- CREATE BOOK ----------------
  const createBook = e => {
    e.preventDefault();
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(newBook => {
        setBooks([...books, newBook]);
        setFormData({ title: "", author: "", year: "", isbn: "" });
      });
  };

  // ---------------- UPDATE BOOK ----------------
  const updateBook = e => {
    e.preventDefault();
    fetch(`${API}/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(updated => {
        setBooks(books.map(b => (b.id === updated.id ? updated : b)));
        setEditing(null);
        setFormData({ title: "", author: "", year: "", isbn: "" });
      });
  };

  // ---------------- DELETE BOOK ----------------
  const deleteBook = id => {
    fetch(`${API}/${id}`, { method: "DELETE" }).then(() => {
      setBooks(books.filter(book => book.id !== id));
    });
  };

  // ---------------- FILTER BOOKS ----------------
  const filteredBooks = books.filter(b =>
    [b.title, b.author, b.isbn].some(field =>
      field?.toLowerCase().includes(query.toLowerCase())
    )
  );

  // ---------------- HANDLE EDIT ----------------
  const handleEdit = book => {
    setEditing(book);
    setFormData(book);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>📚 Library Management UI</h1>
      <p>React + JSON Server • CRUD • Search • Hooks</p>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title, author or ISBN..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: "100%", padding: "10px", margin: "20px 0" }}
      />

      {/* Form */}
      <form onSubmit={editing ? updateBook : createBook} style={{ marginBottom: "20px" }}>
        <h2>{editing ? "Update Book" : "Add New Book"}</h2>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          type="number"
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button type="submit" style={{ padding: "10px 20px", marginRight: 10 }}>
          {editing ? "Update Book" : "Add Book"}
        </button>

        {editing && (
          <button onClick={() => setEditing(null)} style={{ padding: "10px 20px" }}>
            Cancel
          </button>
        )}
      </form>

      {/* Book List */}
      <h2>Book List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        filteredBooks.map(book => (
          <div
            key={book.id}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>
              <strong>{book.title}</strong>
              <p>{book.author}</p>
              <small>{book.year} • {book.isbn}</small>
            </div>

            <div>
              <button onClick={() => handleEdit(book)} style={{ marginRight: 10 }}>
                Edit
              </button>
              <button onClick={() => deleteBook(book.id)} style={{ color: "red" }}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
