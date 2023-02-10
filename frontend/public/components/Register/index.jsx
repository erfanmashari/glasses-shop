import RegisterForm from "./RegisterForm";
import TitleSide from "./TitleSide";

const Register = () => {
  return (
    <main
      dir="rtl"
      className="w-full h-screen flex justify-center items-center"
      style={{ backgroundImage: "linear-gradient(to right, #c09f9f, #967272)" }}
    >
      <div
        className="w-8/12 h-4/6 flex flex-row overflow-hidden rounded-2xl"
        style={{
          backgroundImage: "linear-gradient(to bottom, #856565, #2e2626)",
        }}
      >
        <RegisterForm />
        <TitleSide />
      </div>
    </main>
  );
};

export default Register;
