import React from 'react';
import ArticleEdit from '../ArticleEdit/ArticleEdit';
import { render, act, fireEvent, screen } from '@testing-library/react';
import { getArticle, editArticle } from '../../../services/articles';
import { listAuthors } from '../../../services/authors';

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../../../services/articles');
jest.mock('../../../services/authors');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    articleId: 1,
  }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('when a user opens an article he should be able to see an author of that particular article', async () => {
  getArticle.mockResolvedValue({
    id: 1,
    title: 'First Article',
    author: {
      id: 1,
      firstName: 'John',
      lastName: 'Johnson',
    },
    authorId: 1,
  });

  listAuthors.mockResolvedValue([
    { id: 1, firstName: 'John', lastName: 'Johnson' },
    { id: 2, firstName: 'Mark', lastName: 'Mason' },
  ]);

  const { getByTestId } = render(<ArticleEdit />);

  await act(() => Promise.resolve());

  const authorDropdown = getByTestId('authorDropdown');

  expect(getArticle).toHaveBeenCalledTimes(1);
  expect(listAuthors).toHaveBeenCalledTimes(1);
  expect(authorDropdown.textContent).toBe('John Johnson');
  expect(authorDropdown.textContent).not.toBe('Mark Mason');
});

test('user should be able to remove an author from an article', async () => {
  getArticle.mockResolvedValue({
    id: 1,
    title: 'First Article',
    content: 'some content',
    regions: [],
    author: {
      id: 1,
      firstName: 'John',
      lastName: 'Johnson',
    },
    authorId: 1,
  });

  listAuthors.mockResolvedValue([
    { id: 1, firstName: 'John', lastName: 'Johnson' },
    { id: 2, firstName: 'Mark', lastName: 'Mason' },
  ]);

  editArticle.mockResolvedValue({
    success: true,
  });

  const { getByTestId } = render(<ArticleEdit />);

  await act(() => Promise.resolve());

  const authorDropdown = getByTestId('authorDropdown');

  expect(getArticle).toHaveBeenCalledTimes(1);
  expect(listAuthors).toHaveBeenCalledTimes(1);
  expect(authorDropdown.textContent).toBe('John Johnson');
  expect(authorDropdown.textContent).not.toBe('Mark Mason');

  fireEvent.click(screen.getByText('John Johnson'));
  fireEvent.click(screen.getByText('- None -'));

  const saveButton = getByTestId('saveButton');
  fireEvent.click(saveButton);

  expect(editArticle).toHaveBeenCalledTimes(1);
  expect(editArticle).toHaveBeenCalledWith(1, {
    author: {},
    content: 'some content',
    regions: [],
    title: 'First Article',
  });
});
