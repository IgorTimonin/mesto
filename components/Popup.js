export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popupCloseBtn = this._popupSelector.querySelector('.popup__btn-close');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
        console.log(this);
      this.querySelector('popup_opened').this.close;
      document.removeEventListener('keydown', closeByEscape);
      // const openedPopup = document.querySelector('.' + popupOpenClass);
      // this.close(openedPopup);
    }
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _setEventListeners() {
    this.popupCloseBtn.addEventListener('click', () => {
      this.close();
     });

    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (evt.target.classList.contains(this.popupCloseBtn)) {
        this.close();
      }
    });
  }
}