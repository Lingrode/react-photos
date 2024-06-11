import React from "react";
import "./index.scss";

import { Collection } from "./Collection";

const cats = [
  { name: "All" },
  { name: "Sea" },
  { name: "Mountains" },
  { name: "Architecture" },
  { name: "Cities" },
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : "";

    fetch(
      `https://663c26aa17145c4d8c354a8e.mockapi.io/photos?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, idx) => (
            <li
              onClick={() => setCategoryId(idx)}
              className={categoryId === idx ? "active" : ""}
              key={idx}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Search by name"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, idx) => (
              <Collection key={idx} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, idx) => (
          <li
            key={idx}
            className={page === idx + 1 ? "active" : ""}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
