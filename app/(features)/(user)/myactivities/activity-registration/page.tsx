"use client";
import React from "react";
import TitleForm from "../_components/TitleForm";
import PriceForm from "../_components/PriceForm";
import AddressForm from "../_components/AddressForm";
import ScheduleForm from "../_components/ScheduleForm";
import ImageUploadForm from "../_components/ImageUploadForm";

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
