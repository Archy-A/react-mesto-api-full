import React, { useContext } from "react";
import PopupWithForm from "../popup_with_form/PopupWithForm";

import { CardDeleteContext } from "../../contexts/CardDeleteContext";

function CardRemoveConfirmationPopup({ isOpen, onClose, onCardDelete }) {
  const cardDelete = useContext(CardDeleteContext);

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(cardDelete, e);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Вы уверены?"
      name="popup-delete"
      nameForm="popup__del-form"
      buttonLabel="Да"
    >
      <></>
    </PopupWithForm>
  );
}

export default CardRemoveConfirmationPopup;
