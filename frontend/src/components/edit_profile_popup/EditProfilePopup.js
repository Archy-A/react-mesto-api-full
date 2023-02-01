import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../popup_with_form/PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setNameUser(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const [nameUser, setNameUser] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(e) {
    setNameUser(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: nameUser,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="popup-edit"
      nameForm="popup__edit-form"
      buttonLabel="Сохранить"
    >
      <>
        <input
          id="popup__named"
          type="text"
          value={nameUser || ""}
          onChange={handleChangeName}
          name="name"
          placeholder="Имя"
          className="popup__edit popup__edit_name_copy"
          minLength="2"
          maxLength="40"
          required
        ></input>
        <span className="popup__input-error popup__named-error"></span>
        <input
          id="popup__activityinput"
          type="text"
          value={description || ""}
          onChange={handleChangeDescription}
          name="about"
          placeholder="Род деятельности"
          className="popup__edit popup__edit_activity_title"
          minLength="2"
          maxLength="200"
          required
        ></input>
        <span className="popup__input-error popup__activityinput-error"></span>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
