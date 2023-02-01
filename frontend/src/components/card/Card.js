import React, { useContext } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__bin ${
    isOwn ? "element__bin_visible" : "element__bin_hidden"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `${
    isLiked ? "element__like_pressed" : "element__like"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick(e) {
    props.onCardLike(props.card, e);
  }

  function handleDeleteClick(e) {
    props.onDeleteConfirmation(props.card, e);
  }

  return (
    <article key={props.card._id} onClick={handleClick} className="element">
      <img className="element__picture" src={props.link} alt={props.name}></img>
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        aria-label="Корзина, удалить фото"
      ></button>
      <div className="element__place">
        <h2 className="element__name">{props.name}</h2>
        <div className="element__container">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            aria-label="Сердечко, поставить лайк"
          ></button>
          <p className="amount-likes">{props.likes}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
