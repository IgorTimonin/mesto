export default class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }

  renderAll() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }
};