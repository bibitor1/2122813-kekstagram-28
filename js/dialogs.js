const ALERT_SHOW_TIME = 5000;

export const showDialog = (template) => {
  const message = template.content.firstElementChild.cloneNode(true);

  document.body.appendChild(message);

  const button = message.querySelector('.button');

  const OnKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
      document.removeEventListener('keydown', OnKeyDown);
    }
  };

  if (button) {
    button.addEventListener('click', () => {
      message.remove();
      document.removeEventListener('keydown', OnKeyDown);
    });
  }

  document.addEventListener('keydown', OnKeyDown);

  message.addEventListener('click', (evt) => {
    if (!evt.target.closest('.inner')) {
      message.remove();
      document.removeEventListener('keydown', OnKeyDown);
    }
  });
};

export const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};
