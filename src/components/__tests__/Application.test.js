import {
  fireEvent,
  getByText,
  findByText,
  getByPlaceholderText,
  getAllByTestId,
  getByAltText,
  queryByText,
} from '@testing-library/react';

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

import axios from 'axios';
jest.mock('axios');


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

it('loads data, books an interview and reduces the spots remaining for monday by 1', async () => {
  const { container } = render(<Application />);

  //1.wait for text, confirm data has loaded
  // await findByText(container, "Archie Cohen");
  await findByText(container, 'Archie Cohen');

  //2.find first empty appointment and click add
  // const appointments = getAllByTestId(container, 'appointment');
  const appointments = getAllByTestId(container, 'appointment');
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, 'Add'));

  //3. enter new text in field with placeholder text
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: 'Lydia Miller-Jones' },
  });

  //4. click first interviewer in list
  fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

  //5. click save
  fireEvent.click(getByText(container, 'Save'));

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

it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
  // 1. Render the Application.
  // 2. Wait until the text "Archie Cohen" is displayed.
  // 3. Click the "Delete" button on the booked appointment.
  // 4. Check that the confirmation message is shown.
  // 5. Click the "Confirm" button on the confirmation.
  // 6. Check that the element with the text "Deleting" is displayed.
  // 7. Wait until the element with the "Add" button is displayed.
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
});
