import React from "react";

function PopupWithForm({
  onSubmit,
  isOpen,
  onClose,
  title,
  name,
  nameForm,
  buttonLabel,
  children,
}) {
  return (
    <div className={`popup ${name} ${isOpen ? "popup_opened" : ""} `}>
      <div className="popup__container">
        <button
          type="button"
          onClick={onClose}
          className="popup__btn-close"
          aria-label="Крестик, закрыть окно редактирования"
        ></button>
        <form
          onSubmit={onSubmit}
          method="post"
          name={nameForm}
          className={`popup__form ${nameForm}`}
        >
          <h2 className="popup__header">{title}</h2>
          {children}
          <button type="submit" className="popup__save">
            {buttonLabel}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
