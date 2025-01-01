import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import RadioCategoryItem from "./radio-category-item";

import { useGetUserReportReasonsQuery, usePostReportUserMutation } from '@/api/featureApi/reportApiSlice';

const ReportUserItem = ({ userID }) => {
    const { toast } = useToast();
    const navigateTo = useNavigate();
    const {data: UserReportReasons} = useGetUserReportReasonsQuery();

    const [selectedReason, setSelectedReason] = useState(null);
    const [details, setDetails] = useState("");

    const handleSelectionChange = (reason, details) => {
        setSelectedReason(reason);
        setDetails(details);
    };

    const [postReportUser] = usePostReportUserMutation();
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            userId: userID,
            categoryId: selectedReason,
            description: details,
        }

        await postReportUser(data)
            .unwrap()
            .then(() => {
                toast({
                    title: "Báo cáo người dùng này thành công",
                    description: "Báo cáo của bạn đã được gửi cho admin xem xét",
                });
                navigateTo('/details/hotel');
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: error.data.message,
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
            })
           
    };

    return ( 
        <Dialog>
            <DialogTrigger>
                <span>Báo cáo người dùng này</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Báo cáo người dùng này</DialogTitle>
                    <DialogDescription>
                        Bạn có chắc chắn muốn báo cáo người dùng này?
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <RadioCategoryItem 
                        options={UserReportReasons || []}
                        onSelectionChange={handleSelectionChange}
                    />
                    <DialogFooter>
                        <Button>Báo cáo</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
     );
}

ReportUserItem.propTypes = {
    userID: PropTypes.number.isRequired,
}
 
export default ReportUserItem;