import Popup from './Popup.js';
export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, submitBtn) {
    super(popupSelector);
    this._btn = submitBtn;
  }

  setActionSubmit(submitHandler) {
    submitHandler();
  }

  setEventListeners() {
    super.setEventListeners();
    this._btn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.setActionSubmit();
    });
  }
}