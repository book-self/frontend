import { Switch, Route } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { QuerySearch } from './pages/Search/QuerySearch';
import { GenreSearch } from './pages/Search/GenreSearch'
import { Book } from './pages/Book/Book';
import { NotFound } from './pages/NotFound/NotFound';


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
