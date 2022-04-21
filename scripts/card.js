class Card {
  constructor(data, template) {
    this._name = data.name;
    this._image = data.link;
    this._galleryTemplate = template;
  }

  _getTemplate() {
    const _galleryItem = this._galleryTemplate.cloneNode(true).querySelector('.gallery__item');
    return _galleryItem;
  }

  _generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.gallery__img').src = this._image;
    this._element.querySelector('.gallery__img').alt = this._name;
    this._element.querySelector('.gallery__title').textContent = this._name;
    const imgLike = this._element.querySelector('.gallery__like-btn');
    imgLike.addEventListener('click', function (evt) {
      evt.target.classList.toggle('gallery__like-btn_active');
    });

    this._element
      .querySelector('.gallery__img')
      .addEventListener('click', function openFullPhoto() {
        const cardElement = document.querySelector('.popup__full-photo');
        cardElement.src = this.currentSrc;
        cardElement.alt = this.alt;
        figureCaption.textContent = this.alt;
        openPopup(popupFullSize);
      });
    const deleteBtn = this._element.querySelector('.gallery__delete-btn');
    deleteBtn.addEventListener('click', removeCard);

    return this._element;
  }
}