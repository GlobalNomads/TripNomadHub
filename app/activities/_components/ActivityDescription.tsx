import { FC } from "react";

interface ActivityDescriptionProps {
  description: string;
}

const ActivityDescription: FC<ActivityDescriptionProps> = ({ description }) => {
  return (
    <div className="with-full px-6 py-4 text-primary-black-100">
      <div className="pb-4 text-[20px] font-bold">체험설명</div>
      <div className="text-lg-semibold">{description}</div>
    </div>
  );
};

export default ActivityDescription;
