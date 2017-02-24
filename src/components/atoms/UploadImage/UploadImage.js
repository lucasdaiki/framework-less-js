require('./UploadImage.scss');

const MAX_SIZE = 500000;
export default class UploadImage {
  constructor ({ value = '', placeholder = '', id = '', className = '', onChange }) {
    this.dragenter = this.dragenter.bind(this);
    this.dragover = this.dragover.bind(this);
    this.dragleave = this.dragleave.bind(this);
    this.drop = this.drop.bind(this);

    this.value = value;
    this.id = id;
    this.onChange = onChange;

    this.component = document.createElement('div');
    this.component.className = `upload-image__container ${className} ${id}`;

    this.input = document.createElement('input');
    this.input.classList.add('upload-image__input');
    this.input.onchange = e => this.handleFiles(e.target.files);
    this.input.type = 'file';
    this.input.name = id;
    this.input.id = id;

    this.droppableArea = document.createElement('div');
    this.droppableArea.classList.add('upload-image__droppable-area');
    this.droppableArea.ondragenter = this.dragenter;
    this.droppableArea.ondragover = this.dragover;
    this.droppableArea.ondragleave = this.dragleave;
    this.droppableArea.ondrop = this.drop;

    this.preview = document.createElement('div');
    this.preview.classList.add('upload-image__avatar');

    this.img = document.createElement('img');
    this.img.classList.add('upload-image__preview');
    if (value) this.img.src = value;
    this.preview.appendChild(this.img);

    this.message = document.createElement('label');
    this.message.classList.add('upload-image__message');
    this.message.textContent = 'Choose a file or drag it here';
    this.message.setAttribute('for', id);

    this.errorMessage = document.createElement('label');
    this.errorMessage.classList.add('upload-image__message');
    this.errorMessage.classList.add('--error');

    this.droppableArea.appendChild(this.preview);
    this.component.appendChild(this.droppableArea);
    this.component.appendChild(this.message);
    this.component.appendChild(this.errorMessage);
    this.component.appendChild(this.input);

    return this;
  }

  handleFiles (files) {
    if (!files[0]) return false;

    const file = files[0];
    const imageType = /^image\//;

    if (!imageType.test(file.type) || file.size > MAX_SIZE) {
      this.errorMessage.textContent = 'Invalid File';
      return false;
    }

    this.errorMessage.textContent = '';
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.img.src = e.target.result;
      this.onChange(this.id, e.target.result);
    };
    return true;
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
