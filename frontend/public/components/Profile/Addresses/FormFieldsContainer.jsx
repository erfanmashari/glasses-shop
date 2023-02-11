import React from 'react'

const FormFieldsContainer = ({ children }) => {
  return (
    <div className='w-full flex flex-row justify-center items-center gap-4'>
        {children}
    </div>
  )
}

export default FormFieldsContainer