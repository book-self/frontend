import { Switch, Route } from "react-router-dom";
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Profile } from './pages/profile/Profile';
import { QuerySearch } from './pages/search/QuerySearch';
import { GenreSearch } from './pages/search/GenreSearch'
import { Book } from './pages/book/Book';
import { NotFound } from './pages/notFound/NotFound';

export const Router = () => {
  const routes = [
    {
      path: "/",
      component: Home
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/profile",
      component: Profile
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
