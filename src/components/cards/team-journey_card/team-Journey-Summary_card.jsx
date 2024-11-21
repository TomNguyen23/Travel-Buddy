import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import isBefore from 'date-fns/isBefore'
import { useEditTravelPlanMutation, useRemoveTravelPlanMutation } from "@/api/featureApi/teamJourneyApiSlice";

const TeamJourneySummaryCard = () => {
    const { toast } = useToast();
    const navigateTo = useNavigate();
    const planDetail = useSelector((state) => state?.teamJourney?.travelPlanDetail);
    const planID = useSelector((state) => state.teamJourney.journeyID);

    const members = useSelector((state) => state.teamJourney.travelPlanDetail.members);
    const myID = useSelector((state) => state.auth.login.user.id);

    const myMember = members?.find(member => member.userId === myID);
    const myRole = myMember ? myMember.role : null;

    const [journeyName, setJourneyName] = useState(planDetail.name);
    const [startTime, setStartTime] = useState(planDetail.startTime);
    const [endTime, setEndTime] = useState(planDetail.endTime);
    
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const minDateTime = getCurrentDateTime();

    const [removeJourney] = useRemoveTravelPlanMutation();
    const handleDeleteJourney = async (id) => {
        await removeJourney(id)
            .unwrap()
            .then(() => {
                navigateTo('/my-journeys');
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

    const [editJourney] = useEditTravelPlanMutation();

    const handleEditJourney = async (e) => {
        e.preventDefault();

        if (isBefore(new Date(endTime), new Date(startTime))) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Ngày kết thúc không thể trước ngày bắt đầu",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            })
            return;
        }

        const formData = {
            id: planID,
            name: journeyName,
            startTime: startTime,
            endTime: endTime,
            description: '',
        };
        
        await editJourney(formData)
            .then(() => {
                document.getElementById('edit-journey').close();
                toast({
                    title: "Chỉnh sửa kế hoạch thành công",
                    description: "Kế hoạch đã được cập nhật",
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
        <div className="bg-[url('@/assets/images/team-journey-card.png')] bg-cover rounded-md">
            <div className="bg-blackOverlay px-6 pt-3 pb-12 rounded-md text-white">
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold w-2/3">{planDetail.name}</h1>
                    {myRole === 'OWNER' &&
                        <DropdownMenu>
                            <DropdownMenuTrigger className="ml-5">
                                <span className="material-icons text-xl">more_horiz</span>
                            </DropdownMenuTrigger>
        
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={()=>document.getElementById('edit-journey').showModal()}>Chỉnh sửa</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteJourney(planID)} className="text-red-700">Xóa kế hoạch</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </div>
    
                <div className="flex items-center">
                    <span className="material-icons text-lg">calendar_month</span>
                    <p className="text-md mx-2">{formatDateTime(planDetail?.startTime)}</p>
                    <span className="material-icons text-lg">arrow_forward</span>
                    <p className="text-md mx-2">{formatDateTime(planDetail?.endTime)}</p>
                </div>



                {/* modal */}
                <dialog id="edit-journey" className="modal">
                    <div className="modal-box rounded-md">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black dark:text-white">✕</button>
                        </form>
                        <h3 className="font-bold text-lg text-black dark:text-white">Chỉnh sửa tổng quan hành trình</h3>
                        
                        <form onSubmit={handleEditJourney}>
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text">Tên hành trình</span>
                                </div>
                                <input type="text"
                                    className="input input-bordered text-black dark:text-white w-full max-w-md rounded-sm" 
                                    value={journeyName}
                                    onChange={(e) => setJourneyName(e.target.value)}
                                />
                            </label>

                            <div className="grid grid-cols-2 gap-3 max-w-md">
                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Bắt đầu</span>
                                    </div>
                                    <input
                                        type="datetime-local"
                                        id="datetime"
                                        className="border px-2 py-3 rounded-sm text-black dark:text-white dark:bg-[#1D232A]"
                                        value={startTime}
                                        min={minDateTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                    />
                                </label>

                                <label className="form-control">
                                    <div className="label">
                                        <span className="label-text">Kết thúc</span>
                                    </div>
                                    <input
                                        type="datetime-local"
                                        id="datetime"
                                        className="border px-2 py-3 rounded-sm text-black dark:text-white dark:bg-[#1D232A]"
                                        value={endTime}
                                        min={minDateTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                    />
                                </label>
                            </div>


                            <Button 
                                type="submit" 
                                className="mt-4 mr-3 float-right bg-main hover:bg-main-hover">
                                    Chỉnh sửa
                            </Button>
                        </form>
                    </div>
                </dialog>
                {/* ----------- */}
            </div>
        </div>
     );
}
 
export default TeamJourneySummaryCard;