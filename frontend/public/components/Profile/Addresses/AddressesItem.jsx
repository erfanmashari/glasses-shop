import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AddressesItem = () => {
  return (
    <tr className="text-center text-slate-500 border-b-2 border-gray-200">
      <td className="py-4">1</td>
      <td className="text-stone-800 py-4">نشانی پستی تستی</td>
      <td className="py-4 cursor-pointer">
        <EditIcon className="w-5 h-5 block mx-auto" />
      </td>
      <td className="py-4 cursor-pointer">
        <DeleteIcon className="w-5 h-5 block mx-auto text-red-600" />
      </td>
    </tr>
  );
};

export default AddressesItem;
