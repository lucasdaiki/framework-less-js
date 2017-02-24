import sinon from 'sinon';
import UploadImage from './UploadImage';

describe('#UploadImage', () => {
  test('should render', () => {
    const uploadImage = new UploadImage({ id: 'UploadImage' });
    expect(uploadImage.component).toBeDefined();
  });

  describe('#droppableArea', () => {
    let event;

    beforeEach(() => {
      event = {
        stopPropagation: sinon.spy(),
        preventDefault: sinon.spy(),
        dataTransfer: { files: [ new Blob([], { type: 'image/png' }) ] }
      };
    });

    test('should set the correct methods', () => {
      const uploadImage = new UploadImage({ id: 'UploadImage' });
      expect(uploadImage.droppableArea.ondragenter).toEqual(uploadImage.dragenter);
      expect(uploadImage.droppableArea.ondragover).toEqual(uploadImage.dragover);
      expect(uploadImage.droppableArea.ondragleave).toEqual(uploadImage.dragleave);
      expect(uploadImage.droppableArea.ondrop).toEqual(uploadImage.drop);
    });

    test('should dragenter', () => {
      const uploadImage = new UploadImage({ id: 'UploadImage' });
      uploadImage.dragenter(event);
      expect(event.preventDefault.called).toBeTruthy();
      expect(event.stopPropagation.called).toBeTruthy();
    });

    test('should dragover', () => {
      const uploadImage = new UploadImage({ id: 'UploadImage' });
      uploadImage.dragover(event);
      expect(event.preventDefault.called).toBeTruthy();
      expect(event.stopPropagation.called).toBeTruthy();
      expect(uploadImage.droppableArea.classList.contains('--drag-over')).toBeTruthy();
    });

    test('should dragleave', () => {
      const uploadImage = new UploadImage({ id: 'UploadImage' });
      uploadImage.droppableArea.classList.add('--drag-over');
      uploadImage.dragleave(event);
      expect(event.preventDefault.called).toBeTruthy();
      expect(event.stopPropagation.called).toBeTruthy();
      expect(uploadImage.droppableArea.classList.contains('--drag-over')).toBeFalsy();
    });

    test('should drop', () => {
      const uploadImage = new UploadImage({ id: 'UploadImage' });
      uploadImage.handleFiles = sinon.spy();
      uploadImage.drop(event);
      expect(event.preventDefault.called).toBeTruthy();
      expect(event.stopPropagation.called).toBeTruthy();
      expect(uploadImage.handleFiles.calledWith(event.dataTransfer.files)).toBeTruthy();
    });

    describe('#handleFiles', () => {
      test('should do anything if has no files', () => {
        const uploadImage = new UploadImage({ id: 'UploadImage' });
        const result = uploadImage.handleFiles([]);
        expect(result).toBeFalsy();
        expect(uploadImage.errorMessage.textContent).toEqual('');
      });

      test('should not upload if invalid file', () => {
        const uploadImage = new UploadImage({ id: 'UploadImage' });
        const result = uploadImage.handleFiles([ {} ]);
        expect(result).toBeFalsy();
        expect(uploadImage.errorMessage.textContent).toEqual('Invalid File');
      });

      test('should upload a valid file', () => {
        const uploadImage = new UploadImage({ id: 'UploadImage' });
        uploadImage.onChange = sinon.spy();
        const result = uploadImage.handleFiles(event.dataTransfer.files);
        expect(result).toBeTruthy();
        expect(uploadImage.errorMessage.textContent).toEqual('');
      });
    });
  });
});
