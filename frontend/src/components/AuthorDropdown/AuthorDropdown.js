import React, { useState, useEffect } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
import { listAuthors } from '../../services/authors';

const AuthorDropdown = ({ value, onChange }) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await listAuthors();
      data.unshift({
        authorId: 0,
        title: '- None -',
      });
      setAuthors(data);
    };

    fetchAuthors();
  }, []);

  return (
    <div>
      <DropdownList
        value={value}
        data={authors}
        textField={(author) =>
          author?.firstName
            ? author.firstName + ' ' + author?.lastName
            : author?.title
        }
        valueField="id"
        onChange={onChange}
        allowCreate={false}
        data-testid="authorDropdown"
      />
    </div>
  );
};

export default AuthorDropdown;
