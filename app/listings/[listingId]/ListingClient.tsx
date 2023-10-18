"use client";
import ListingHead from "@/app/components/Listings/ListingHead";
import ListingInfo from "@/app/components/Listings/ListingInfo";
import ListingReservation from "@/app/components/Listings/ListingReservation";
import Container from "@/app/components/Shared/Container/Container";
import { categories } from "@/app/components/Shared/NavBar/Categories";
import useLogInModal from "@/app/hooks/useLoginModal";
import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

 const initialDateRange ={
  startDate: new Date(),
  endDate : new Date(),
  key:"selection"
 }

// interface ListingClientProps {
//   reservation?: Reservation[];
//   listing?: Listing  & {
//     user?: User | null;
//   };
//   currentUser?: User | null;
// }
const ListingClient = ({ listing, currentUser }: any, reservation:Reservation[]) => {
  const logInModal= useLogInModal()
 const router= useRouter()
 const disabledDates = useMemo(()=>{
  let dates:Date[]= []
  if(Array.isArray(reservation)){
    
    reservation.forEach((reservation)=>{
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation. endDate)
      })
  
      dates= [...dates, ...range];
    })
  }

  return dates
 },[reservation])

 const [isLoading, setIsLoading] = useState(false)
 const [totalPrice, setTotalPrice] = useState(listing.price)
 const [dateRange, setDateRange] = useState(initialDateRange)

 const onCreateReservation= useCallback(()=>{
  if(!currentUser){
    return logInModal.onOpen()
  }

  setIsLoading(true)

  axios.post("api/reservations",{
    totalPrice, startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    listingId: listing.id
  })
  .then(()=>{
    toast.success("Listing reserved!")
    setDateRange(initialDateRange)
    router.refresh()
  })
  .catch((error)=>{
 toast.error(error)
  })
.finally(()=>{
  setIsLoading(false)
})
 },[currentUser, dateRange.endDate, dateRange.startDate, listing.id, logInModal, router, totalPrice])


 useEffect(()=>{
  if(dateRange.startDate && dateRange.endDate){
    const dayCount = differenceInCalendarDays(
      dateRange.startDate,
      dateRange.endDate
    )
    if(dayCount && listing.price){
      setTotalPrice(dayCount* listing.price)
    }else{
      setTotalPrice(listing.price)
    }
  }
 },[dateRange.endDate, dateRange.startDate, listing.price])

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          ></ListingHead>
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathRoomCount}
            locationValue={listing.locationValue}
            ></ListingInfo>
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation 
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value:any)=>setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
              ></ListingReservation>

            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
