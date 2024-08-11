import SearchButton from "@/components/Button/SearchButton";
import searchicon from "@icon/ic_search.svg";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="relative -mt-20 flex items-center justify-center">
      <div className="h-[129px] w-full rounded-2xl bg-white px-6 py-4 shadow-xl md:h-[166px] md:w-[696px] md:px-6 md:py-9 lg:h-[178px] lg:w-[1200px]">
        <h1 className="text-primary-black text-base font-bold leading-6 md:text-lg md:leading-8">
          무엇을 체험하고 싶으신가요?
        </h1>
        <div className="mt-4 flex h-14 gap-3 md:mt-5">
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
              placeholder="내가 원하는 체험은"
              className="text-primary-black focus:border-primary-black h-full w-full rounded border border-gray-700 pl-12 pr-3 text-sm outline-none focus:border-2 md:text-base"
            />
          </div>
          <SearchButton className="h-full">검색하기</SearchButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
