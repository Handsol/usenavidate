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
        <div className="flex flex-col text-center text-palette6 w-full p-4">
          <p className="text-left text-palette1 text-1xl font-semibold">Profile</p>
          {/* 여기에 록기님 인풋창 추가 */}
          <div className="flex flex-shrink-0 bg-palette5 w-10% min-h-52 p-1 rounded-2xl mt-5" />
        </div>
        <ProfileForm />
      </div>
    </>
  );
};

export default ProfilePage;
