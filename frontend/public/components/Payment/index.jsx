import PaymentForm from "./PaymentForm";
import PaymentDetails from "./PaymentDetails";

const Payment = () => {
  return (
    <main
      dir="rtl"
      className="w-full h-screen flex flex-col justify-center items-center gap-4"
      style={{ backgroundImage: "linear-gradient(to right, #E4E5E9, #D4D3D8)" }}
    >
      <div className="w-8/12 bg-red-600 rounded-xl p-6">
        <p className="w-full text-white text-justify">
          توجه: این درگاه پرداخت کاملا فیک و برای تست توسعه داده شده است و
          همچنین اطلاعاتی که در اینجا برای پرداخت وارد می کنید در دیتابیس ذخیره
          می شود پس خواهشمند است اطلاعاتی که در اینجا وارد می کنید کاملا
          غیرواقعی باشد زیرا توسعه دهندگان هیچگونه مسئولیتی در قبال هرگونه سوء
          استفاده را قبول نمی کنند!
        </p>
      </div>
      <div
        className="w-8/12 flex flex-row justify-center items-start rounded-xl"
        style={{
          backgroundImage: "linear-gradient(to right, #FCFCFC, #F8F9FB)",
        }}
      >
        <PaymentForm />
        <PaymentDetails />
      </div>
    </main>
  );
};

export default Payment;
