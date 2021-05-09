import { Switch, Route } from "react-router-dom";
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { Profile } from './pages/profile/Profile'
import { NotFound } from './pages/notFound/NotFound'

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
