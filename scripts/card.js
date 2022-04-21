export class Card {
  constructor(data, template, openFullPhoto) {
    this._name = data.name;
    this._image = data.link;
    this._galleryTemplate = template;
    this._fullphoto = openFullPhoto;
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
    const imgLike = this._element.querySelector('.gallery__like-btn');
    imgLike.addEventListener('click', () => {
      imgLike.classList.toggle('gallery__like-btn_active');
    });

    this._element
      .querySelector('.gallery__img')
      .addEventListener('click', () => this._fullphoto(this._image, this._name));
    
    const deleteBtn = this._element.querySelector('.gallery__delete-btn');
    deleteBtn.addEventListener('click', () => {
      this._element.remove();
    });

    return this._element;
  }
};