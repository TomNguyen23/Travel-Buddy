import { useGetTravelPlanDetailQuery } from "@/api/featureApi/teamJourneyApiSlice";
import AddDestinationItem from "@/components/items/team-journey_items/add-destination-item";
import JourneyDestinationItem from "@/components/items/team-journey_items/journey-destination-item";
import { getTravelPlanDetail } from "@/redux/reducer/team-journey.reducer";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const TeamJourneySchedule = () => {
    // const data = [{
    //     "id": 1,
    //     "state": "Texas",
    //     "city": "El Paso"
    //   }, {
    //     "id": 2,
    //     "state": "Nevada",
    //     "city": "Las Vegas"
    //   }, {
    //     "id": 3,
    //     "state": "Connecticut",
    //     "city": "Waterbury"
    //   }, {
    //     "id": 4,
    //     "state": "Pennsylvania",
    //     "city": "Levittown"
    //   }, {
    //     "id": 5,
    //     "state": "Oklahoma",
    //     "city": "Tulsa"
    //   }
    // ]
    const dispatch = useDispatch();
    const planID = useSelector((state) => state.teamJourney.journeyID);
    const {data} = useGetTravelPlanDetailQuery(planID);
    const siteCount = data?.sites.length;


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [planID]);

    useEffect(() => {
        if (data) {
            dispatch(getTravelPlanDetail(data));
        }
    }, [data, dispatch]);

    return (
        <div>
            {/* <div className="flex justify-between items-center">
                <span>Có 4 địa điểm trong kế hoạch</span>
                <AddDestinationItem />
            </div>
            <div className="mt-3">
                {data.map((item) => (
                    <JourneyDestinationItem key={item.id} data={item} />
                ))}
            </div> */}

            <div className="flex justify-between items-center">
                <span>Có {siteCount} địa điểm trong kế hoạch</span>
                <AddDestinationItem />
            </div>
            <div className="mt-3">
                {data?.sites?.map((item) => (
                    <JourneyDestinationItem key={item?.siteBasicInfoRspnDto?.siteId} data={item} />
                ))}
            </div>
        </div>
     );
}
 
export default TeamJourneySchedule;