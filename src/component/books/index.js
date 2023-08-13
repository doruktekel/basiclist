import React, { useState } from "react";
import "./index.scss";
import axios from "axios";

const Books = () => {
  const onsubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
    };

    axios
      .post("http://localhost:3005/books", data)
      .then((response) => {
        alert(`${response.data.title} book added`);
        axios.get("http://localhost:3005/books").then((response) => {
          setBooks(response.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [books, setBooks] = useState([]);

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={onsubmit} className="form-parent">
          <input
            type="text"
            name="title"
            placeholder="Write Title"
            className="form-child"
          />
          <input
            type="text"
            name="content"
            placeholder="Write Content"
            className="form-child"
          />
          <button type="submit" className="form-btn">
            Submit
          </button>
        </form>
      </div>
      <div className="list">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.content}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
