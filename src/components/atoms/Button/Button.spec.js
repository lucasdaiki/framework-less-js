import sinon from 'sinon';
import Button from './Button';

describe('#Button', () => {
  test('should render', () => {
    const button = new Button({ id: 'Button' });
    expect(button.component).toBeDefined();
  });

  test('should call onClick', () => {
    const onClick = sinon.spy();
    const button = new Button({ id: 'Button', onClick });
    button.component.click();
    expect(button.component).toBeDefined();
    expect(onClick.called).toBeTruthy();
  });

  test('should call default onClick', () => {
    const button = new Button({ id: 'Button' });
    button.component.click();
    expect(button.component).toBeDefined();
  });
});
