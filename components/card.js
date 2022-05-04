export class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._image = data.link;
    this._galleryTemplate = template;
    this.handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const _galleryItem = this._galleryTemplate
      .cloneNode(true)
      .querySelector('.gallery__item');
    return _galleryItem;
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.gallery__img').src = this._image;
    this._element.querySelector('.gallery__img').alt = this._name;
    this._element.querySelector('.gallery__title').textContent = this._name;
    const _imgLike = this._element.querySelector('.gallery__like-btn');
    _imgLike.addEventListener('click', () => {
      _imgLike.classList.toggle('gallery__like-btn_active');
    });

    this._element
      .querySelector('.gallery__img')
      .addEventListener('click', this.handleCardClick);

    const _deleteBtn = this._element.querySelector('.gallery__delete-btn');
    _deleteBtn.addEventListener('click', () => {
      this._element.remove();
    });

    return this._element;
  }
};