import { useState, useEffect } from "react";
import { isAfter, isBefore } from "date-fns";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useAddSiteToPlanMutation, useGetAllPlansQuery } from "@/api/featureApi/teamJourneyApiSlice";

const AddSiteOutsidePlan = () => {
    const { toast } = useToast();
    const location = useLocation();

    const [selectedPlan, setSelectedPlan] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const siteID = useSelector((state) => state.siteDetail.siteID);

    const {data: allPLans, refetch} = useGetAllPlansQuery();
    useEffect(() => {
            if (location.pathname === '/details/hotel') {
                refetch();
            }
        }, [location, refetch]);

    const handlePlanChange = (event) => {
        const selectedPlanId = event.target.value;
        const plan = allPLans?.find(plan => plan.id.toString() === selectedPlanId);
        setSelectedPlan(plan);
    };

    const [addSiteToPlan] = useAddSiteToPlanMutation();
    const handleSubmit = async (e) => {
            e.preventDefault()
    
            if (isBefore(new Date(endTime), new Date(startTime))) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: "Ngày kết thúc không thể trước ngày bắt đầu",
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
                return;
            }
    
            if (!selectedPlan || !startTime || !endTime) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: "Vui lòng điền đầy đủ thông tin",
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
                return;
            }
    
            if (isBefore(new Date(startTime), new Date(selectedPlan.startTime)) || isAfter(new Date(startTime), new Date(selectedPlan.endTime))) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: "Thời gian bắt đầu không hợp lệ",
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
                return;
            }
    
            const formData = {
                planId: selectedPlan.id,
                siteId: siteID,
                startTime: startTime,
                endTime: endTime,
                name: '',
                description: '',
            }
    
            await addSiteToPlan(formData)
                .unwrap()
                .then(() => {
                    setStartTime('');
                    setEndTime('');
                    toast({
                        title: "Thêm địa điểm thành công",
                        description: "Địa điểm đã được thêm vào kế hoạch",
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
        <Sheet>
            <SheetTrigger asChild>
            <div className="px-3 py-2 rounded-full cursor-pointer border-2">
                <FontAwesomeIcon icon={faHeart} size="md" />
            </div>
               
            </SheetTrigger>
            <SheetContent >
                <SheetHeader>
                    <SheetTitle>Thêm địa điểm mới</SheetTitle>
                    <SheetDescription>
                        Thêm địa điểm mới vào kế hoạch của bạn
                    </SheetDescription>
                </SheetHeader>
                <form className="py-4 space-y-2" onSubmit={handleSubmit}>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Kế hoạch muốn thêm vào</span>
                        </div>
                        <select className="select select-bordered" onChange={handlePlanChange}>
                            <option disabled selected>Kế hoạch...</option>
                            {allPLans?.map((plan) => (
                                <option key={plan.id} value={plan.id.toString()}>{plan.name}</option>
                            ))}
                        </select>
                    </label>

                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Thời gian bắt đầu</span>
                        </div>
                        <input
                            type="datetime-local"
                            id="datetime"
                            className="border px-2 py-3 rounded-sm dark:bg-[#1D232A]"
                            min={selectedPlan?.startTime}
                            autoFocus
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Thời gian kết thúc</span>
                        </div>
                        <input
                            type="datetime-local"
                            id="datetime"
                            className="border px-2 py-3 rounded-sm dark:bg-[#1D232A]"
                            value={endTime}
                            min={selectedPlan?.startTime}
                            max={selectedPlan?.endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </label>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="mt-4 bg-main hover:bg-main-hover">Thêm</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>

            </SheetContent>
        </Sheet>
     );
}
 
export default AddSiteOutsidePlan;