// import from next core
import Image from "next/image";

// import icons
import { BsInstagram, BsTelegram, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
  return (
    <footer
      className={`w-full flex flex-col text-stone-500 p-8`}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-start gap-40">
          <ul className="flex flex-col gap-0.5">
            <li className="font-bold text-stone-800">محصولات فروشگاه سی</li>
            <li><button>عینک طبی</button></li>
            <li><button>عینک کامپیوتر</button></li>
            <li><button>عینک آفتابی</button></li>
          </ul>
          <ul className="flex flex-col gap-0.5">
            <li className="font-bold text-stone-800">همراه با فروشگاه سی</li>
            <li><button>تماس با ما</button></li>
            <li><button>درباره ما</button></li>
            <li><button>قوانین و مقررات</button></li>
          </ul>
          <ul className="flex flex-col gap-0.5">
            <li className="font-bold text-stone-800">راهنمای خرید از فروشگاه سی</li>
            <li><button>شیوه ثبت سفارش</button></li>
            <li><button>شیوه ارسال کالا</button></li>
            <li><button>شیوه پرداخت</button></li>
          </ul>
        </div>
        <div>
          <Image
            src={"/images/sudo-orange.png"}
            alt="logo"
            width={160}
            height={160}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-8">
        <div className="flex flex-row justify-center items-center text-stone-800 text-4xl gap-4">
          <button><BsInstagram /></button>
          <button><BsTelegram /></button>
          <button><BsWhatsapp /></button>
        </div>
        <div>
            <p className="text-stone-400">تمام حقوق این سایت متعلق به فروشگاه سی است و حق کپی برداری از آن مجاز نمی باشد.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
