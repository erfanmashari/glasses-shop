import Link from "next/link";

const Verified = ({ trackingCode }) => {
  return (
    <main
      dir="rtl"
      className="w-full h-screen flex flex-col justify-center items-center gap-4"
      style={{ backgroundImage: "linear-gradient(to right, #E4E5E9, #D4D3D8)" }}
    >
      <div className="w-4/12 flex flex-col justidy-center items-center bg-yellow-400 text-white rounded-xl gap-4 p-6">
        <h1 className="text-xl font-bold">پرداخت شما با موفقیت انجام شد!</h1>
        <span className="font-bold text-lg">کد پیگیری: {trackingCode}</span>
        <Link
          href={"/"}
          className="text-white bg-blue-600 rounded-lg py-1.5 px-3"
        >
          رفتن به صفحه اصلی
        </Link>
      </div>
    </main>
  );
};

export default Verified;
