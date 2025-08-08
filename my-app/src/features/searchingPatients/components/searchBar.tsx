import React, { useEffect, useState } from "react";

type SearchType = "name" | "nationalId";

type Props = {
  callback: (data: { type: SearchType; text: string }) => void;
};

const SearchBar: React.FC<Props> = ({ callback }) => {
  const [type, setType] = useState<SearchType>("name");
  const [text, setText] = useState("");

  const handleSearch = () => {
    if (text.trim()) {
      callback({ type, text });
    }
  };
  useEffect(() => {
    if (text.trim() && text.length > 2) callback({ type, text });
  }, [text, type]);

  return (
    <div className="flex items-center justify-center gap-4 p-4 border-b  border-gray-500 text-right ">
      <label className="font-bold whitespace-nowrap">نوع جستجو:</label>
      <div className="pl-2  border border-gray-400 rounded-md bg-white">
        <select
          className="p-2 rounded-md outline-none"
          value={type}
          onChange={(e) => setType(e.target.value as SearchType)}
        >
          <option value="name">نام</option>
          <option value="nationalId">کد ملی</option>
        </select>
      </div>

      <input
        type="text"
        className="p-2 border border-gray-400 rounded-md outline-none bg-white"
        placeholder={`جستجو بر اساس ${type === "name" ? "نام" : "کد ملی"}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSubmit={() => handleSearch}
      />

      <button
        className="p-2 pl-10 pr-10 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleSearch}
      >
        جستجو
      </button>
    </div>
  );
};

export default SearchBar;
