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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RadioCategoryItem from "./radio-category-item";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { useGetSiteReportReasonsQuery, usePostReportSiteMutation } from '@/api/featureApi/reportApiSlice';

const ReportSiteItem = ({ siteID }) => {
    const { toast } = useToast();
    const navigateTo = useNavigate();
    const { data: SiteReportReasons } = useGetSiteReportReasonsQuery();
    
    const [selectedReason, setSelectedReason] = useState(null);
    const [details, setDetails] = useState("");

    const handleSelectionChange = (reason, details) => {
        setSelectedReason(reason);
        setDetails(details);
    };

    const [postReportSite] = usePostReportSiteMutation();
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const data = {
            siteId: siteID,
            categoryId: selectedReason,
            description: details,
        }

        console.log("Data:", data);   
        await postReportSite(data)
            .unwrap()
            .then(() => {
                toast({
                    title: "Báo cáo địa điểm này thành công",
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
                <span className="material-icons-outlined p-2 rounded-full cursor-pointer border-2">flag</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Báo cáo địa điểm này</DialogTitle>
                    <DialogDescription>
                        Bạn có chắc chắn muốn báo cáo địa điểm này?
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <RadioCategoryItem 
                        options={SiteReportReasons || []}
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

ReportSiteItem.propTypes = {
    siteID: PropTypes.number.isRequired,
}
 
export default ReportSiteItem;