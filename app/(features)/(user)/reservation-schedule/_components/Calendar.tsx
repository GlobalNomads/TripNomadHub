import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";

function Calendar() {
  return (
    <div className="mt-[30px] grid">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        titleFormat={function (date) {
          return date.date.year + "년 " + (date.date.month + 1) + "월";
        }}
        headerToolbar={{
          start: "prev",
          center: "title",
          end: "next",
        }}
        dayMaxEvents={true}
        height={"800px"}
        editable={true}
      />
    </div>
  );
}

export default Calendar;
