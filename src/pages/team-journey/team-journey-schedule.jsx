import { useGetTravelPlanDetailQuery } from "@/api/featureApi/teamJourneyApiSlice";
import AddDestinationItem from "@/components/items/team-journey_items/add-destination-item";
import JourneyDestinationItem from "@/components/items/team-journey_items/journey-destination-item";
import { getTravelPlanDetail } from "@/redux/reducer/team-journey.reducer";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const TeamJourneySchedule = () => {
    const dispatch = useDispatch();
    const planID = useSelector((state) => state.teamJourney.journeyID);
    const {data} = useGetTravelPlanDetailQuery(planID);
    const siteCount = data?.sites.length;

    const members = useSelector((state) => state.teamJourney.travelPlanDetail.members);
    const myID = useSelector((state) => state.auth.login.user.id);
    const myMember = members?.find(member => member.userId === myID);
    const myRole = myMember ? myMember.role : null;

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
            <div className="flex justify-between items-center">
                <span>Có {siteCount} địa điểm trong kế hoạch</span>
                {myRole !== 'MEMBER' && <AddDestinationItem />}
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