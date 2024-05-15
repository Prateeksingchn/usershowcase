import React from 'react';
import User from './User';

const UserList = ({ users, deleteUser }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <User key={user.id} user={user} deleteUser={deleteUser} />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
