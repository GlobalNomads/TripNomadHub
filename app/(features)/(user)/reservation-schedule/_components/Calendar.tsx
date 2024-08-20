import { MyActivitiesDashData } from "@/types/myActivities.type";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { activityData } from "./mock";

interface FullCalendarData {
  title?: string;
  start?: string;
}

function Calendar({ activityId }: { activityId: number }) {
  // const [year, setYear] = useState("");
  // const [month, setMonth] = useState("");

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

  return (
    <div className="mt-[30px] grid">
      <FullCalendar
        plugins={[dayGridPlugin]}
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
        events={EventList}
        dayMaxEvents={true}
        height={"800px"}
        editable={true}
      />
    </div>
  );
}

export default Calendar;
