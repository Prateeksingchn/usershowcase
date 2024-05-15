import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const Form = ({ addUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...formData, id: nanoid() };
    addUser(newUser);
    setFormData({
      name: '',
      email: '',
      contact: '',
    });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="appearance-none rounded-md mb-3 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="appearance-none rounded-md mb-3 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contact" className="sr-only">
            Contact
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            required
            className="appearance-none rounded-md mb-3 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-blue-400 mt-10 rounded-full"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
