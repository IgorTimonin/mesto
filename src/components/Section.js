export default class Section {
  constructor(renderer, container) {
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }

   renderAll(cards) {
    cards.forEach((element) => {
      this.addItem(element);
    });
  }
};