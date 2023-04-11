const ALERT_SHOW_TIME = 5000;

export const showDialog = (template) => {
  const element = template.content.firstElementChild.cloneNode(true);

  document.body.appendChild(element);

  const button = element.querySelector('button[type="button"]');

  const removeDialog = () => {
    element.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  function onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      removeDialog();
    }
  }

  if (button) {
    button.addEventListener('click', () => {
      removeDialog();
    });
  }

  document.addEventListener('keydown', onDocumentKeydown);

  element.addEventListener('click', (evt) => {
    if (!evt.target.closest('[class*="__inner"]')) {
      removeDialog();
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
