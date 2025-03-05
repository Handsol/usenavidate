import { useState } from 'react';
import ProfileForm from '../components/ProfileForm';

const ProfilePage = () => {
  return (
    <>
      <div className="flex flex-row justify-center pt-5">
        <div className="flex flex-grow-0 bg-palette1 w-fit text-palette5 text-2xl font-bold rounded-full px-8 py-2">
          Profile
        </div>
      </div>
      <div className="flex flex-row justify-center text-left w-full pt-5 px-40">
        <div className="flex flex-col text-center text-palette6 p-4">
          <p className="text-left text-palette1 text-1xl font-semibold">Profile</p>
        </div>
        <ProfileForm />
      </div>
    </>
  );
};

export default ProfilePage;
