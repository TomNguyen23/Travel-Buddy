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
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import PropTypes from 'prop-types';
import { format } from "date-fns";
import { useRemoveTravelPlanMutation } from "@/api/featureApi/teamJourneyApiSlice";

const MyJourneysCard = (props) => {
    const { toast } = useToast();

    const [removeJourney] = useRemoveTravelPlanMutation();
    const handleDeleteJourney = async (id) => {
        await removeJourney(id)
            .unwrap()
            .then(() => {
                toast({
                    title: "Xóa kế hoạch thành công",
                    description: "Kế hoạch đã được xóa khỏi danh sách",
                })
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: error.data.message,
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
            })


    }

    return ( 
        <Card className="w-72 h-48 bg-[url('@/assets/images/layered-waves-haikei.png')] bg-cover  dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-900">
            <CardHeader className='h-36 flex flex-col justify-between'>
                <CardTitle className='cursor-pointer hover:underline' onClick={() => console.log("Card clicked")}>{props?.journey?.name}</CardTitle>
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
                        <DropdownMenuItem>Chi tiết</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteJourney(props.journey.id)} className="text-red-700">Xóa kế hoạch</DropdownMenuItem>
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