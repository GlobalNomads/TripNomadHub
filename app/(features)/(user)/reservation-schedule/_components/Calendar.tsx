import { MyActivitiesDashData } from "@/types/myActivities.type";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import CurrentReservationsModal from "./CurrentReservationsModal";
import { activityData } from "./mock";

interface FullCalendarData {
  title?: string;
  start?: string;
}

function Calendar({ activityId }: { activityId: number }) {
  // const [year, setYear] = useState("");
  // const [month, setMonth] = useState("");
  const [date, setDate] = useState("");

  // const { data: eventDate } = useQuery({
  //   queryKey: ["getMyActivitiesIdDash"],
  //   queryFn: () => getMyActivitiesIdDash(activityId, { year, month }),
  //   staleTime: 60000,
  //   retry: 2,
  // });

  // 키 변환 로직을 정의합니다.
  const keyMapping: { [key: string]: string } = {
    completed: "완료",
    confirmed: "승인",
    pending: "예약",
  };

  const EventList = activityData?.flatMap((event: MyActivitiesDashData) => {
    // 객체를 배열로 변환하고 키를 새로운 이름으로 변경한 후 객체 형태로 변환합니다.
    return Object.entries(event.reservations).map(([key, value]) => ({
      title: `${keyMapping[key as keyof typeof keyMapping] || key} ${value}`,
      date: event.date,
    }));
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleEventClick = (info: DateClickArg) => {
    setDate(info.dateStr);
    formatDateString(date);
    setIsOpen(true);
  };

  // 들어온 날짜 형태 변환
  const formatDateString = (dateString: string) => {
    const [year, month, day] = dateString.split("-");

    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  return (
    <>
      <div className="mt-[30px] grid">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          titleFormat={function (date) {
            // setYear(String(date.date.year));
            // setMonth("0" + (date.date.month + 1));
            return date.date.year + "년 " + (date.date.month + 1) + "월";
          }}
          headerToolbar={{
            start: "prev",
            center: "title",
            end: "next",
          }}
          dateClick={handleEventClick}
          events={EventList}
          dayMaxEvents={true}
          height={"800px"}
          editable={true}
        />
      </div>

      <CurrentReservationsModal isOpen={isOpen} onClose={() => setIsOpen(false)} selectDate={date} />
    </>
  );
}

export default Calendar;
