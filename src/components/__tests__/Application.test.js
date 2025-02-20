import { fireEvent } from '@testing-library/react';

/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from 'react';

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from '@testing-library/react';

/*
  We import the component that we are testing
*/
import Application from '../Application';
/*
  A test that renders a React Component
*/
it('defaults to Monday and changes the schedule when a new day is selected', () => {
  const { queryByText, findByText } = render(<Application />);

  return findByText('Monday').then(() => {
    fireEvent.click(queryByText('Tuesday'));
    expect(queryByText('Leopold Silvers')).toBeInTheDocument();
  });
});
