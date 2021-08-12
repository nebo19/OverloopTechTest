import React from 'react';
import { render, act } from '@testing-library/react';
import AuthorList from '../AuthorList/AuthorList';
import { listAuthors } from '../../../services/authors';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../services/authors');

test('lists all authors', async () => {
  listAuthors.mockResolvedValue([
    { id: 1, firstName: 'Nebojsa', lastName: 'Radosavovic' },
    { id: 2, firstName: 'John', lastName: 'Johnson' },
  ]);

  const { getByTestId } = render(
    <Router>
      <AuthorList />
    </Router>
  );

  await act(() => Promise.resolve());

  const firstNameEl1 = getByTestId('firstName1');
  const lastNameEl1 = getByTestId('lastName1');
  const firstNameEl2 = getByTestId('firstName2');
  const lastNameEl2 = getByTestId('lastName2');

  expect(listAuthors).toHaveBeenCalledTimes(1);
  expect(firstNameEl1.textContent).toBe('Nebojsa');
  expect(lastNameEl1.textContent).toBe('Radosavovic');
  expect(firstNameEl2.textContent).toBe('John');
  expect(lastNameEl2.textContent).toBe('Johnson');
});
