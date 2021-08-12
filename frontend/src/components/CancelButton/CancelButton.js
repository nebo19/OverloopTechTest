import React from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';

const CancelButton = ({ link }) => {
  const history = useHistory();

  return (
    <Button
      variant="secondary"
      onClick={() => history.goBack()}
      style={{ marginLeft: '5px' }}
    >
      Cancel
    </Button>
  );
};

export default CancelButton;
