export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popupCloseBtn = this._popupSelector.querySelector('.popup__btn-close');
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose, {once: true});
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.classList.remove('popup_opened');
    
  }

  //закрытие по нажатию Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
        console.log('Esc');
      document.querySelector('.popup_opened').classList.remove('popup_opened');
    }
  }

  _setEventListeners() {
    //закрытие по кнопке закрытия
    this.popupCloseBtn.addEventListener('click', () => {
      this.close();
    });
    //закрытие по клику вне активного окна
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