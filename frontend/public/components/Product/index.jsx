import ImagesList from "./ImagesList"

const Product = () => {
  return (
    <main className='w-full flex flex-col justify-center items-center p-8'>
        <div className='w-full flex flex-row justify-between items-start'>
            <ImagesList />
        </div>
    </main>
  )
}

export default Product