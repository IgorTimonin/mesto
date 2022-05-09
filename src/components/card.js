export default class Card {
  constructor(data, template, handleCardClick) {
    this._name = Object.values(data)[0];
    this._image = Object.values(data)[1];
    this._galleryTemplate = template;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const _galleryItem = this._galleryTemplate
      .cloneNode(true)
      .querySelector('.gallery__item');
    return _galleryItem;
  }

  _setEventListeners() {
    const _imgLike = this._element.querySelector('.gallery__like-btn');
    _imgLike.addEventListener('click', () => {
      _imgLike.classList.toggle('gallery__like-btn_active');
    });
    this._galleryImg.addEventListener('click', this.handleCardClick);
    const _deleteBtn = this._element.querySelector('.gallery__delete-btn');
    _deleteBtn.addEventListener('click', () => {
      this._element.remove();
    });
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._galleryImg = this._element.querySelector('.gallery__img');
    this._galleryImg.src = this._image;
    this._galleryImg.alt = this._name;
    this._element.querySelector('.gallery__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
};