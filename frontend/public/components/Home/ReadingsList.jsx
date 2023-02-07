import ReadingsItem from "./ReadingsItem";

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

const ReadingsList = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-3 p-8'>
        <div className='w-full flex flex-row justify-between items-center'>
        <h3 className='text-xl font-bold text-stone-700'>خواندنی ها</h3>
        <button className="text-lg text-gray-400">
            بیشتر
            <KeyboardArrowLeftOutlinedIcon />
          </button>
        </div>
        <ul className='w-full flex flex-row justify-center items-center gap-4' style={{ height: "300px" }}>
            <ReadingsItem />
            <ReadingsItem />
            <ReadingsItem />
        </ul>
    </div>
  )
}

export default ReadingsList