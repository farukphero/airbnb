import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}
const ListingDetailsPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser =await getCurrentUser();
  if (!listing) {
    return <EmptyState></EmptyState>;
  }
  return (
    <ListingClient listing={listing} currentUser={currentUser}>
 
    </ListingClient>
  );
};

export default ListingDetailsPage;
