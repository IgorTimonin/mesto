export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
  }
  open() {
    popupFullphoto.src = this._image;
    popupFullphoto.alt = this._name;
    figureCaption.textContent = this._name;
    this._popupSelector.classList.add(popupOpenClass);
  }
}