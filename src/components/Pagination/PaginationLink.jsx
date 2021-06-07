import React from "react";
import { MemoryRouter, Route } from "react-router";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { Grid } from "@material-ui/core";

export const PaginationLink = ({ currentPage, path, search, totalPages }) => {

  return (
    <MemoryRouter initialEntries={[path]} initialIndex={0}>
      <Route>
        {({ location }) => {
          const query = new URLSearchParams(location.search);
          const page = parseInt(query.get("page") || currentPage, 10);
          return (
            <Grid justify="center">
            <Pagination
              size="large"
              page={page}
              count={totalPages}
              renderItem={(item) => (
                <PaginationItem
                  component={"a"}
                  href={`${path}${item.page === page ? "" : `?query=${search}&page=${item.page}`}`}
                  {...item}
                  color="primary"
                  size="large"
                  selected={item.page===page}
                />
              )}
            />
            </Grid>
          );
        }}
      </Route>
    </MemoryRouter>
  );
}
