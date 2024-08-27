import { ChangeEvent, useState } from "react";
import Image from "next/image";
import SearchButton from "@button/SearchButton";
import searchicon from "@icon/ic_search.svg";

interface SearchProps {
  onSearch: (searchValue: string) => void;
}

const SearchBar = ({ onSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue); // 입력 값을 부모 컴포넌트로 전달
  };

  return (
    <div className="relative z-10 -mt-24 flex items-center justify-center">
      <div className="h-[129px] w-full rounded-2xl bg-white px-6 py-4 shadow-xl md:h-[166px] md:w-[696px] md:px-6 md:py-9 lg:h-[178px] lg:w-[1200px]">
        <h1 className="text-primary-black text-base font-bold leading-6 md:text-lg md:leading-8">
          무엇을 체험하고 싶으신가요?
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 flex h-14 gap-3 md:mt-5">
          <div className="relative flex-grow">
            <div className="absolute left-2 top-2">
              <Image src={searchicon} alt="Search" width={40} height={40} />
            </div>
            <input
              id="activity-search"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="내가 원하는 체험은"
              className="text-primary-black focus:border-primary-black h-full w-full rounded border border-gray-700 pl-12 pr-3 text-sm outline-none focus:border-2 md:text-base"
            />
          </div>
          <SearchButton
            className="hover:shadow-primary-green-400 h-full bg-primary-green-300 transition-all duration-200 hover:bg-primary-green-200 hover:shadow-lg active:bg-gradient-to-r active:from-primary-green-200 active:to-primary-green-300"
            onClick={handleSubmit}
          >
            검색하기
          </SearchButton>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
