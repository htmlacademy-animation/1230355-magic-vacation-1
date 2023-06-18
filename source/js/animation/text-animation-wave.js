const TIME_STEP = 100;
const WAVE_LENGTH = 4; // must be an even number
const WORD_TIME_OFFSET = TIME_STEP * (WAVE_LENGTH / 2) + 50;

class TextAnimationWave {
  constructor(
      elementSelector,
      wordDelimiter = ` `,
      duration = 500,
      property = `transform`
  ) {
    this._element = document.querySelector(elementSelector);
    this.wordDelimiter = wordDelimiter;
    this._duration = duration;
    this._property = property;
    this._timeOffset = WORD_TIME_OFFSET;

    this.prePareText();
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const words = this._element.textContent.trim().split(this.wordDelimiter).filter((latter) => latter !== ``);

    const content = words.reduce((fragmentParent, word, wordIndex) => {
      this._timeOffset = (wordIndex + 1) * WORD_TIME_OFFSET;
      const wordElement = Array.from(word).reduce((fragment, latter, letterIndex) => {
        fragment.appendChild(this.createLetterEl(latter, letterIndex));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  createLetterEl(letter, letterIndex) {
    const span = document.createElement(`span`);
    span.textContent = letter;

    span.style.transition = `${this._property} ${this._duration}ms ease ${this._timeOffset}ms`;

    if (letterIndex % WAVE_LENGTH < WAVE_LENGTH / 2) {
      this._timeOffset -= TIME_STEP;
    } else {
      this._timeOffset += TIME_STEP;
    }
    return span;
  }

  changeTimeOffset(letterIndex) {
    if (letterIndex % WAVE_LENGTH < 2) {
      this._timeOffset -= TIME_STEP;
    } else {
      this._timeOffset += TIME_STEP;
    }
  }

  runAnimation() {
    if (this._element) {
      this._element.classList.add(`text-animation-wave`);
    }
  }

  destroyAnimation() {
    if (this._element) {
      this._element.classList.remove(`text-animation-wave`);
    }
  }
}

export default TextAnimationWave;
