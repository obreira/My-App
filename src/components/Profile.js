import React from 'react';

function Profile({ name, age, email }) {
  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default Profile;
