import ImagesItem from "./ImagesItem"

const ImagesList = () => {
  return (
    <div className='w-2/3 grid grid-cols-2 gap-4 mt-4'>
        <ImagesItem src={"/images/test.jpg"} />
        <ImagesItem src={"/images/test.jpg"} />
        <ImagesItem src={"/images/test.jpg"} />
        <ImagesItem src={"/images/test.jpg"} />
        <ImagesItem src={"/images/test.jpg"} />
    </div>
  )
}

export default ImagesList