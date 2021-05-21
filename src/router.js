import { Switch, Route } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Profile } from './pages/Profile/Profile';
import { QuerySearch } from './pages/Search/QuerySearch';
import { GenreSearch } from './pages/Search/GenreSearch'
import { Book } from './pages/Book/Book'
import { BookList } from './pages/BookList/BookList'
import { SignIn } from './pages/SignIn/SignIn'
import { SignUp } from './pages/SignUp/SignUp'
import { NotFound } from './pages/NotFound/NotFound'
import {BookList} from './components/bookList/bookListDisplay/BookList'

export const Router = () => {
  const routes = [
    {
      path: "/",
      component: Home
    },
    {
      path: "/signin",
      component: SignIn
    },
    {
      path: "/signup",
      component: SignUp
    },
    {
      path: "/profile",
      component: Profile
    },
    {
      path: "/profile/book-list",
      component: BookList
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
      path: "/book/:id",
      component: Book
    },
    {
      path:"/book-list/:id",
      component: BookList
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
          render={props => (
            <route.component {...props} routes={route.routes} />
          )}
        />
      ))}
    </Switch>
  );
}
