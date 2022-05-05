import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, handlerFormSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerFormSubmit;
    this._form = popupSelector.querySelector('.popup__form');
    this._formInput = popupSelector.querySelectorAll('.popup__form-input');
    this.submitBtn = this._form.querySelector('.popup__form-submit');
  }

  _getInputValues() {
    const inputValues = {
      firstInput: this._formInput.item(0).value,
      secondInput: this._formInput.item(1).value,
    };
    return inputValues;
  }

  _setInputValues({ userName, userinfo }) {
    this._formInput.item(0).value = userName;
    this._formInput.item(1).value = userinfo;
  }

  close() {
    super.close();
    setTimeout(this._form.reset(), 1000);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handlerFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
