import React from 'react';
import ArticleCreate from '../ArticleCreate/ArticleCreate';
import { render, act, fireEvent } from '@testing-library/react';
import { listAuthors } from '../../../services/authors';
import { createArticle } from '../../../services/articles';

jest.mock('../../../services/articles');
jest.mock('../../../services/authors');

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

test('when a user opens an article he should be able to see an author of that particular article', async () => {
  listAuthors.mockResolvedValue([
    { id: 1, firstName: 'Nebojsa', lastName: 'Radosavovic' },
    { id: 2, firstName: 'John', lastName: 'Johnson' },
  ]);

  const { getByTestId } = render(<ArticleCreate />);

  await act(() => Promise.resolve());

  const title = getByTestId('title');
  const content = getByTestId('content');
  const buttonEl = getByTestId('createButton');

  fireEvent.change(title, {
    target: {
      value: 'First Article',
    },
  });
  fireEvent.change(content, {
    target: {
      value: 'new content',
    },
  });

  fireEvent.click(buttonEl);

  expect(createArticle).toHaveBeenCalledTimes(1);
  expect(createArticle).toHaveBeenCalledWith({
    author: {},
    title: 'First Article',
    content: 'new content',
    regions: [],
  });
});
