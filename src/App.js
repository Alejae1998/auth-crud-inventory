import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import { BrowserRouter as Router, Switch, NavLink, Route, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import ListRestaurant from './ListPage';
import UpdatePage from './UpdatePage';
import './App.css';
import { logout } from './services/fetch-utils';
import CreateRestaurant from './CreatePage';

export default function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();

      if (user) {
        setToken(user.access_token);
        setEmail(user.user.email);
      }
    }
    loadUser();
  }, []);

  async function handleLogout() {
    await logout();

    setEmail('');
    setToken('');
  }

  return (
    <Router>
      <div className="App">
        <header>
          {token && (
            <>
              <NavLink exact activeClassName="active-link" to="/restaurants">
                Restaurants List
              </NavLink>
              <NavLink exact activeClassName="active-link" to="/create">
                Create Page
              </NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </header>
        <main>
          <p>User: {email}</p>
          <p>Click on a restaurant to update it</p>
          <Switch>
            <Route exact path="/">
              {token ? (
                <Redirect to="/restaurants" />
              ) : (
                <AuthPage setEmail={setEmail} setToken={setToken} />
              )}
            </Route>
            <Route exact path="/restaurants">
              {token ? <ListRestaurant /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/restaurants/:id">
              {token ? <UpdatePage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/create">
              {token ? <CreateRestaurant /> : <Redirect to="/" />}

            </Route>

          </Switch>
        </main>
      </div>
    </Router>
  );
}