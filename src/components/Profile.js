import React from 'react';

function Profile({ name, last_name }) {
  return (
    <div className="user">
      <div className="user__notifications">
        <i className="ion-android-notifications"></i>
      </div>
    
      <div className="user__info">
                     
        <span className="user__info__name">
          <span className="first">{name}</span>
          {' '}
          <span className="last">{last_name}</span>
          </span>
      </div>
    </div>
  );
}

export default Profile;