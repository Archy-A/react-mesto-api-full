import React, { useState } from "react";
import PopupWithForm from "../popup_with_form/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [linkAva, setLinkAva] = useState("");

  function handleChangeLink(e) {
    setLinkAva(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(linkAva);
    setLinkAva("");
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="popup-ava"
      nameForm="popup__ava-form"
      buttonLabel="Сохранить"
    >
      <>
        <input
          id="popup__avatarlink"
          name="name"
          placeholder="Введите ссылку на аватар"
          className="popup__edit"
          type="url"
          value={linkAva || ""}
          onChange={handleChangeLink}
          pattern="[Hh][Tt][Tt][Pp][Ss]?://(.*)"
          required
        ></input>
        <span className="popup__input-error popup__avatarlink-error"></span>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
