import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, handlerSubmit) {
    super(popupSelector);
    this._handlerFormSubmit = handlerSubmit;
    this._form = popupSelector.querySelector('.popup__form');
    this._formInput = popupSelector.querySelectorAll('.popup__form-input');
    this.submitBtn = this._form.querySelector('.popup__form-submit')
  }

  _getInputValues() {
    
  }

  close() {
    super.close();
    this._form.reset();
  }

  _setEventListeners() {
    super._setEventListeners();
    
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handlerFormSubmit();
        this.close.bind(super.close());
    });
  }
}
