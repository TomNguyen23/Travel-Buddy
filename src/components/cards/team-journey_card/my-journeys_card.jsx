import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import PropTypes from 'prop-types';
import { format, isBefore } from "date-fns";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getJourneyID } from "@/redux/reducer/team-journey.reducer";

const MyJourneysCard = (props) => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();


    const handleGetTravelPlanDetail = (id) => {
        dispatch(getJourneyID(id));
        navigateTo('/team-journey-schedule');
    }

    const isJourneyDone = isBefore(new Date(props?.journey?.endTime), new Date());

    return ( 
        <Card className="w-72 h-48 bg-[url('@/assets/images/layered-waves-haikei.png')] bg-cover  dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-900">
            <CardHeader className='h-36 flex flex-col justify-between'>
                <CardTitle className='cursor-pointer hover:underline' onClick={() => handleGetTravelPlanDetail(props?.journey?.id)}>
                    {props?.journey?.name}
                    {isJourneyDone && <div className="badge badge-warning ml-1 text-white font-light">Đã kết thúc</div>}
                </CardTitle>
                <CardDescription>
                    <div className="flex items-center">
                        <span className="material-icons text-lg">calendar_month</span>
                        <p className="text-md mx-2">{format(props?.journey?.startTime, "dd/MM/yyyy HH:mm")}</p>
                        <span className="material-icons text-lg">arrow_forward</span>
                        <p className="text-md mx-2">{format(props?.journey?.endTime, "dd/MM/yyyy HH:mm")}</p>
                    </div>

                    {/* <div className="flex items-center">
                        <span className="material-icons text-lg">group</span>
                        <p className="text-md mx-2">4 thành viên</p>
                        
                    </div> */}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger className="ml-5">
                        <span className="material-icons text-2xl">more_horiz</span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleGetTravelPlanDetail(props?.journey?.id)}>Chi tiết</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
     );
}
MyJourneysCard.propTypes = {
    journey: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
    }).isRequired,
};

export default MyJourneysCard;