import React from 'react';
import DepsProfile from './dep_profile';
import MyProfile from './my_profile';

export default function Profile() {

  
    return (
        <div className="d-flex justify-content-around">
            <MyProfile />

            <DepsProfile />
      </div>
    )
}