import React from 'react'

const CommentDetailsItem = ({ label, value }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-md font-bold text-stone-600">{label}</p>
      <p className="text-md font-bold text-stone-400">{value}</p>
    </div>
  )
}

export default CommentDetailsItem