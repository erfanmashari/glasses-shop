const FormInput = ({
  width,
  label,
  type,
  placeholder,
  parameter,
  formFields,
  changeInputValue,
}) => {
  return (
    <div className={`${width ? width : "w-full"} flex flex-col gap-2`}>
      <label className="text-md font-bold text-stone-600">{label}</label>
      <input
        value={formFields[parameter]}
        onChange={(e) => changeInputValue(parameter, e.target.value)}
        type={"password"}
        required={true}
        placeholder={placeholder}
        className={`w-full px-5 py-2.5 border-none outline-none rounded-3xl shadow-sm shadow-stone-400`}
      />
    </div>
  );
};

export default FormInput;
