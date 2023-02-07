import CategoriesItem from "./CategoriesItem"

const CategoriesList = () => {
  return (
    <div className='w-full flex flex-row justify-evenly items-center px-8 py-12'>
        <CategoriesItem label={"عینک طبی"} src={"/images/eyeglasses.png"} alt={"عینک طبی"} />
        <CategoriesItem label={"عینک کامپیوتر"} src={"/images/screen-glasses.png"} alt={"عینک کامپیوتر"} />
        <CategoriesItem label={"عینک آفتابی"} src={"/images/sunglasses.png"} alt={"عینک آفتابی"} />
    </div>
  )
}

export default CategoriesList