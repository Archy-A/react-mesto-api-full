import React from "react";
import PopupWithForm from "../popup_with_form/PopupWithForm";
import useForm from "../../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const inputName = "name";
  const inputLink = "link";
  const placeAdder = useForm({ inputName: "", inputLink: "" });

  function resetForm() {
    placeAdder.setValues({ inputName: "", inputLink: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCard(
      {
        link: placeAdder.values[inputLink],
        name: placeAdder.values[inputName],
      },
      resetForm
    );
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="popup-add"
      nameForm="popup__add-form"
      buttonLabel="Сохранить"
    >
      <>
        <input
          id="popup__nameadd"
          type="text"
          value={placeAdder.values[inputName] || ""}
          onChange={placeAdder.handleChange}
          name={inputName}
          placeholder="Название"
          className="popup__edit popup__edit_card-name"
          minLength="2"
          maxLength="30"
          required
        ></input>
        <span className="popup__input-error popup__nameadd-error"></span>
        <input
          id="popup__cardlink"
          name={inputLink}
          placeholder="Сcылка на страницу"
          className="popup__edit popup__edit_cardlink"
          type="url"
          value={placeAdder.values[inputLink] || ""}
          onChange={placeAdder.handleChange}
          pattern="[Hh][Tt][Tt][Pp][Ss]?://(.*)"
          required
        ></input>
        <span className="popup__input-error popup__cardlink-error"></span>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
