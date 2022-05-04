import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector, func) {
    super(popupSelector);
    this._handlerFormSubmit = func;
    this._form = popupSelector.querySelector('.popup__form');
    this.submitBtn = this._form.querySelector('.popup__form-submit')
  }

  _getInputValues() {}

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
    
        this.close.bind(super.close());
  }
}
