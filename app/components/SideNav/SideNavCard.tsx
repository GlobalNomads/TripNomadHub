import ButtonWithHover from "@/components/SideNav/ButtonWithHover";
import ProfileImage from "@/components/SideNav/ProfileImage";
import AccountCheck from "@icon/ic_account_check_outline.svg";
import Calender from "@icon/ic_calendar_check_outline.svg";
import Cog from "@icon/ic_cog_outline.svg";
import GrayAccountCheck from "@icon/ic_gray_account_check_outline.svg";
import GrayCalender from "@icon/ic_gray_calender.svg";
import GrayCog from "@icon/ic_gray_cog.svg";
import GrayTextBoxCheck from "@icon/ic_gray_text_box_check_outline.svg";
// import Pencil from "@icon/ic_pencil.svg";
import PencilButton from "@/components/SideNav/PencilButton";
import TextBoxCheck from "@icon/ic_text_box_check_outline.svg";
import React from "react";

function SideNavCard(): React.JSX.Element {
  return (
    <div className="hidden h-[432px] w-[251px] gap-6 rounded-2xl border border-solid border-gray-300 bg-white drop-shadow-sm md:flex md:flex-col xl:h-[432px] xl:w-[384px]">
      <div className="relative mx-auto mt-6 items-center justify-center">
        <ProfileImage />
      </div>
      <PencilButton />
      <div className="mx-auto flex flex-col gap-2 text-primary-gray-450 xl:h-[200px] xl:w-[336px]">
        <ButtonWithHover href={"/myprofile"} defaultIcon={GrayAccountCheck} hoverIcon={AccountCheck}>
          내 정보
        </ButtonWithHover>
        <ButtonWithHover href={"/myreservations"} defaultIcon={GrayTextBoxCheck} hoverIcon={TextBoxCheck}>
          예약 내역
        </ButtonWithHover>
        <ButtonWithHover href={"/myactivities"} defaultIcon={GrayCog} hoverIcon={Cog}>
          내 체험 관리
        </ButtonWithHover>
        <ButtonWithHover href={"/reservation-schedule"} defaultIcon={GrayCalender} hoverIcon={Calender}>
          예약 현황
        </ButtonWithHover>
      </div>
    </div>
  );
}
export default SideNavCard;
