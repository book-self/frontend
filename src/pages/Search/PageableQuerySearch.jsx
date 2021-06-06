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
  const [resultPage, setResultPage] = useState({});

  useEffect(() => {
    async function getBooks() {
      setResultPage(await fetchQueryResults(query, page));
    }

    getBooks();
  }, [query, page]);

  const { searchResults, currentPage, totalPages, totalResultCount } = resultPage;

  return (
    <>
      {!searchResults ? (
        <CircularProgress
          style={{ position: "absolute", top: "50vh", left: "50vw" }}
        />
      ) : (
        <SearchTable
          books={searchResults.map((book) => _.pick(book, ["book"])["book"])}
          heading={
            <Typography
              variant="h4"
              style={{ marginBottom: "5rem", lineHeight: "1.5" }}
            >
              Displaying Page {currentPage} / {totalPages} of {totalResultCount} results for{" "}
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
