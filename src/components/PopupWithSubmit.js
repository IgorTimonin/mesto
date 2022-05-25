import Popup from './Popup.js';
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitBtn) {
    super(popupSelector);
    this._btn = submitBtn;
    // this._handlerFormSubmit = handlerFormSubmit;
  }

  setActionSubmit() {
    
  }

  setEventListeners() {
    super.setEventListeners();
    this._btn.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.setActionSubmit();
      this.close();
    });
  }
}