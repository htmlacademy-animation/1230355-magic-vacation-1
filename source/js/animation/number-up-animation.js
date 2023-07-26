export default class NumberUpAnimation {
  constructor(countCodes, countEnd, increaseNumber) {
    this.countCodes = countCodes;
    this.countEnd = countEnd;
    this.increaseNumber = increaseNumber;
    this.fpsInterval = 12;
    this.countCurrent = 1;
    this.fpsCounter = 0;
  }

  setCountCurrent(countCurrent) {
    this.countCurrent = countCurrent;
  }

  draw() {
    if (this.countCurrent !== this.countEnd) {
      this.countCurrent += this.increaseNumber;
      if (this.countCurrent > this.countEnd) {
        this.countCurrent = this.countEnd;
      }
      this.countCodes.textContent = this.countCurrent;
    }
  }

  tick() {
    if (++this.fpsCounter % this.fpsInterval === 0) {
      this.draw();
    }
    if (this.countCurrent !== this.countEnd) {
      requestAnimationFrame(() => this.tick());
    }
  }

  animate() {
    if (this.countCurrent !== this.countEnd) {
      this.countCodes.textContent = this.countCurrent;
      requestAnimationFrame(() => this.tick());
    }
  }
}
