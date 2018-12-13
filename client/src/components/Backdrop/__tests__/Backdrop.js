import React from 'react';
import { render, cleanup, wait } from 'test-utils';

import Backdrop from '../Backdrop';

afterEach(cleanup);

describe('<Backdrop />', () => {
  it('should show and hide Backdrop', async () => {
    const backdropId = 'backdrop';
    const { queryByTestId, rerender } = render(<Backdrop show={true} />);

    expect(queryByTestId(backdropId)).toBeInTheDocument();

    rerender(<Backdrop show={false} />);

    await wait(() => expect(queryByTestId(backdropId)).not.toBeInTheDocument());
  });
});
