import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from '../Appointment/Form';
import '@testing-library/jest-dom';

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      student: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
  ];

  const onSave = jest.fn();

  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('renders with initial student name', () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  //validation tests

  it('validates that the student name is not blank', () => {
    const onSave = jest.fn();

    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  xit('validates that the interviewer cannot be null', () => {
    const onSave = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    // Add a student name to pass the first validation
    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });

    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    /* 3. validation is shown */
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();

    /* 4. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  xit('calls onSave function when the name is defined', () => {
    const onSave = jest.fn();

    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
        name="Lydia Miller-Jones"
        interviewer={interviewers[0].id}
      />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText('Save'));

    /* 5. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();

    /* 6. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);

    /* 7. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
  });

  xit('submits the name entered by the user', () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );

    const input = getByPlaceholderText('Enter Student Name');

    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });
    fireEvent.click(getByText('Save'));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', 1);
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
