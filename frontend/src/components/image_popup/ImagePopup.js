import React from 'react';

function ImagePopup({
                      card,
                      onClose,
                    }) {

  return (
    
    <div className={`popup popup-photo ${card ? 'popup_opened' : ''} `} >
      {card &&
        <div className="popup-photo__container">
          <button type="button" onClick={onClose} className="popup__btn-close" aria-label="Крестик, закрыть окно редактирования"/>
          <img className="popup-photo__fullview"
              src={card.link} alt={card.name}>
          </img>
          <h2 className="popup-photo__name">{card.name}</h2>
        </div>
      }
    </div>
    
  );
}

export default ImagePopup; 