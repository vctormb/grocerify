import React from 'react';
import { render, cleanup } from 'test-utils';

import Badge from '../Badge';

afterEach(cleanup);

describe('<Badge />', () => {
  test.only('Rerenders the badge with count equals to zero, 99 and more than 99', () => {
    const badgeId = 'badge';
    const { queryByTestId, rerender } = render(<Badge count={0} />);

    expect(queryByTestId(badgeId)).not.toBeInTheDocument();

    rerender(<Badge count={99} />);
    expect(queryByTestId(badgeId)).toBeInTheDocument();
    expect(queryByTestId(badgeId)).toHaveTextContent(99);

    rerender(<Badge count={100} />);
    expect(queryByTestId(badgeId)).toHaveTextContent('99+');
  });
});
