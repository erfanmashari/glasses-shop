import ImagesList from "./ImagesList"
import BuyForm from "./BuyForm"

const Product = () => {
  return (
    <main className='w-full flex flex-col justify-center items-center p-8'>
        <div className='w-full flex flex-row justify-between items-start gap-4'>
            <ImagesList />
            <BuyForm />
        </div>
    </main>
  )
}

export default Product