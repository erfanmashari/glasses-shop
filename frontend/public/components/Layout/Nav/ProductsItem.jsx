import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const ProductsItem = ({ name }) => {
  return (
    <li>
        <button className="font-bold">{name}<KeyboardArrowDownOutlinedIcon /></button>
    </li>
  )
}

export default ProductsItem