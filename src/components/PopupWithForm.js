import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = popupSelector.querySelector('.popup__form');
    this._formInputs = popupSelector.querySelectorAll('.popup__form-input');
    this.submitBtn = this._form.querySelector('.popup__form-submit');
    this.submitText = this.submitBtn.textContent;
  }

   _getInputValues() {
    const userData = {};
    this._formInputs.forEach((input) => (userData[input.name] = input.value));
    return userData;
  }

  setInputValues({ userName, userinfo }) {
    this._formInputs.item(0).value = userName;
    this._formInputs.item(1).value = userinfo;
  }

  close() {
    super.close();
    setTimeout(this._form.reset(), 10000);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerFormSubmit(this._getInputValues());
    });
  }
}
