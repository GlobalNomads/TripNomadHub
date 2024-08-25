import getActivitiesId from "@/api/Activities/getActivitiesId";
import EditForm from "./_components/EditForm";

async function ActivityEdit({ params }: { params: { activityId: string } }) {
  //선택한 Activity 데이터 세팅..
  const activityId = Number(params.activityId);
  const activity = await getActivitiesId(activityId);

  return (
    <div>
      <EditForm activityData={activity} activityId={activityId} />
    </div>
  );
}

export default ActivityEdit;
