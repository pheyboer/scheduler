import {
  fireEvent,
  getByText,
  findByText,
  getByPlaceholderText,
  getAllByTestId,
  getByAltText,
  queryByText,
  queryByAltText,
  findAllByAltText,
  waitFor,
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
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await findByText(container, 'Archie Cohen');

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, 'appointment').find(
    (appointment) => queryByText(appointment, 'Archie Cohen')
  );

  fireEvent.click(queryByAltText(appointment, 'Delete'));

  // 4. Check that the confirmation message is shown.
  expect(
    getByText(appointment, 'Are you sure you would like to delete?')
  ).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, 'Confirm'));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await findAllByAltText(appointment, 'Add');

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, 'day').find((day) =>
    queryByText(day, 'Monday')
  );
  expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
});

/*
tests:
"loads data, cancels an interview and increases the spots remaining for Monday by 1"
"loads data, edits an interview and keeps the spots remaining for Monday the same"
"shows the save error when failing to save an appointment"
"shows the delete error when failing to delete an existing appointment"
*/

it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
  //1 render the application
  const { container } = render(<Application />);

  //2 Wait until the text "Archie Cohen" is displayed - data loaded
  await findByText(container, 'Archie Cohen');

  //3 click on the edit button on the booked appointment
  const appointment = getAllByTestId(container, 'appointment').find(
    (appointment) => queryByText(appointment, 'Archie Cohen')
  );
  fireEvent.click(getByAltText(appointment, 'Edit'));

  //4 edit data
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: 'Lydia Miller-Jones' },
  });

  //5 select interviewer
  fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

  //6 click save button
  fireEvent.click(getByText(container, 'Save'));

  //7 check if saving message is displayed
  expect(getByText(appointment, 'Saving')).toBeInTheDocument();

  //8 wait until new info displayed
  await findByText(appointment, 'Lydia Miller-Jones');

  //9 check if DayList Item for monday has same spots remaining
  const day = getAllByTestId(container, 'day').find((day) =>
    queryByText(day, 'Monday')
  );
  expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
});

it('shows the save error when failing to save an appointment', async () => {
  axios.put.mockRejectedValueOnce(new Error("Failed to save appointment"));
  //1 render the application
  const { container } = render(<Application />);

  //2 Wait until the text "Archie Cohen" is displayed (data loaded)
  await findByText(container, 'Archie Cohen');

  //3 Click on edit button on the booked appointment
  const appointment = getAllByTestId(container, 'appointment').find((appointment) =>
    queryByText(appointment, 'Archie Cohen')
  );
  fireEvent.click(getByAltText(appointment, 'Edit'));

  //4 Edit student name

  //5 Select interviewer

  //6 Click save button

  //7 Check for error message 

  //8 Check close button and hides the error message


});

it('shows the delete error when failing to delete an existing appointment', () => {
  //1 render the application
  //2
  //3
  //4
});
