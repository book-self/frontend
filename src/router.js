import { Switch, Route } from "react-router-dom";
import { Home } from './pages/Home/Home'
import { SignIn } from './pages/SignIn/SignIn'
import { SignUp } from './pages/SignUp/SignUp'
import { Profile } from './pages/Profile/Profile'
import { NotFound } from './pages/NotFound/NotFound'

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
