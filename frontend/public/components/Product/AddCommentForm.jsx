import FormInput from "./FormInput";
import AddCommentPoints from "./AddCommentPoints";

const AddCommentForm = () => {
  return (
    <div className="w-full h-screen fixed top-0 right-0 flex justify-center items-center bg-black/10 z-30">
      <form className="w-4/12 max-h-4/6 flex flex-col justify-center items-center bg-white rounded-lg ovrflow-y-scroll gap-4 p-6">
        <h3 className="w-full text-lg font-bold text-stone-900 border-b-2 border-stone-200 pb-2">
          ثبت نظر جدید
        </h3>
        <FormInput
          label={"عنوان نظر"}
          placeholder={"عنوان نظر"}
          type={"text"}
          parameter={"title"}
          required={true}
        />
        <FormInput
          label={"توضیح نظر"}
          placeholder={"توضیح نظر"}
          type={"text"}
          parameter={"title"}
          required={true}
        />
        <AddCommentPoints
          label={"نکات مثبت"}
          placeholder={"نکات مثبت محصول"}
          parameter={"positivePoints"}
        />
        <AddCommentPoints
          label={"نکات منفی"}
          placeholder={"نکات منفی محصول"}
          parameter={"negativePoints"}
        />
        <button
          // onClick={addOrder}
          className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5 mt-4"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          ثبت نظر جدید
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
