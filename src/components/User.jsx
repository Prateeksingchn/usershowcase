import React from 'react';

const User = ({ user, deleteUser }) => {
  return (
    <li className="flex justify-between items-center p-2 border-b border-gray-200">
      <span>
        {user.name} - {user.contact}
      </span>
      <button
        onClick={() => deleteUser(user.id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default User;
