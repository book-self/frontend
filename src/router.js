import { Switch, Redirect, Route } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Profile } from './pages/Profile/Profile';
import { QuerySearch } from './pages/Search/QuerySearch';
import { GenreSearch } from './pages/Search/GenreSearch'
import { Book } from './pages/Book/Book'
import { SignIn } from './pages/SignIn/SignIn'
import { SignUp } from './pages/SignUp/SignUp'
import { NotFound } from './pages/NotFound/NotFound'
import { BookList } from './pages/BookList/BookList'
import { ShelfPage } from "./pages/Shelf/ShelfPage";
import { List } from "./pages/BookList/List";

export const Router = () => {
  const routes = [
    {
      path: "/",
      component: Home
    },
    {
      path: "/signin",
      component: SignIn,
      auth: false
    },
    {
      path: "/signup",
      component: SignUp,
      auth: false
    },
    {
      path: "/profile",
      component: Profile,
      auth: true
    },
    {
      path: "/profile/book-list/:listId",
      component: BookList,
      auth: true
    },
    {
      path: "/search",
      component: QuerySearch
    },
    {
      path: "/search/:genre",
      component: GenreSearch
    },
    {
      path: "/book/:bookId",
      component: Book
    },
    {
      path: "/shelf",
      component: List,
      auth: true
    },
    {
      path: "/shelves",
      component: ShelfPage,
      auth: true
    },
    {
      path: "*",
      component: NotFound
    }
  ];

  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact
          render={props =>
            route.auth === undefined ? (
              // any auth ok
              <route.component {...props} routes={route.routes} />
            ) : (
              route.auth ? (
                // auth required
                localStorage.getItem('token') ? (
                  <route.component {...props} routes={route.routes} />
                ) : (
                  <Redirect
                    to={{ pathname: '/signin', state: { from: props.location } }}
                  />
                )
              ) : (
                // no auth required
                !localStorage.getItem('token') ? (
                  <route.component {...props} routes={route.routes} />
                ) : (
                  <Redirect
                    to={{ pathname: '/profile', state: { from: props.location } }}
                  />
                )
              )
            )
          }
        />
      ))}
    </Switch>
  );
}
