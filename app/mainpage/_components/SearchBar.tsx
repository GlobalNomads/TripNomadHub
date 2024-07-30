import Image from "next/image";
import searchicon from "../../assets/icon/ic_search.svg";
import SearchButton from "@/components/Button/SearchButton";

const SearchBar = () => {
  return (
    <div className="relative flex justify-center items-center -mt-20">
      <div className="rounded-2xl bg-white shadow-xl px-6 py-4 md:px-6 md:py-9 w-full md:w-[696px] lg:w-[1200px] h-[129px] md:h-[166px] lg:h-[178px]">
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
              <Image src={searchicon} alt="Search" width={24} height={24} />
            </div>
            <input
              id="activity-search"
              type="text"
              placeholder="내가 원하는 체험은"
              className="text-primary-black h-full w-full rounded border border-gray-700 pl-12 pr-3 text-sm outline-none focus:border-2 focus:border-primary-black md:text-base"
            />
          </div>
          <SearchButton className="h-full">검색하기</SearchButton>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
