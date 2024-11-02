import AddDestinationItem from "@/components/items/add-destination-item";
import JourneyDestinationItem from "@/components/items/journey-destination-item";

const TeamJourneySchedule = () => {
    const data = [{
        "id": 1,
        "state": "Texas",
        "city": "El Paso"
      }, {
        "id": 2,
        "state": "Nevada",
        "city": "Las Vegas"
      }, {
        "id": 3,
        "state": "Connecticut",
        "city": "Waterbury"
      }, {
        "id": 4,
        "state": "Pennsylvania",
        "city": "Levittown"
      }, {
        "id": 5,
        "state": "Oklahoma",
        "city": "Tulsa"
      }
    ]

    return ( 
        <div>
            <div className="flex justify-between items-center">
                <span>Có 4 địa điểm trong kế hoạch</span>
                <AddDestinationItem />
            </div>
            <div className="mt-3">
                {data.map((item) => (
                    <JourneyDestinationItem key={item.id} data={item} />
                ))}
            </div>
        </div>
     );
}
 
export default TeamJourneySchedule;