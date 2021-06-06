import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress, Typography } from "@material-ui/core";
import _ from "lodash";

import { SearchTable } from "../../components/SearchTable/SearchTable";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function fetchQueryResults(query, page) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/v1/books/search-pageable?query=${encodeURI(query)}&page=${encodeURI(page)}`
  )
    .then((response) => response.json())
    .then((json) => json);
}

export const PageableQuerySearch = () => {
  const [query] = useState(useQuery().get("query"));
  const [page] = useState(useQuery().get("page"));
  const [books, setBooks] = useState(null);

  useEffect(() => {
    async function getBooks() {
      setBooks(await fetchQueryResults(query, page));
    }

    getBooks();
  }, [query, page]);

  return (
    <>
      {!books ? (
        <CircularProgress
          style={{ position: "absolute", top: "50vh", left: "50vw" }}
        />
      ) : (
        <SearchTable
          books={books.map((book) => _.pick(book, ["book"])["book"])}
          heading={
            <Typography
              variant="h4"
              style={{ marginBottom: "5rem", lineHeight: "1.5" }}
            >
              Displaying the {books.length} most relevant search result
              {books.length !== 1 ? "s" : ""} for{" "}
              <span
                style={{
                  textTransform: "lowercase",
                  fontVariant: "small-caps",
                  fontWeight: "bold",
                }}
              >
                {query}
              </span>
              .
            </Typography>
          }
        />
      )}
    </>
  );
};
