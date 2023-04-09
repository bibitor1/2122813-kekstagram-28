const ALERT_SHOW_TIME = 5000;

export const showDialog = (template) => {
  const message = template.content.firstElementChild.cloneNode(true);

  document.body.appendChild(message);

  const button = message.querySelector('.button');

  if (button) {
    button.addEventListener('click', () => {
      message.remove();
    });
  }

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
    }
  });

  message.addEventListener('click', (evt) => {
    if (!evt.target.closest('.inner')) {
      message.remove();
    }
  });
};

class Alert {
  constructor(message) {
    this.message = message;
    this.alert = document.createElement('div');
    this.alert.classList.add('alert');
    this.alert.textContent = this.message;
    document.body.append(this.alert);
  }

  hide() {
    this.alert.remove();
  }

  show() {
    setTimeout(() => {
      this.hide();
    }, ALERT_SHOW_TIME);
  }
}

export const showAlert = (message) => {
  const alert = new Alert(message);
  alert.show();
};
