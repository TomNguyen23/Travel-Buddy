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

import { useGetReviewReportReasonsQuery, usePostReportReviewMutation } from "@/api/featureApi/reportApiSlice";

const ReportReviewItem = ({ reviewID }) => {
    const { toast } = useToast();
    const navigateTo = useNavigate();
    const {data: ReviewReportReasons} = useGetReviewReportReasonsQuery();
    
    const [selectedReason, setSelectedReason] = useState(null);
    const [details, setDetails] = useState("");

    const handleSelectionChange = (reason, details) => {
        setSelectedReason(reason);
        setDetails(details);
    };

    const [postReportReview] = usePostReportReviewMutation();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            siteReviewId: reviewID,
            categoryId: selectedReason,
            description: details,
        }

        await postReportReview(data)
            .unwrap()
            .then(() => {
                toast({
                    title: "Báo cáo đánh giá này thành công",
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
                <span>Báo cáo đánh giá này</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Báo cáo đánh giá này</DialogTitle>
                    <DialogDescription>
                        Bạn có chắc chắn muốn báo cáo bình luận này?
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <RadioCategoryItem 
                        options={ReviewReportReasons || []}
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

ReportReviewItem.propTypes = {
    reviewID: PropTypes.number.isRequired,
}
 
export default ReportReviewItem;