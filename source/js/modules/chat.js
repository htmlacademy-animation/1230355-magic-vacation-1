export default () => {
  const messageForm = document.getElementById(`message-form`);
  const messageField = document.getElementById(`message-field`);
  const messageList = document.getElementById(`messages`);
  const chatBlock = document.querySelector(`.js-chat`);

  messageForm.addEventListener(`submit`, function (e) {
    e.preventDefault();
    postQuestion();
  });

  const scrollToBottom = () => {
    if (messageList.scrollHeight > chatBlock.offsetHeight) {
      chatBlock.scrollTop = messageList.scrollHeight;
    }
  };

  const postAnswer = () => {
    const answerEl = document.createElement(`li`);
    const placeholder = createAnswerPlaceholder();
    const textEl = createMessageTextEl(Math.floor(Math.random() * 2) ? `Да` : `Нет`);
    
    textEl.classList.add(`hidden`);
    answerEl.classList.add(`chat__message`, `chat__message--incoming`, `chat__message--last`);
    answerEl.append(placeholder, textEl);
    messageList.appendChild(answerEl);
    scrollToBottom();

    setTimeout(() => {
      placeholder.classList.add(`chat__placeholder--hidden`);
      setTimeout(() => placeholder.remove(), 400);
      textEl.classList.remove(`hidden`);
      answerEl.classList.remove(`chat__message--last`);
    }, 700);
  };

  const postQuestion = () => {
    if (messageField.value) {
      const messageEl = document.createElement(`li`);
      const textEl = createMessageTextEl(messageField.value);

      textEl.innerText = messageField.value;
      messageEl.classList.add(`chat__message`, `chat__message--outcoming`);
      messageEl.appendChild(textEl);
      messageList.appendChild(messageEl);
      scrollToBottom();

      messageField.value = ``;
      messageField.setAttribute(`disabled`, `true`);
      postAnswer();
      messageField.removeAttribute(`disabled`);
      messageField.focus();
    }
  };

  const createAnswerPlaceholder = () => {
    const placeholder = document.createElement(`div`);
    placeholder.classList.add(`chat__placeholder`);
    for (let i = 0; i < 3; i++) {
      let dot = document.createElement(`span`);
      placeholder.appendChild(dot);
    }
    return placeholder;
  }

  const createMessageTextEl = (text) => {
    const textEl = document.createElement(`p`);
    textEl.innerText = text;
    return textEl;
  }
};
