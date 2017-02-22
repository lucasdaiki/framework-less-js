import sinon from 'sinon';
import Input from './Input';


let onChange;
beforeEach(() => {
  onChange = sinon.spy();
});

describe('#Input', () => {
  test('should render', () => {
    const input = new Input();
    expect(input.component).toBeDefined();
  });

  test('should trigger on change if has value', () => {
    const input = new Input({ value: '123', onChange });

    expect(onChange.called).toBeTruthy();
    expect(input.component).toBeDefined();
  });

  describe('#handleValidate', () => {
    test('should validate a valid value', () => {
      const validator = sinon.stub();
      validator.withArgs(undefined).returns({ parsed: '123', valid: true });
      const setCustomValidity = sinon.stub();

      const input = new Input({ validator, onChange });
      input.handleValidate({ target: { setCustomValidity } });

      expect(validator.called).toBeTruthy();
      expect(onChange.called).toBeTruthy();
      expect(setCustomValidity.calledWith('')).toBeTruthy();
    });

    test('should validate a invalid value', () => {
      const validator = sinon.stub();
      validator.withArgs(undefined).returns({ parsed: '123', valid: false });
      const setCustomValidity = sinon.stub();

      const input = new Input({ validator, onChange });
      input.handleValidate({ target: { setCustomValidity } });

      expect(validator.called).toBeTruthy();
      expect(onChange.called).toBeFalsy();
      expect(setCustomValidity.calledWith('Invalid field')).toBeTruthy();
    });
  });
});
