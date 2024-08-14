import { ChangeEvent, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SearchButton from "@button/SearchButton";
import searchicon from "@icon/ic_search.svg";

interface SearchProps {
  onSearch: (searchValue: string) => void;
}

const SearchBar = ({ onSearch }: SearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => onSearch(value), 300),
    [],
  );

  useEffect(() => {
    setDebouncedValue(inputValue);
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(debouncedValue);
  };

  return (
    <div className="relative -mt-20 flex items-center justify-center">
      <div className="h-[129px] w-full rounded-2xl bg-white px-6 py-4 shadow-xl md:h-[166px] md:w-[696px] md:px-6 md:py-9 lg:h-[178px] lg:w-[1200px]">
        <h1 className="text-primary-black text-base font-bold leading-6 md:text-lg md:leading-8">
          무엇을 체험하고 싶으신가요?
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 flex h-14 gap-3 md:mt-5">
          <div className="relative flex-grow">
            <label
              htmlFor="activity-search"
              className="absolute -top-3.5 right-5 bg-white leading-6 text-gray-800 md:left-8 md:right-auto md:px-2.5 xl:left-10"
            >
              내가 원하는 체험은
            </label>
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
          <SearchButton className="h-full" onClick={handleSubmit}>
            검색하기
          </SearchButton>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
