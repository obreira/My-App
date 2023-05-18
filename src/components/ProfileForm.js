import React, { useState } from 'react';

function ProfileForm({ createProfile }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the profile object
    const newProfile = {
      name: name,
      age: age,
      email: email,
    };

    // Pass the profile object to the parent component
    createProfile(newProfile);

    // Clear the form inputs
    setName('');
    setAge('');
    setEmail('');
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Age:</label>
          <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;
