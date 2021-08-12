import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import {
  ROUTE_HOME,
  ROUTE_ARTICLE_LIST,
  ROUTE_ARTICLE_CREATE,
  ROUTE_ARTICLE_EDIT,
  ROUTE_AUTHOR_LIST,
  ROUTE_AUTHOR_CREATE,
  ROUTE_AUTHOR_EDIT,
} from '../../constants';
import ArticleList from '../../pages/article/ArticleList/ArticleList';
import ArticleCreate from '../../pages/article/ArticleCreate/ArticleCreate';
import ArticleEdit from '../../pages/article/ArticleEdit/ArticleEdit';
import AuthorList from '../../pages/author/AuthorList/AuthorList';
import AuthorCreate from '../../pages/author/AuthorCreate/AuthorCreate';
import AuthorEdit from '../../pages/author/AuthorEdit/AuthorEdit';

function MainContent() {
  return (
    <div className="MainContent mt-3">
      <Container>
        <Switch>
          <Route path={ROUTE_ARTICLE_LIST}>
            <ArticleList />
          </Route>
          <Route path={ROUTE_ARTICLE_CREATE}>
            <ArticleCreate />
          </Route>
          <Route path={ROUTE_ARTICLE_EDIT}>
            <ArticleEdit />
          </Route>

          <Route path={ROUTE_AUTHOR_LIST}>
            <AuthorList />
          </Route>
          <Route path={ROUTE_AUTHOR_CREATE}>
            <AuthorCreate />
          </Route>
          <Route path={ROUTE_AUTHOR_EDIT}>
            <AuthorEdit />
          </Route>

          <Route path={ROUTE_HOME}>
            <Redirect to={ROUTE_ARTICLE_LIST} />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default MainContent;
