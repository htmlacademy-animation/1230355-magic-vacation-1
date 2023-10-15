export class Preloader {
  constructor() {
    this._element = document.getElementById(`preloader__percent`);

    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this._percentage = percentage;
    this._element.dataset.percentage = `${this._percentage}%`;
  }

  increasePercentage(delta) {
    this._percentage += delta;
    this._element.dataset.percentage = this._percentage > 100 ? `100%` : `${this._percentage}%`;
  }
}
