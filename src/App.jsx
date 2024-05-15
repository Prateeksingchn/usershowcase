import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// Form component
const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: nanoid(), name, email, contact });
    setName('');
    setEmail('');
    setContact('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6">Add User</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="contact" className="block text-gray-700 font-semibold mb-2">
          Contact
        </label>
        <input
          type="text"
          id="contact"
          placeholder="Enter your contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Add User
      </button>
    </form>
  );
};

// UserCard component
const UserCard = ({ user, onDelete }) => {
  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
      <div>
        <p className="font-semibold">Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Contact: {user.contact}</p>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
      >
        Delete
      </button>
    </div>
  );
};

// UserList component
const UserList = ({ users, onDelete }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users added yet.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

// App component
const App = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Form onSubmit={handleSubmit} />
        <UserList users={users} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;