const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileInput = document.querySelector('#upload-file');
const imgPreview = document.querySelector('.img-upload__preview img');
const imgOverlay = document.querySelector('.img-upload__overlay');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgPreview.src = reader.result;
      imgOverlay.classList.remove('hidden');
      document.body.classList.add('modal-open');
    });

    reader.readAsDataURL(file);
  }
});
