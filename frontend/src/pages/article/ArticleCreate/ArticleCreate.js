import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CancelButton from '../../../components/CancelButton/CancelButton';

import { ROUTE_ARTICLE_LIST } from '../../../constants';
import { createArticle } from '../../../services/articles';
import RegionDropdown from '../../../components/RegionDropdown/RegionDropdown';
import AuthorDropdown from '../../../components/AuthorDropdown/AuthorDropdown';

function ArticleCreate() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [regions, setRegions] = useState([]);
  const [author, setAuthor] = useState({});
  const [error, setError] = useState('');

  const handleSave = async () => {
    const payload = {
      title,
      content,
      regions,
      author: author?.authorId === 0 ? {} : author,
    };
    try {
      await createArticle(payload);
    } catch (err) {
      setError(err.response.data.message);
      return;
    }

    history.push(ROUTE_ARTICLE_LIST);
  };

  return (
    <div className="ArticleCreate">
      <h1>Create Article</h1>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            data-testid="title"
          />
          {error && <p className="text-danger">{error}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Content"
            rows="5"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            data-testid="content"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <AuthorDropdown
            value={author}
            onChange={(author) => setAuthor(author)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Regions</Form.Label>
          <RegionDropdown
            value={regions}
            onChange={(regions) => setRegions(regions)}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleSave}
          data-testid="createButton"
        >
          Save Article
        </Button>
        <CancelButton />
      </Form>
    </div>
  );
}

export default ArticleCreate;
