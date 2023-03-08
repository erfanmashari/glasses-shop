import Drawer from "../Drawer";
import SetPassword from "./SetPassword";

const Password = () => {
  return (
    <main className="w-full flex flex-row justify-center items-start gap-6 p-8">
      <Drawer />
      <SetPassword />
    </main>
  );
};

export default Password;
