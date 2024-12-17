import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import NewSiteFeeItem from "@/components/items/new-site_items/new-site-fee-item";
import { Button } from "@/components/ui/button";

import ChooseSiteServiceCard from "./choose-site-services-card";
import { getNewSitebasicInfo } from "@/redux/reducer/new-site.reducer";
  

const NewBusinessSiteInfoCard = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [fees, setFees] = useState([]);
    const [serviceIDs, setServiceIDs] = useState([]);

    const handleServicesChange = (serviceID, isChecked) => {
        const id = Number(serviceID); // Ensure serviceID is a number
        setServiceIDs(prevValues => {
            if (isChecked) {
                return [...prevValues, id];
            } else {
                return prevValues.filter(value => value !== id);
            }
        });
    };

    const handleSubmit = () => {
        console.log(fees);
        console.log(serviceIDs);

        const data = {
            fees: fees,
            services: serviceIDs
        };

        dispatch(getNewSitebasicInfo(data));
        navigateTo('/new-site/site-media');

    }
    return ( 
        <Card>
            <CardHeader>
                <CardTitle>Thông tin doanh nghiệp</CardTitle>
                <CardDescription>
                    <p>Nếu bạn là doanh nghiệp, hãy cung cấp thông tin cơ bản về doanh nghiệp của mình;
                         nếu không phải, bạn có thể bỏ qua trang này</p>
                </CardDescription>
            </CardHeader>
            <CardContent className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-3">
                <div className="label">
                    <span className="label-text font-medium">Các loại chi phí</span>
                </div>
                <NewSiteFeeItem getFees={(fees) => setFees(fees)} />
            </div>

            <div className="flex flex-col space-y-3">
                <ChooseSiteServiceCard onServicesChange={handleServicesChange} />
            </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSubmit} className='bg-main hover:bg-main-hover'>Tiếp theo</Button>
            </CardFooter>
        </Card>

     );
}
 
export default NewBusinessSiteInfoCard;