import React, { useRef } from "react";
import { withRouter } from "react-router-dom";

function Login(props) {
  const inputEmailRef = useRef();
  const inputPassRef = useRef();

  return (
    <form
      onSubmit={props.onLogin}
      className="login"
      method="post"
      name="login"
      noValidate
    >
      <h1 className="login__title">Вход</h1>
      <input
        ref={inputEmailRef}
        id="login__email"
        type="text"
        value={
          inputEmailRef.current
            ? props.emailAndPassSetterLoginValues[inputEmailRef.current.name] ||
              ""
            : ""
        }
        onChange={props.handleOnChange}
        name="emailLogin"
        placeholder="Email"
        className="login__email"
        minLength="2"
        maxLength="40"
        required
      ></input>
      <div className="login__line" />
      <input
        ref={inputPassRef}
        id="login__password"
        type="password"
        value={
          inputPassRef.current
            ? props.emailAndPassSetterLoginValues[inputPassRef.current.name] ||
              ""
            : ""
        }
        onChange={props.handleOnChange}
        name="passwordLogin"
        placeholder="Password"
        className="login__password"
        minLength="2"
        maxLength="200"
        required
      ></input>
      <div className="login__line" />
      <button type="submit" className="login__register">
        Войти
      </button>
    </form>
  );
}

export default withRouter(Login);
