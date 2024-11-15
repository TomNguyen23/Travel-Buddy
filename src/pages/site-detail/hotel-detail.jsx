import ReviewsFromUsersCard from "@/components/cards/review/reviews-from-users_card";
import AmenityIntoCard from "@/components/cards/site-detail_cards/amenity-intro-card";
import NearbySitesCard from "@/components/cards/site-detail_cards/nearby-sites-card";

const HotelDetail = () => { 
    return ( 
        <div>
            <AmenityIntoCard />
            <NearbySitesCard />
            <ReviewsFromUsersCard />
        </div>
     );
}
 
export default HotelDetail;