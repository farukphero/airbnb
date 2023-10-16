import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/Listings/ListingCard";
import Container from "./components/Shared/Container/Container";

export default async function Home() {
  // const isEmpty = true;
  const listings = await getListings();
  const currentUser = await getCurrentUser()
  if (listings.length === 0) {
    return <EmptyState showReset></EmptyState>;
  }

  return (
    <Container>
      <div className="pt-28 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => {
          return <ListingCard key={listing.id} data={listing} currentUser={currentUser}></ListingCard>;
        })}
      </div>
    </Container>
  );
}
