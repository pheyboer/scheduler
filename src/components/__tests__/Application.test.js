import { fireEvent, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';

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

// test: loads data, books an interview and reduces the spots remaining for the first day by 1

it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
  const { container, debug } = render(<Application />);

  //1.wait for text, confirm data has loaded
  await waitFor(() => getByText('Archie Cohen'));

  //2.find first empty appointment and click add
  const appointments = getAllByTestId(container, 'appointment');
  const appointment = appointments[0];

  fireEvent.click(getByText(appointment, 'Add'));

  //3. enter new text in field with placeholder text
  fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
    target: { value: 'Lydia Miller-Jones' },
  });

  //4. click first interviewer in list
  fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

  //5. click save
  fireEvent.click(getByText(appointment, 'Save'));

  //6. check that the element with the text "Saving" is displayed
  expect(getByText(appointment, 'Saving')).toBeInTheDocument();

  //7. wait until new text appears
  await findByText(appointment, 'Lydia Miller-Jones');

  //8. check DayListItem with the text "Monday" also has the text "No spots remaining"
  const day = getAllByTestId(container, 'day').find((day) =>
    queryByText(day, 'Monday')
  );
  expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
});
