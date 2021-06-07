import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import _ from "lodash";

import { SearchTable } from "../../components/SearchTable/SearchTable";
import { PaginationLink } from "../../components/Pagination/PaginationLink";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function fetchQueryResults(query, page) {
    const endpoint = `${process.env.REACT_APP_API_URL}/v1/books/search-paginated`;
    const q = query ? `query=${encodeURI(query)}` : "";
    const p = page ? `page=${page}` : "";
    return fetch(`${endpoint}?${q}&${p}`)
            .then((response) => response.json())
            .then((json) => json);
}

export const PaginatedQuerySearch = () => {
  const [query] = useState(useQuery().get("query"));
  const [page] = useState(useQuery().get("page"));
  const [resultPage, setResultPage] = useState({});
  const history = useHistory();
  
  if (!query) history.push("/");

  useEffect(() => {
    async function getBooks() {
        setResultPage(await fetchQueryResults(query, page));
    }

    getBooks();
  }, [query, page]);

  const { searchResults, currentPage, totalPages } = resultPage;

  return (
    <Grid container spacing={1}>
      <Grid>
        {!searchResults ? (
          <CircularProgress
            style={{ position: "absolute", top: "50vh", left: "50vw" }}
          />
        ) : (
          <SearchTable
            query={query}
            currentPage={currentPage}
            totalPages={totalPages}
            books={searchResults.map((book) => _.pick(book, ["book"])["book"])}
            heading={
              <Typography
                variant="h4"
                style={{ marginBottom: "5rem", lineHeight: "1.5" }}
              >
                Search results for{" "}
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
      </Grid>
      <Grid container alignItems="center" justify="center">
        <PaginationLink
          currentPage={currentPage}
          path="/search"
          search={query}
          totalPages={totalPages}
        />
      </Grid>
    </Grid>
  );
};
