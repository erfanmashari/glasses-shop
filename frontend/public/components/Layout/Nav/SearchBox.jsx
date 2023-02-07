import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBox = () => {
  return (
    <div
      className="w-fit h-full flex flex-row rounded-lg px-3 py-1"
      style={{
        backgroundColor: "#e9e9e9",
        color: "#616161",
        boxShadow: "inset 0 0 5px #e2e2e2",
      }}
    >
      <input
        type="text"
        className="text-sm border-none outline-none bg-inherit py-1 px-2"
        placeholder="جستجوی محصول..."
      />
      <SearchOutlinedIcon />
    </div>
  );
};

export default SearchBox;
