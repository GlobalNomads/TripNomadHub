import NoDataImage from "@image/empty.svg";
import Image from "next/image";

export default function NoAlarmMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-[40px]">
      <div className="relative flex h-[200px] w-[200px] flex-col">
        <Image fill src={NoDataImage} alt="데이터 없음" />
      </div>
      <h3 className="flex">헉! 알림이 없어요</h3>
    </div>
  );
}
