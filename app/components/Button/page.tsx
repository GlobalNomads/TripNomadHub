/*
    Button test page: 사용 예시 보여주기 위해 만든 페이지
    default button에 onclick 넣어놔서, 거기 로직 추가하시면 됩니다!
    TODO: 최종 마무리 하기 전에 삭제하기
*/

"use client";

import React from "react";
import Button from "./Button";

const ButtonTest: React.FC = () => {
  const handleCategoryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Category Button Clicked", event);
  };
  return (
    <div className="space-y-4">
      <div className="space-x-2">
        {/* DefaultButton 예제 */}
        <Button.Default
          type="white"
          className="h-[38px] w-[108px] p-[8px] text-sm md:h-[48px] md:w-[144px] md:p-[12px] md:text-base lg:h-[56px] lg:w-[350px] lg:p-[16px] lg:text-lg"
          onClick={() => alert("White Button Clicked")}
        >
          White
        </Button.Default>
        <Button.Default
          type="nomadBlack"
          className="h-[38px] w-[108px] p-[8px] text-sm md:h-[48px] md:w-[144px] md:p-[12px] md:text-base lg:h-[56px] lg:w-[350px] lg:p-[16px] lg:text-lg"
          onClick={() => alert("NomadBlack Button Clicked")}
        >
          NomadBlack
        </Button.Default>
        <Button.Default
          type="disabled"
          className="h-[38px] w-[108px] p-[8px] text-sm md:h-[48px] md:w-[144px] md:p-[12px] md:text-base lg:h-[56px] lg:w-[350px] lg:p-[16px] lg:text-lg"
          onClick={() => alert("Disabled Button Clicked")}
        >
          Disabled
        </Button.Default>
      </div>
      <div className="space-x-2">
        {/* LoginButton 예제 */}

        <Button.Login type="white" onClick={() => alert("Login Button Clicked")}>
          로그인 하기
        </Button.Login>
        <Button.Login type="nomadBlack" onClick={() => alert("Login Button Clicked")}>
          로그인 하기
        </Button.Login>
        <Button.Login type="disabled" onClick={() => alert("Login Button Clicked")}>
          신청 불가
        </Button.Login>
      </div>
      <div className="space-x-2">
        {/* CategoryButton 예제 */}
        <Button.Category onClick={handleCategoryClick}>문화·예술</Button.Category>
      </div>

      <div>
        {/* FilterButton 예제 */}
        <Button.Filter type="white" onClick={() => alert("Filter Button Clicked")}>
          가격
        </Button.Filter>
      </div>
      <div>
        {/* SearchButton 예제 */}
        <Button.Search type="nomadBlack" onClick={() => alert("Search Button Clicked")}>
          검색하기
        </Button.Search>
      </div>
      <div>
        {/* ModalButton 예제 */}
        <Button.Modal type="white" onClick={() => alert("Modal Button Clicked")}>
          취소
        </Button.Modal>
        <Button.Modal type="nomadBlack" onClick={() => alert("Modal Button Clicked")}>
          확인
        </Button.Modal>
      </div>
    </div>
  );
};

export default ButtonTest;
