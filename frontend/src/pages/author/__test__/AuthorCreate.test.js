import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AuthorCreate from '../AuthorCreate/AuthorCreate';
import { createAuthor } from '../../../services/authors';

jest.mock('../../../services/authors');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('Creates an author with first name and last name', () => {
  createAuthor.mockResolvedValue({ success: true });

  const { getByTestId } = render(<AuthorCreate />);

  const firstNameEl = getByTestId('firstName');
  const lastNameEl = getByTestId('lastName');
  const buttonEl = getByTestId('createButton');

  fireEvent.change(firstNameEl, {
    target: {
      value: 'John',
    },
  });
  fireEvent.change(lastNameEl, {
    target: {
      value: 'Johnson',
    },
  });

  fireEvent.click(buttonEl);

  expect(createAuthor).toHaveBeenCalledTimes(1);
  expect(createAuthor).toHaveBeenCalledWith({
    firstName: 'John',
    lastName: 'Johnson',
  });
});
