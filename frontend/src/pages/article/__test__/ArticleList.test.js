import React from 'react';
import ArticleList from '../ArticleList/ArticleList';
import { render, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { listArticles } from '../../../services/articles';

jest.mock('../../../services/articles');

test('when a user lists articles, author should be visible for each individual article', async () => {
  listArticles.mockResolvedValue([
    {
      id: 1,
      title: 'First Article',
      author: {
        id: 1,
        firstName: 'John',
        lastName: 'Johnson',
      },
      authorId: 1,
    },
    {
      id: 2,
      title: 'Second Article',
      author: {
        id: 2,
        firstName: 'Mark',
        lastName: 'Mason',
      },
      authorId: 2,
    },
  ]);

  const { getByTestId } = render(
    <Router>
      <ArticleList />)
    </Router>
  );

  await act(() => Promise.resolve());

  const authorNameEl1 = getByTestId('authorName1');
  const authorNameEl2 = getByTestId('authorName2');

  setImmediate(() => {
    expect(listArticles).toHaveBeenCalledTimes(1);
    expect(authorNameEl1.textContent).toBe('John Johnson');
    expect(authorNameEl2.textContent).toBe('Mark Mason');
  });
});
