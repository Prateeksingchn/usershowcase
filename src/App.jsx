import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// Form component
const Form = ({ onSubmit, onCancel, initialValues = null }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [contact, setContact] = useState(initialValues?.contact || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: initialValues?.id || nanoid(), name, email, contact });
    setName('');
    setEmail('');
    setContact('');
  };

  const handleCancel = () => {
    onCancel();
    setName('');
    setEmail('');
    setContact('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white flex gap-5 shadow-lg rounded-lg p-8 mb-8 w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {initialValues ? 'Edit User' : 'Add User'}
      </h2>
      <div className="mb-5">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
          Contact
        </label>
        <input
          type="text"
          id="contact"
          placeholder="Enter your contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 text-white px-2 py-1 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {initialValues ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
};

// UserCard component
const UserCard = ({ user, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(user.id);
  };

  const handleEdit = () => {
    onEdit(user);
  };

  return (
    <div className="bg-white shadow-md rounded-lg lg:p-6 p-2 lg:flex lg:flex-row flex flex-col lg:items-center items-start lg:justify-between justify-start">
      <div>
        <p className="text-lg text-gray-800"><span className='font-semibold'>Name:</span> {user.name}</p>
        <p className="lg:text-lg text-md text-gray-800 text-wrap lg:text-nowrap"><span className='font-semibold'>Email:</span> {user.email}</p>
        <p className="text-lg text-gray-800"><span className='font-semibold'>Contact:</span> {user.contact}</p>
      </div>
      <div className="flex items-start justify-start gap-4 lh:ml-5 mt-2">
        <button
          onClick={handleEdit}
          className="bg-indigo-600 text-white px-4 lg:py-2 py-1 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 lg:py-2 py-1 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// UserList component
const UserList = ({ users, onDelete, onEdit }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-xl lg:p-8 p-3">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">User List</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users added yet.</p>
      ) : (
        <div className="space-y-6">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// App component
const App = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleSubmit = (newUser) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setEditUser(null);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleCancelEdit = () => {
    setEditUser(null);
  };

  return (
    <div className="max-w-5xl  mx-auto p-8 bg-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div>
          {editUser ? (
            <Form
              onSubmit={handleUpdateUser}
              onCancel={handleCancelEdit}
              initialValues={editUser}
            />
          ) : (
            <Form onSubmit={handleSubmit} />
          )}
        </div>
        <div>
          <UserList users={users} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
};

export default App;
