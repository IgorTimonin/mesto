import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = popupSelector.querySelector('.popup__form');
    this._formInputs = popupSelector.querySelectorAll('.popup__form-input');
    this.submitBtn = this._form.querySelector('.popup__form-submit');
  }

   _getInputValues() {
    const data = {};
    this._formInputs.forEach((input) => (data[input.name] = input.value));
    return data;
  }

  _setInputValues({ userName, userinfo }) {
    this._formInputs.item(0).value = userName;
    this._formInputs.item(1).value = userinfo;
  }

  close() {
    super.close();
    setTimeout(this._form.reset(), 1000);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
