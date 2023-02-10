import FavouritesItem from "./FavouritesItem"

const FavouritesList = () => {
  return (
    <div className="w-9/12 flex flex-col justify-center items-center border-2 border-gray-200 rounded-lg gap-4 p-6">
        <h3 className='w-full text-xl font-bold text-stone-800'>موردعلاقه ها</h3>
        <table className='w-full'>
            <thead>
                <tr className='w-full text-stone-800 border-b-2 border-gray-200'>
                    <th className='w-1/12 py-4'>ردیف</th>
                    <th className='w-5/12 py-4'>نام محصول</th>
                    <th className='w-3/12 py-4'>گارانتی</th>
                    <th className='w-2/12 py-4'>قیمت</th>
                    <th className='w-1/12 py-4'>اطلاعات</th>
                </tr>
            </thead>
            <tbody>
                <FavouritesItem />
            </tbody>
        </table>
    </div>
  )
}

export default FavouritesList