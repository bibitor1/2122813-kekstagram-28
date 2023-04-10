const ALERT_SHOW_TIME = 5000;

export const showDialog = (template) => {
  const message = template.content.firstElementChild.cloneNode(true);

  document.body.appendChild(message);

  const button = message.querySelector('button[type="button"]');

  const onKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      message.remove();
      document.removeEventListener('keydown', onKeyDown);
    }
  };

  const removeListener = () => {
    message.remove();
    document.removeEventListener('keydown', onKeyDown);
  };

  if (button) {
    button.addEventListener('click', () => {
      removeListener();
    });
  }

  document.addEventListener('keydown', onKeyDown);

  message.addEventListener('click', (evt) => {
    if (!evt.target.closest('[class*="__inner"]')) {
      removeListener();
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
