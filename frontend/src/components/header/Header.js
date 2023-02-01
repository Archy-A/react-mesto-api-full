import React from "react";
import { useHistory, Route, Switch, Link } from "react-router-dom";

function Header({ loggedIn, email, setLoggedIn }) {
  const history = useHistory();

  function handleSubmmit() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__container">
        <Switch>
          <Route exact path="/">
            <div
              className={`header__email ${loggedIn ? "" : "element-hidden"} `}
            >
              {email}
            </div>
            <button
              onClick={handleSubmmit}
              className={`header__exit ${loggedIn ? "" : "element-hidden"} `}
            >
              Выйти
            </button>
          </Route>
          <Route exact path="/sign-in">
            <Link className="header__login" to="/sign-up">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/sign-up">
            <Link className="header__login" to="/sign-in">
              Войти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
