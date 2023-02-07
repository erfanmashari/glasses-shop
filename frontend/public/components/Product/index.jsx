import ImagesList from "./ImagesList"
import BuyForm from "./BuyForm"
import ProductInfo from "./ProductInfo"

const Product = () => {
  return (
    <main className='w-full flex flex-col justify-center items-center p-8'>
        <div className='w-full flex flex-row justify-between items-start gap-4'>
            <ImagesList />
            <BuyForm />
        </div>
        <ProductInfo />
    </main>
  )
}

export default Product