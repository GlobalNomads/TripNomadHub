// 체험 등록 페이지

"use client";
import AddressForm from "../_components/AddressForm";
import ImageUploadForm from "../_components/ImageUploadForm";
import PriceForm from "../_components/PriceForm";
import ScheduleForm from "../_components/ScheduleForm";
import TitleForm from "../_components/TitleForm";

function MyActivities() {
  return (
    <div>
      <TitleForm />
      <PriceForm />
      <AddressForm />
      <ScheduleForm />
      <ImageUploadForm />
    </div>
  );
}

export default MyActivities;
