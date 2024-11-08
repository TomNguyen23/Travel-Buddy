import MyJourneysCard from "@/components/cards/team-journey_card/my-journeys_card";
import AddNewJourneyItem from "@/components/items/team-journey_items/add-new-journey-item";

const TeamJourneys = () => {
    return ( 
        <div>
            <h1 className="text-3xl font-bold">Kế hoạch các chuyến đi của tôi</h1>

            <div className="grid grid-flow-row grid-cols-4 gap-3 mt-5">
                <AddNewJourneyItem />
                <MyJourneysCard />
                <MyJourneysCard />
                <MyJourneysCard />
                <MyJourneysCard />
      
            </div>
        </div>
     );
}
 
export default TeamJourneys;