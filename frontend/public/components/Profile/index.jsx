import Drawer from "./Drawer";
import PersonalInfo from "./PersonalInfo";

const Profile = () => {
  return (
    <main
      className="w-full flex flex-row justify-center items-start gap-6 p-8 mt-5"
    >
      <Drawer />
      <PersonalInfo />
    </main>
  );
};

export default Profile;
