import React, { useContext } from "react";
import Card from "../card/Card";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  handleCardClick,
  onCardLike,
  onCardDelete,
  cards,
  onDeleteConfirmation,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__avatar-hover">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          ></img>
        </div>
        <div className="profile__info">
          <div className="profile__group">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__activity">{currentUser.about}</p>
          </div>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__edit-button"
            aria-label="Карандаш, редактировать профиль"
          ></button>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
          aria-label="Плюсик, добавить профиль"
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            link={card.link}
            name={card.name}
            likes={card.likes.length}
            card={card}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onDeleteConfirmation={onDeleteConfirmation}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
