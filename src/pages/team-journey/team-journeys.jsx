import { useGetAllPlansQuery } from "@/api/featureApi/teamJourneyApiSlice";
import MyJourneysCard from "@/components/cards/team-journey_card/my-journeys_card";
import AddNewJourneyItem from "@/components/items/team-journey_items/add-new-journey-item";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TeamJourneys = () => {
    const location = useLocation();
    const { data: journeys, isLoading, error, refetch } = useGetAllPlansQuery({ refetchOnMountOrArgChange: true });

    useEffect(() => {
        if (location.pathname === '/my-journeys') {
            refetch();
        }
    }, [location, refetch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return ( 
        <div>
            <h1 className="text-3xl font-bold">Kế hoạch các chuyến đi của tôi</h1>

            <div className="grid grid-flow-row grid-cols-4 gap-3 mt-5">
                <AddNewJourneyItem />
                {journeys?.map(journey => (
                    <MyJourneysCard key={journey.id} journey={journey} />
                ))}
      
            </div>
        </div>
     );
}
 
export default TeamJourneys;