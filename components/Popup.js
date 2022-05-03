export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popupCloseBtn = this._popupSelector.querySelector('.popup__btn-close');
  }

  open() {
    // formValidators[profileForm.name].resetValidation();
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
      //   const openedPopup = document.querySelector('.' + popupOpenClass);
      //   this.close(openedPopup);
    }
  }

  _setEventListeners() {
    // this._element.addEventListener('click', () => {
    //   this.open();
    // });

    this.popupCloseBtn.addEventListener('click', () => {
      this.close();
    });
  }

  _closeByMousedown() {
      this._popupSelector.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.close();
        }
        if (evt.target.classList.contains(this.popupCloseBtn)) {
          this.close();
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