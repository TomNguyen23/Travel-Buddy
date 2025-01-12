import { useExitJourneyMutation } from "@/api/featureApi/teamJourneyApiSlice";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
  
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ExitJourneyItem = () => {
    const { toast } = useToast();
    const planID = useSelector((state) => state.teamJourney.journeyID);
    const navigateTo = useNavigate();

    const [ExitJourney] = useExitJourneyMutation();

    const handleExitJourney = async () => {
        await ExitJourney(planID)
            .unwrap()
            .then(() => {
                navigateTo('/my-journeys');
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
        <Dialog>
            <DialogTrigger>
                <span className="material-icons-outlined cursor-pointer text-red-600">group_remove</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Bạn chắc chắn muốn rời hành trình này?</DialogTitle>
                    <DialogDescription>
                        Bạn sẽ không thể tham gia lại hành trình này sau khi rời khỏi nhóm.
                    </DialogDescription>
                </DialogHeader>

                <Button onClick={handleExitJourney} className='w-3/12'>Đồng ý</Button>
            </DialogContent>
        </Dialog>

     );
}
 
export default ExitJourneyItem;