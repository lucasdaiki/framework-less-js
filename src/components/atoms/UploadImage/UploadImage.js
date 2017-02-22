require('./UploadImage.scss');

export default class UploadImage {
  constructor ({ value = '', placeholder = '', id = '', className = '', onChange }) {
    this.value = value;
    this.id = id;
    this.onChange = onChange;

    this.component = document.createElement('div');
    this.component.className = `upload-image__container ${className} ${id}`;

    const label = document.createElement('span');
    label.textContent = placeholder;

    this.input = document.createElement('input');
    this.input.classList.add('upload-image__input');
    this.input.onchange = e => this.handleFiles(e.target.files);
    this.input.type = 'file';
    this.input.name = id;
    this.input.id = id;

    this.droppableArea = document.createElement('div');
    this.droppableArea.classList.add('upload-image__droppable-area');
    this.droppableArea.ondragenter = this.dragenter.bind(this);
    this.droppableArea.ondragover = this.dragover.bind(this);
    this.droppableArea.ondragleave = this.dragleave.bind(this);
    this.droppableArea.ondrop = this.drop.bind(this);

    this.preview = document.createElement('div');
    this.preview.classList.add('upload-image__avatar');

    this.message = document.createElement('label');
    this.message.classList.add('upload-image__message');
    this.message.textContent = 'Choose a file or drag it here';
    this.message.setAttribute('for', id);

    this.component.appendChild(label);
    this.droppableArea.appendChild(this.preview);
    this.component.appendChild(this.droppableArea);
    this.component.appendChild(this.message);
    this.component.appendChild(this.input);

    return this;
  }

  handleFiles (files) {
    if (!files[0]) return;

    this.preview.innerHTML = '';
    const file = files[0];
    const imageType = /^image\//;

    if (!imageType.test(file.type)) {
      this.message.textContent = 'Invalid File';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    const img = document.createElement('img');
    img.classList.add('upload-image__preview');
    this.preview.appendChild(img);

    reader.onload = (e) => {
      img.src = e.target.result;
      this.onChange(this.id, e.target.result);
    };
  }

  dragenter (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  dragleave (e) {
    this.droppableArea.classList.remove('--drag-over');
    e.stopPropagation();
    e.preventDefault();
  }

  dragover (e) {
    this.droppableArea.classList.add('--drag-over');
    e.stopPropagation();
    e.preventDefault();
  }

  drop (e) {
    e.stopPropagation();
    e.preventDefault();
    this.handleFiles(e.dataTransfer.files);
  }
}
