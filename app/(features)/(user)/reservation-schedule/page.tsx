"use client";
import React from "react";
import TitleForm from "./_components/TitleForm";
import PriceForm from "./_components/PriceForm";
import AddressForm from "./_components/AddressForm";
import ScheduleForm from "./_components/ScheduleForm";
import ImageUploadForm from "./_components/ImageUploadForm";

const Page: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 폼 제출 로직
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-full space-y-6 px-4 md:px-6 lg:px-8">
      <TitleForm />
      <PriceForm />
      <AddressForm />
      <ScheduleForm />
      <ImageUploadForm />
    </form>
  );
};

export default Page;
