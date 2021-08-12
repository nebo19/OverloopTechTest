import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CancelButton from '../../../components/CancelButton/CancelButton';

import { ROUTE_AUTHOR_LIST } from '../../../constants';
import { getAuthor, editAuthor } from '../../../services/authors';

const AuthorEdit = () => {
  const history = useHistory();
  const { authorId } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState();

  useEffect(() => {
    const fetchAuthor = async () => {
      const data = await getAuthor(authorId);
      setFirstName(data.firstName);
      setLastName(data.lastName);
    };

    fetchAuthor();
  }, [authorId]);

  const handleSave = async () => {
    const payload = { firstName, lastName };
    try {
      await editAuthor(authorId, payload);
    } catch (err) {
      setError(err.response.data.message);
      return;
    }
    history.push(ROUTE_AUTHOR_LIST);
  };

  return (
    <div>
      <h1>Edit Author</h1>
      <Form>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            data-testid="firstName"
          />
          {error && <p className="text-danger">{error}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            data-testid="lastName"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSave} data-testid="editButton">
          Save Author
        </Button>
        <CancelButton />
      </Form>
    </div>
  );
};

export default AuthorEdit;
