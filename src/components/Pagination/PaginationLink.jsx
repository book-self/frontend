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
                variant="outlined"
                page={page}
                count={totalPages}
                renderItem={(item) => (
                  <PaginationItem
                    {...item}
                    component={"a"}
                    href={`${path}?query=${search}&page=${item.page}`}
                    color="primary"
                    size="large"
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
