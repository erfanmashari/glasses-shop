import Image from "next/image";

const PaymentDetails = () => {
  return (
    <div className="w-5/12 flex flex-col px-5 py-10">
      <div
        className="w-full flex flex-col gap-4 p-3 rounded-lg"
        style={{
          color: "#4E4C4D",
          backgroundImage: "linear-gradient(to right, #E0E0E2, #CACACC)",
        }}
      >
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-xl font-bold">فروشگاه سی</h1>
          <Image
            width={60}
            height={60}
            src={"/images/sudo-orange.png"}
            alt="logo"
          />
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <p className="w-5/12">مبلغ تراکنش(ریال)</p>
          <span className="text-stone-900 font-bold">50,000,000</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
