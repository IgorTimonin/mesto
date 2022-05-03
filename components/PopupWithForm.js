import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this_formSubmit = formSubmit;
  }

  _getInputValues() {}

  open() {}

  close() {}

  _setEventListeners() {
    // при сабмите формы
    this._element.addEventListener('submit', (evt) => {
      // отменим стандартное поведение
      evt.preventDefault();

      // и сбросим её поля
      this._element.reset();
    });
  }
}
