import AddDestinationItem from "@/components/items/add-destination-item";
import JourneyDestinationItem from "@/components/items/journey-destination-item";

const TeamJourneySchedule = () => {
    return ( 
        <div>
            <div className="flex justify-between items-center">
                <span>Có 4 địa điểm trong kế hoạch</span>
                <AddDestinationItem />
            </div>
            <div className="mt-3">
                <JourneyDestinationItem />
                <JourneyDestinationItem />
            </div>
        </div>
     );
}
 
export default TeamJourneySchedule;