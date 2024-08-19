import EmptyPage from "@/components/EmptyPage/EmptyPage";
import { MyActivitiesDashData } from "@/types/myActivities.type";
import getMyActivitiesIdDash from "@api/MyActivities/getMyActivitiesIdDash";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface FullCalendarData {
  title?: string;
  start?: string;
}

function Calendar({ activityId }: { activityId: number }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const { data: eventDate } = useQuery({
    queryKey: ["getMyActivitiesIdDash"],
    queryFn: () => getMyActivitiesIdDash(activityId, { year, month }),
    staleTime: 60000,
    retry: 2,
  });

  const EventList = eventDate?.map((event: MyActivitiesDashData) => {
    // 라이브러리에 필요한 형태로 API 리턴 값 재구성
    const CalendarList = [];
    const CalendarData: FullCalendarData = {};

    if (event.reservations.completed) {
      CalendarData["title"] = String(event.reservations.completed);
      CalendarData["start"] = String(event.date);
    }

    CalendarList[0] = CalendarData;

    if (event.reservations.confirmed) {
      CalendarData["title"] = String(event.reservations.confirmed);
      CalendarData["start"] = String(event.date);
    }

    CalendarList[1] = CalendarData;

    if (event.reservations.completed) {
      CalendarData["title"] = String(event.reservations.pending);
      CalendarData["start"] = String(event.date);
    }

    CalendarList[2] = CalendarData;

    return CalendarList;
  });

  return (
    <div className="mt-[30px] grid">
      {eventDate ? (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          titleFormat={function (date) {
            setYear(String(date.date.year));
            setMonth(String(date.date.month));
            return date.date.year + "년 " + (date.date.month + 1) + "월";
          }}
          headerToolbar={{
            start: "prev",
            center: "title",
            end: "next",
          }}
          events={EventList}
          dayMaxEvents={true}
          height={"800px"}
          editable={true}
        />
      ) : (
        <EmptyPage />
      )}
    </div>
  );
}

export default Calendar;
