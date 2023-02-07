import Image from "next/image"

const NewestProductsItem = () => {
  return (
    <li className='w-1/4 flex flex-col justify-center items-center cursor-pointer'>
        <header className='w-full text-center text-black font-bold text-lg border-b-2 pb-1'>
        عینک آفتابی مارتیانو Martiano YD1050 C1
        </header>
        <div className="w-full relative" style={{ height: "200px" }}>
        <Image
          fill={true}
          alt={"special-offer-image"}
          src={"/images/test.jpg"}
        />
        </div>
        <p className="font-bold">1,190,000 تومان</p>
        <button className="border-b-2 py-1.5 px-3 mt-2 hover:border-blue-600">افزودن به سبد خرید</button>
    </li>
  )
}

export default NewestProductsItem