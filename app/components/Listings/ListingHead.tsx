"use client";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../Button/HeartButton";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: User | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <div className="pt-10">
      <Heading
        title={title}
        subTitle={`${location?.label}, ${location?.region}`}
      ></Heading>
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          alt="image"
          fill
          className="w-full object-cover"
        ></Image>
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser}></HeartButton>
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
