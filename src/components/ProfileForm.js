import React, { useState } from 'react';

function ProfileForm({ createProfile }) {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the profile object
    const newProfile = {
      name: name,
      last_name: last_name,
    };

    // Pass the profile object to the parent component
    createProfile(newProfile);

    // Clear the form inputs
    setName('');
    setLastName('');
  };

  return (
    <div>
      <h3>Create Profile</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
       
        <div>
          <label>Last Name:</label>
          <input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;
