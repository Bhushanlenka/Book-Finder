import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      if (data.docs.length === 0) {
        setError("No books found. Try another title.");
        setBooks([]);
      } else {
        setBooks(data.docs.slice(0, 12));
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      {/* Title */}
      <h1 className="app-title">📚 Book Finder</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          className="search-input"
        />
        <button onClick={searchBooks} className="search-button">
          Search
        </button>
      </div>

      {/* Loading & Error */}
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Books Grid */}
      <div className="books-grid">
        {books.map((book, idx) => (
          <div key={idx} className="book-card">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
              />
            ) : (
              <div className="no-cover">No Cover</div>
            )}
            <h2>{book.title}</h2>
            <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
            <p>First published: {book.first_publish_year || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default App;
