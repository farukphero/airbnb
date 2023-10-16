"use client";

import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../Button/HeartButton";
import Button from "../Button/Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);
  return (
    <div
      className="col-span-1 cursor-pointer"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
    w-full aspect-square relative overflow-hidden rounded-xl
    "
        >
          <Image
            fill
            src={data.imageSrc}
            alt="Listing"
            className="h-full w-full object-cover hover:scale-110 transition ease-in-out duration-700 "
          ></Image>
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {location?.label}, {location?.region}
        </div>
        <div className="font-light text-neutral-600">
          {reservationDate || data.category}
        </div>
        <div className=" flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          ></Button>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
