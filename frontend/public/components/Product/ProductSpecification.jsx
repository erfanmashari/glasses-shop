import React from 'react'

const ProductSpecification = ({ label, value }) => {
  return (
    <li className='w-full flex flex-row justify-center items-center'>
        <span className='w-3/12' style={{ color: "#767790" }}>{label}</span>
        <span className='w-9/12' style={{ color: "#23254e" }}>{value}</span>
    </li>
  )
}

export default ProductSpecification