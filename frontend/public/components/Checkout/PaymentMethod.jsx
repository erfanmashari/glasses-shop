import Image from "next/image";

const PaymentMethod = () => {
  return (
    <div
      className="w-full flex flex-col justify-start items-start rounded-md gap-6 p-4"
      style={{ border: "2px solid #dbdddc" }}
    >
      <h3 className="font-bold">روش پرداخت</h3>
      <div className="flex flex-col justify-center items-center gap-2">
        <Image
          width={60}
          height={60}
          alt={"zarinpal"}
          src="/images/zarinpal.png"
        />
        <input type="radio" name="payment-method" />
      </div>
    </div>
  );
};

export default PaymentMethod;
