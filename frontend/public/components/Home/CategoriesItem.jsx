import Image from "next/image"

const CategoriesItem = ({ label, src, alt }) => {
  return (
    <div className='flex flex-col justify-center items-center bg-stone-100 border-2 text-stone-700 rounded-full cursor-pointer' style={{ width: "200px", height: "200px" }}>
        <Image alt={alt} src={src} width={130} height={100} />
        <h4 className="text-lg relative bottom-5">{label}</h4>
    </div>
  )
}

export default CategoriesItem