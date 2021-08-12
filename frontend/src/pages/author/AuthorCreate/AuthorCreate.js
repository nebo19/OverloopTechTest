import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ROUTE_AUTHOR_LIST } from '../../../constants';
import { createAuthor } from '../../../services/authors';
import CancelButton from '../../../components/CancelButton/CancelButton';

const AuthorCreate = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState();

  const handleSave = async () => {
    const payload = { firstName, lastName };
    try {
      await createAuthor(payload);
    } catch (err) {
      setError(err.response.data.message);
      return;
    }
    history.push(ROUTE_AUTHOR_LIST);
  };

  return (
    <div>
      <h1>Create Author</h1>
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
        <Button
          variant="primary"
          onClick={handleSave}
          data-testid="createButton"
        >
          Save Author
        </Button>
        <CancelButton />
      </Form>
    </div>
  );
};

export default AuthorCreate;
