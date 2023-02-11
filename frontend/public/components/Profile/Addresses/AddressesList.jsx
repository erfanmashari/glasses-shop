import AddressesItem from "./AddressesItem"

const AddressesList = () => {
  return (
    <>
        <h3 className='w-full text-xl font-bold text-stone-800'>آدرس ها</h3>
        <table className='w-full'>
            <thead>
                <tr className='w-full text-stone-800 border-b-2 border-gray-200'>
                    <th className='w-1/12 py-4'>ردیف</th>
                    <th className='w-9/12 py-4'>نشانی پستی</th>
                    <th className='w-1/12 py-4'>ویرایش</th>
                    <th className='w-1/12 py-4'>حذف</th>
                </tr>
            </thead>
            <tbody>
                <AddressesItem />
            </tbody>
        </table>
    </>
  )
}

export default AddressesList