export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popupCloseBtn = this._popupSelector.querySelector('.popup__btn-close');
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      document.querySelector('.popup_opened').classList.remove('popup_opened');  
      document.removeEventListener('keydown', this._handleEscClose);
    }
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