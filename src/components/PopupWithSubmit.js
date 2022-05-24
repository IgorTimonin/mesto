import Popup from './Popup.js';
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerFormSubmit();
      this.close();
    });
  }
}