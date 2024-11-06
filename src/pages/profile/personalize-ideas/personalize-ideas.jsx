import { useState } from "react";

import PersionlizeCard from "@/components/cards/personalize_card";
import { Button } from "@/components/ui/button";

const PersonalizeIdeas = () => {
    const [checkedValues, setCheckedValues] = useState([]);

    const handleCheckboxChange = (destination, isChecked) => {
        setCheckedValues(prevValues => {
            if (isChecked) {
                return [...prevValues, destination];
            } else {
                return prevValues.filter(value => value !== destination);
            }
        });
    };

    const handleConfirm = () => {
        console.log(checkedValues);
    };

    const data = [{
        "trip_id": 1,
        "destination": "Sukpak"
      }, {
        "trip_id": 2,
        "destination": "Juli"
      }, {
        "trip_id": 3,
        "destination": "Tuatuka"
      }, {
        "trip_id": 4,
        "destination": "Pasonobenu"
      }, {
        "trip_id": 5,
        "destination": "Taoyuan"
      }, {
        "trip_id": 6,
        "destination": "Evijärvi"
      }, {
        "trip_id": 7,
        "destination": "Daejeon"
      }, {
        "trip_id": 8,
        "destination": "Māmūnīyeh"
      }, {
        "trip_id": 9,
        "destination": "Bungoma"
      }, {
        "trip_id": 10,
        "destination": "Wenquan"
      }, {
        "trip_id": 11,
        "destination": "Tarbes"
      }, {
        "trip_id": 12,
        "destination": "Santa Rita"
      }, {
        "trip_id": 13,
        "destination": "Changzheng"
      }, {
        "trip_id": 14,
        "destination": "Itaituba"
      }, {
        "trip_id": 15,
        "destination": "Ulsan"
      }];

    return (  
        <div className="px-72 flex flex-col items-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold p-2">Chọn ít nhất 5 địa điểm khiến bạn cảm thấy mới mẻ và thú vị</h1>
                <p>Điều này giúp chúng tôi mang đến cho bạn trải nghiệm tuyệt vời hơn!</p>
            </div>

            <div className="mt-7 pt-1 flex max-h-[31rem] justify-between flex-wrap overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {data.map(item => (
                    <PersionlizeCard key={item.trip_id} id={item.trip_id} destination={item.destination} onCheckboxChange={handleCheckboxChange} />
                ))}
            </div>

            <Button className="mt-3 w-1/5 bg-main hover:bg-main-hover" onClick={handleConfirm}>Xác nhận</Button>
        </div>
    );
}
 
export default PersonalizeIdeas;