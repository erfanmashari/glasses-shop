import FormInput from "./FormInput";

const LoginForm = () => {
  return (
    <form
      className="w-7/12 h-full flex flex-col justify-center py-28 px-24 gap-8"
      style={{
        backgroundImage: "linear-gradient(to bottom, #f7e7e7, #d6b8b8)",
      }}
    >
      <FormInput />
      <div
        className="w-full flex justify-center items-center pt-4"
        style={{ borderTop: "3px solid #ffffff", color: "#ffffff" }}
      >
        <p className="text-sm" style={{ textShadow: "2px 2px 5px #3d3d3d" }}>
          See Shop
        </p>
      </div>
      <button
        className="w-full text-center rounded-3xl text-white font-bold py-3"
        style={{
          backgroundImage: "linear-gradient(to bottom, #615050, #2e2626)",
        }}
      >
        ارسال کد تایید
      </button>
    </form>
  );
};

export default LoginForm;
