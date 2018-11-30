import React from 'react';
import { render, cleanup, fireEvent, wait } from 'test-utils';

import Modal from '../index';

afterEach(cleanup);

describe('<Modal />', () => {
  test('Opens the modal when clicked on button', () => {
    const modalText = 'This is a modal';
    const btnText = 'open modal';

    const { getByText, queryByText } = render(
      <Modal.Manager>
        {modal => (
          <React.Fragment>
            <Modal {...modal}>
              <h3>{modalText}</h3>
            </Modal>
            <button onClick={() => modal.showModal(true)}>{btnText}</button>
          </React.Fragment>
        )}
      </Modal.Manager>
    );

    expect(queryByText(modalText)).not.toBeInTheDocument();

    fireEvent.click(getByText(btnText));

    expect(queryByText(modalText)).toBeInTheDocument();
  });

  test('Closes the modal when clicked on modal`s close button', async () => {
    const modalText = 'This is a modal';

    const { queryByText, getByTestId, debug } = render(
      <Modal.Manager isOpen={true}>
        {modal => (
          <Modal {...modal}>
            <h3>{modalText}</h3>
          </Modal>
        )}
      </Modal.Manager>
    );

    expect(queryByText(modalText)).toBeInTheDocument();

    fireEvent.click(getByTestId('modal-close-btn'));

    await wait(() => expect(queryByText(modalText)).not.toBeInTheDocument());
  });

  test('Closes the modal when clicked on modal`s backdrop', async () => {
    const modalText = 'This is a modal';

    const { queryByText, getByTestId, debug } = render(
      <Modal.Manager isOpen={true}>
        {modal => (
          <Modal {...modal}>
            <h3>{modalText}</h3>
          </Modal>
        )}
      </Modal.Manager>
    );

    expect(queryByText(modalText)).toBeInTheDocument();

    fireEvent.click(getByTestId('backdrop'));

    await wait(() => expect(queryByText(modalText)).not.toBeInTheDocument());
  });
});
