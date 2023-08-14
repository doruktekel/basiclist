import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";

const Table = ({ books }) => {
  return (
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
  );
};

const Books = ({ onclickForm }) => {
  const [books, setBooks] = useState([]);
  const [isLooding, setIsloading] = useState(false);

  const onsubmit = (e) => {
    setIsloading(true);
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
          setIsloading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsloading(true);
    const cancelToken = axios.CancelToken.source();

    axios
      .get("http://localhost:3005/books", { cancelToken: cancelToken.token })
      .then((response) => {
        setBooks(response.data);
        setIsloading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request cancel edildi.");
        } else {
          console.log("Error", error);
        }
      });

    const sayac = setInterval(() => {
      console.log("asdasdasd");
    }, 1000);

    return () => {
      clearInterval(sayac);
      cancelToken.cancel("token source was cancelled");
    };
  }, []);

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
      {books.length > 0 && !isLooding ? (
        <Table books={books} />
      ) : (
        <h2>Yükleniyor...</h2>
      )}
      <button onClick={onclickForm}>Form sayfasina git</button>
    </div>
  );
};

export default Books;
export { Table };
