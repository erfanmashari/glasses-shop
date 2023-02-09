import React from "react";

const FormInput = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <label className="text-md font-bold text-stone-500">شماره همراه</label>
      <input
        type="text"
        placeholder="شماره همراه خود را وارد کنید..."
        className="w-full px-5 py-2.5 border-none outline-none rounded-3xl shadow-lg bg-stone-100 shadow-stone-400"
      />
    </div>
  );
};

export default FormInput;
