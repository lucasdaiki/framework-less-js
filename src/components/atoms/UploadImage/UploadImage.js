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

    this.preview = this.buildPreview();
    const avatar = this.buildAvatar(this.preview);
    this.droppableArea = this.buildDroppableArea(avatar);

    this.message = this.buildMessage('Choose a file or drag it here', '--choose-file', this.id);
    this.errorMessage = this.buildMessage('', '--error', 'id');
    const input = this.buildInput();

    this.component.appendChild(this.droppableArea);
    this.component.appendChild(this.errorMessage);
    this.component.appendChild(this.message);
    this.component.appendChild(input);

    return this;
  }

  buildMessage (text, classNames = '', id = '') {
    const label = document.createElement('label');
    label.textContent = text;
    label.className = `upload-image__message ${classNames}`;
    label.setAttribute('for', id);
    return label;
  }

  buildPreview () {
    const preview = document.createElement('img');
    preview.classList.add('upload-image__preview');
    if (this.value) preview.src = this.value;
    return preview;
  }

  buildAvatar (preview) {
    const avatar = document.createElement('div');
    avatar.classList.add('upload-image__avatar');
    avatar.appendChild(preview);
    return avatar;
  }

  buildDroppableArea (avatar) {
    const droppableArea = document.createElement('div');
    droppableArea.classList.add('upload-image__droppable-area');
    droppableArea.ondragenter = this.dragenter;
    droppableArea.ondragover = this.dragover;
    droppableArea.ondragleave = this.dragleave;
    droppableArea.ondrop = this.drop;
    droppableArea.appendChild(avatar);
    return droppableArea;
  }

  buildInput () {
    const input = document.createElement('input');
    input.classList.add('upload-image__input');
    input.onchange = e => this.handleFiles(e.target.files);
    input.type = 'file';
    input.name = this.id;
    input.id = this.id;
    return input;
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
      this.preview.src = e.target.result;
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
