import "../index.css";

import React, { useEffect, useState } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import useForm from "../hooks/useForm";

import * as auth from "../utils/Auth";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";

import CardRemoveConfirmationPopup from "./card_remove_confirmation_popup/CardRemoveConfirmationPopup";
import EditProfilePopup from "./edit_profile_popup/EditProfilePopup";
import EditAvatarPopup from "./edit_avatar_popup/EditAvatarPopup.js";
import AddPlacePopup from "./add_place_popup/AddPlacePopup";

import Login from "./login/Login";
import Register from "./register/Register";
import InfoTooltip from "./info_tooltip/InfoTooltip";
import ProtectedRoute from "./protected_route/ProtectedRoute";

import ImagePopup from "./image_popup/ImagePopup";
import api from "../utils/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";
import { CardDeleteContext } from "../contexts/CardDeleteContext";

const alertMessage =
  "Уууупс... что-то произошло на сервере, попробуй чуть позже. Код ошибки:";

function App(props) {
  document.body.style = "background: black;";

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardRemoveConfirmationPopup, setIsCardRemoveConfirmationPopup] =
    useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);

  const emailLogin = "emailLogin";
  const passwordLogin = "passwordLogin";
  const emailAndPassSetterLogin = useForm({
    emailLogin: "",
    passwordLogin: "",
  });
  const emailReg = "emailReg";
  const passwordReg = "passwordReg";
  const emailAndPassSetterReg = useForm({ emailReg: "", passwordReg: "" });

  function getCardsFromServer() {
    return api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
        window.alert(`${alertMessage} ${err}`);
      });
  }

  function handleCardLike(card, e) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((oldCardsStates) =>
          oldCardsStates.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
        window.alert(`${alertMessage} ${err}`);
      });
    e.stopPropagation();
  }

  function handleDeleteClick(card, e) {
    const isOwner = card.owner._id === currentUser._id;
    if (isOwner === true) {
      api
        .deleteCard(card._id)
        .then((card) => {
          setCards((oldCardsStates) =>
            oldCardsStates.filter((c) => c._id !== card._id)
          );
          getCardsFromServer();
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
          window.alert(`${alertMessage} ${err}`);
        });
    }
    e.stopPropagation();
  }

  function handleDeleteConfirmation(card, e) {
    setIsCardRemoveConfirmationPopup(true);
    setCard(card);
    e.stopPropagation();
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
          window.alert(`${alertMessage} ${err}`);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      props.history.push("/");
    }
  }, [loggedIn, props.history]);

  useEffect(() => {
    loggedIn &&
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
          window.alert(`${alertMessage} ${err}`);
        });
  }, [loggedIn]);

  useEffect(() => {
    getCardsFromServer();
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardRemoveConfirmationPopup(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(info) {
    api
      .setUserInfo(info.name, info.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        window.alert(`${alertMessage} ${err}`);
      });
  }

  function handleAddPlaceSubmit(cardData, resetForm) {
    api
      .setCard(cardData.link, cardData.name)
      .then((card) => {
        setCards((oldCards) => [card, ...oldCards]);
        resetForm();
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        window.alert(`${alertMessage} ${err}`);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAva(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        window.alert(`${alertMessage} ${err}`);
      });
  }

  // -------------------- LOGIN --------------------------------------
  function handleLogin(e) {
    e.preventDefault();
    auth
      .sigin(
        emailAndPassSetterLogin.values[emailLogin],
        emailAndPassSetterLogin.values[passwordLogin]
      )
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(emailAndPassSetterLogin.values[emailLogin]);
          props.history.push("/");
          setLoginError(false);
          localStorage.setItem("token", res.token);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setLoginError(true);
        setIsInfoTooltipOpen(true);
        props.history.push("/sign-in");
      });
  }

  function handleLoginOnChange(e) {
    emailAndPassSetterLogin.handleChange(e);
  }

  //----------------- REGISTER ---------------------------------------
  function handleRegister(e) {
    e.preventDefault();
    auth
      .register(
        emailAndPassSetterReg.values[emailReg],
        emailAndPassSetterReg.values[passwordReg]
      )
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          setRegisterError(false);
          props.history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setIsInfoTooltipOpen(true);
        setRegisterError(true);
        setEmail(emailAndPassSetterReg.values[emailReg]);
        props.history.push("/sign-up");
      });
  }

  function handleRegOnChange(e) {
    emailAndPassSetterReg.handleChange(e);
  }
  //--------------------------------------------------------------

  return (
    <div className="App">
      <div className="root">
        <div className="wrapper">
          <CurrentUserContext.Provider value={currentUser}>
            <CardContext.Provider value={cards}>
              <CardDeleteContext.Provider value={card}>
                <Header
                  loggedIn={loggedIn}
                  email={email}
                  setLoggedIn={setLoggedIn}
                />

                <Switch>
                  <ProtectedRoute
                    exact
                    path="/"
                    loggedIn={loggedIn}
                    component={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    cards={cards}
                    onDeleteConfirmation={handleDeleteConfirmation}
                  />

                  <Route exact path="/sign-up">
                    <Register
                      setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                      closeAllPopups={closeAllPopups}
                      setRegisterError={setRegisterError}
                      setEmail={setEmail}
                      setLoggedIn={setLoggedIn}
                      onRegister={handleRegister}
                      handleOnChange={handleRegOnChange}
                      emailAndPassSetterRegValues={emailAndPassSetterReg.values}
                    />
                  </Route>

                  <Route exact path="/sign-in">
                    <Login
                      setLoggedIn={setLoggedIn}
                      setEmail={setEmail}
                      setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                      closeAllPopups={closeAllPopups}
                      setLoginError={setLoginError}
                      onLogin={handleLogin}
                      handleOnChange={handleLoginOnChange}
                      emailAndPassSetterLoginValues={
                        emailAndPassSetterLogin.values
                      }
                    />
                  </Route>

                  <Route>
                    {loggedIn ? (
                      <Redirect to="/" />
                    ) : (
                      <Redirect to="/sign-in" />
                    )}
                  </Route>
                </Switch>

                <Footer />

                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateCard={handleAddPlaceSubmit}
                />

                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />

                <InfoTooltip
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopups}
                  loginError={loginError}
                  registerError={registerError}
                />

                <CardRemoveConfirmationPopup
                  isOpen={isCardRemoveConfirmationPopup}
                  onClose={closeAllPopups}
                  onCardDelete={handleDeleteClick}
                  card={card}
                />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </CardDeleteContext.Provider>
            </CardContext.Provider>
          </CurrentUserContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default withRouter(App);
