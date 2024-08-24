import getMyActivitiesIdDash from "@/api/MyActivities/getMyActivitiesIdDash";
import getMyActivitiesIdSch from "@/api/MyActivities/getMyActivitiesIdSch";
import { MyActivitiesDashData, MyActivitiesSchData } from "@/types/myActivities.type";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import CurrentReservationsModal from "./CurrentReservationsModal";

// 숫자를 두 자리 문자열로 포맷팅하는 함수
const formatToTwoDigits = (num: number) => num.toString().padStart(2, "0");

function Calendar({ activityId }: { activityId: number }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState<MyActivitiesSchData[]>([]);

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear().toString();
    const currentMonth = formatToTwoDigits(now.getMonth() + 1);

    setYear(currentYear);
    setMonth(currentMonth);
  }, []);

  // 데이터 가져오기 쿼리
  const { data: eventData, refetch } = useQuery({
    queryKey: ["getMyActivitiesIdDash"],
    queryFn: () => getMyActivitiesIdDash(activityId, { year: year, month: month }),
    staleTime: 60000,
    retry: 2,
    enabled: !!year && !!month,
  });

  useEffect(() => {
    if (year && month) {
      // 상태가 변경된 경우에 refetch 호출
      refetch();
    }
  }, [year, month, refetch]);

  // 키 변환 로직을 정의합니다.
  const keyMapping: { [key: string]: string } = {
    completed: "완료",
    confirmed: "승인",
    pending: "예약",
  };

  const EventList = eventData?.flatMap((event: MyActivitiesDashData) => {
    // 객체를 배열로 변환하고 키를 새로운 이름으로 변경한 후 객체 형태로 변환합니다.
    return Object.entries(event.reservations).map(([key, value]) => ({
      title: `${keyMapping[key as keyof typeof keyMapping] || key} ${value}`,
      date: event.date,
    }));
  });

  const handleEventClick = async (info: DateClickArg) => {
    try {
      // getMyActivitiesIdSch API 호출
      const response = await getMyActivitiesIdSch(activityId, { date: info.dateStr });
      setIsOpen(true);
      if (response.length === 0) {
        alert("예약이 없습니다");
      } else {
        setScheduleData(response);
        setDate(info.dateStr);
        setIsOpen(true); // 예약이 있는 경우에만 모달을 엽니다.
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      // 오류 발생 시 모달을 열지 않습니다.
    }
  };

  // 날짜 범위가 변경될 때 호출되는 함수
  const handleDatesSet = useCallback(
    (info: { view: { currentStart: Date; currentEnd: Date } }) => {
      const startDate = info.view.currentStart;
      const startYear = startDate.getFullYear().toString();
      const startMonth = formatToTwoDigits(startDate.getMonth() + 1); // 월은 0부터 시작하므로 +1

      // 상태가 변경된 경우에만 setYear 및 setMonth 호출
      if (startYear !== year || startMonth !== month) {
        setYear(startYear);
        setMonth(startMonth);
      }
    },
    [year, month],
  );

  return (
    <>
      <div className="mt-[30px] grid">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          titleFormat={date => `${date.date.year}년 ${formatToTwoDigits(date.date.month + 1)}월`}
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
          datesSet={handleDatesSet}
        />
      </div>

      <CurrentReservationsModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        scheduleData={scheduleData}
        activityId={activityId}
        date={date}
      />
    </>
  );
}

export default Calendar;
