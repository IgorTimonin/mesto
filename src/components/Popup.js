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
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //закрытие по нажатию Esc
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    //закрытие по кнопке закрытия
    this.popupCloseBtn.addEventListener('click', () => {
      this.close();
    });
    //закрытие по клику вне активного окна
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}