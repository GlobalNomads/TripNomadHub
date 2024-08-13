"use client";

import getMyActivities from "@/api/MyActivities/getMyActivities";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

function SelectBox() {
  const { data: ActivitiesData } = useQuery({
    queryKey: ["getMyActivities"],
    queryFn: () => getMyActivities(),

    enabled: typeof window !== "undefined",
  });

  return (
    <>
      <Select />
    </>
  );
}

export default SelectBox;
