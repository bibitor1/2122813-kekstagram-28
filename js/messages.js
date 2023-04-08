const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

export const showSuccessMessage = () => {
  const successMessage = successTemplate.content.firstElementChild.cloneNode(true);

  document.body.appendChild(successMessage);

  const successButton = successMessage.querySelector('.success__button');

  if (successButton) {
    successButton.addEventListener('click', () => {
      successMessage.remove();
    });
  }
  window.addEventListener('keydown', (evt) => {

    if (evt.key === 'Escape') {
      successMessage.remove();
    }
  });

  successMessage.addEventListener('click', (evt) => {

    if (!evt.target.closest('.success__inner')) {
      successMessage.remove();
    }
  });
};

export const showErrorMessage = () => {
  const errorMessage = errorTemplate.content.firstElementChild.cloneNode(true);

  document.body.appendChild(errorMessage);

  const errorButton = errorMessage.querySelector('.error__button');

  if (errorButton) {
    errorButton.addEventListener('click', () => {
      errorMessage.remove();
    });
  }

  window.addEventListener('keydown', (evt) => {

    if (evt.key === 'Escape') {
      errorMessage.remove();
    }
  });

  errorMessage.addEventListener('click', (evt) => {

    if (!evt.target.closest('.error__inner')) {
      errorMessage.remove();
    }
  });
};
