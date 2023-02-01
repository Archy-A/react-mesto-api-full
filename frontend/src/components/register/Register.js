import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

function Register(props) {
  const inputEmailRegRef = useRef();
  const inputPassRegRef = useRef();

  return (
    <form
      onSubmit={props.onRegister}
      className="login"
      method="post"
      name="login"
      noValidate
    >
      <h1 className="login__title">Регистрация</h1>
      <input
        ref={inputEmailRegRef}
        id="login__email"
        type="text"
        value={
          inputEmailRegRef.current
            ? props.emailAndPassSetterRegValues[
                inputEmailRegRef.current.name
              ] || ""
            : ""
        }
        onChange={props.handleOnChange}
        name="emailReg"
        placeholder="Email"
        className="login__email"
        minLength="2"
        maxLength="40"
        required
      ></input>
      <div className="login__line" />
      <input
        ref={inputPassRegRef}
        id="login__password"
        type="password"
        value={
          inputPassRegRef.current
            ? props.emailAndPassSetterRegValues[inputPassRegRef.current.name] ||
              ""
            : ""
        }
        onChange={props.handleOnChange}
        name="passwordReg"
        placeholder="Password"
        className="login__password"
        minLength="2"
        maxLength="200"
        required
      ></input>
      <div className="login__line" />
      <button type="submit" className="login__register">
        Зарегистрироваться
      </button>
      <NavLink to="/sign-in" className="login__redirect">
        Уже зарегистрированы? Войти
      </NavLink>
    </form>
  );
}

export default withRouter(Register);
