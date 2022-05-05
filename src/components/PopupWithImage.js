import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
      this.popupFullphoto = popupSelector.querySelector('.popup__full-photo');
      this.figureCaption = popupSelector.querySelector('.popup__figcaption');
  }
  
  open(image, name) {
    this.popupFullphoto.src = image;
    this.popupFullphoto.alt = name;
    this.figureCaption.textContent = name;
    super.open()
  }
}