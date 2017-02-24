import sinon from 'sinon';
import AutoCompleteAddress from './AutoCompleteAddress';

const addEventListener = sinon.spy();
const onChange = sinon.spy();

class Adapter {
  constructor () {
    this.input = { addEventListener };
  }
}

describe('#AutoCompleteAddress', () => {
  test('should render', () => {
    const input = new AutoCompleteAddress({ id: 'AutoCompleteAddress' }, Adapter);
    expect(input.component).toBeDefined();
    expect(addEventListener.called).toBeTruthy();
  });

  describe('#handleChange', () => {
    test('should render', () => {
      const input = new AutoCompleteAddress({ id: 'AutoCompleteAddress', onChange }, Adapter);
      input.handleChange();
      expect(input.value).toEqual({});
      expect(onChange.called).toBeTruthy();
    });
  });
});
