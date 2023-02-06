// import components
import ProductsItem from "./ProductsItem";

// import styles
import layoutStyles from "../../../styles/Layout.module.css";

const ProductsList = () => {
  return (
    <ul className={`${layoutStyles["nav-products-list"]} w-full flex flex-row justify-center items-center text-white gap-4 px-8 py-3`}>
        <ProductsItem name={"کالای دیجیتال"} />
        <ProductsItem name={"خودرو، ایزار و تجهیزات"} />
        <ProductsItem name={"مد و پوشاک"} />
        <ProductsItem name={"کالاهای سوپرمارکتی"} />
        <ProductsItem name={"اسباب بازی، کودک و نوزاد"} />
        <ProductsItem name={"محصولات بومی و محلی"} />
        {/* <ProductsItem name={"زیبایی و سلامت"} />
        <ProductsItem name={"خانه و آشپزخانه"} />
        <ProductsItem name={"کتاب، لوازم التحریر و هنر"} />
        <ProductsItem name={"ورزش وسفر"} /> */}
    </ul>
  )
}

export default ProductsList