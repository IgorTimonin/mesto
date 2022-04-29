export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {}

  close() {}

  _handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.' + popupOpenClass);
    this.close(openedPopup);
  }
}

closeByMousedown() {
  popupList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(popupOpenClass)) {
        closePopup(popup);
      }
      if (evt.target.classList.contains(popupCloseBtn)) {
        closePopup(popup);
      }
    });
  });
}
}