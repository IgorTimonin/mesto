export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    // formValidators[profileForm.name].resetValidation();
    this._popupSelector.classList.add(popupOpenClass);
  }

  close() {
    this._popupSelector.classList.remove(popupOpenClass);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
      //   const openedPopup = document.querySelector('.' + popupOpenClass);
      //   this.close(openedPopup);
    }
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._open();
    });

    popupCloseBtn.addEventListener('click', () => {
      this._close();
    });
  }

  _closeByMousedown() {
      this._popupSelector.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains(popupOpenClass)) {
          close();
        }
        if (evt.target.classList.contains(popupCloseBtn)) {
          close();
        }
      });
    
  }

  // closeByMousedown() {
  //   popupList.forEach((popup) => {
  //     popup.addEventListener('mousedown', (evt) => {
  //       if (evt.target.classList.contains(popupOpenClass)) {
  //         closePopup(popup);
  //       }
  //       if (evt.target.classList.contains(popupCloseBtn)) {
  //         closePopup(popup);
  //       }
  //     });
  //   });
  // }
}