"use client";
import React from "react";
import EditTitle from "../_components/EditTitle";
import PriceForm from "../_components/PriceForm";
import AddressForm from "../_components/AddressForm";
import ScheduleForm from "../_components/ScheduleForm";
import ImageUploadForm from "../_components/ImageUploadForm";

function EditMyActivities() {
  return (
    <div>
      <EditTitle />
      <PriceForm />
      <AddressForm />
      <ScheduleForm />
      <ImageUploadForm />
    </div>
  );
}

export default EditMyActivities;
