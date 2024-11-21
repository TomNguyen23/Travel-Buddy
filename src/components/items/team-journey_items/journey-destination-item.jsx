import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { format } from "date-fns";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAfter, isBefore } from "date-fns";
import PropTypes from 'prop-types';

import { getSideID } from '@/redux/reducer/site-detail.reducer';
import { useEditSiteInPlanMutation, useRemoveSiteOutPlanMutation } from '@/api/featureApi/teamJourneyApiSlice';

const JourneyDestinationItem = ( props ) => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const planID = useSelector((state) => state.teamJourney.journeyID);
    const planDetail = useSelector((state) => state.teamJourney.travelPlanDetail);

    const [startTime, setStartTime] = useState(props.data.startTime);
    const [endTime, setEndTime] = useState(props.data.endTime);
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

    const getProvince = () => {
        const address = props.data.siteBasicInfoRspnDto.resolvedAddress;
        const province = address.split(', ')[address.split(', ').length - 1];

        return province;
    }

    const handleGetSiteDetail = (id) => {
        dispatch(getSideID(id));
        navigateTo("/details/hotel");

    }

    const [removeSiteOutPlan] = useRemoveSiteOutPlanMutation();
    const handleDeleteDestination = async (SiteID) => {
        const data = {
            planId: planID,
            siteId: SiteID,
        }

        await removeSiteOutPlan(data)
            .unwrap()
            .then(() => {
                toast({
                    title: "Xóa điểm đến thành công",
                    description: "Điểm đến đã được xóa khỏi kế hoạch",
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


    const [editSiteInPlan] = useEditSiteInPlanMutation();
    const handleEditDestination = async (SiteID) => {
        if (isBefore(new Date(endTime), new Date(startTime))) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Ngày kết thúc không thể trước ngày bắt đầu",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            })
            return;
        }

        if (isBefore(new Date(startTime), new Date(planDetail.startTime)) || isAfter(new Date(startTime), new Date(planDetail.endTime))) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Thời gian bắt đầu không hợp lệ",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            })
            return;
        }

        const formData = {
            planId: planID,
            siteId: SiteID,
            startTime: startTime,
            endTime: endTime,
            name: props.data.siteBasicInfoRspnDto.siteName,
            description: '',
        }

        await editSiteInPlan(formData)
            .unwrap()
            .then(() => {
                toast({
                    title: "Chỉnh sửa điểm đến thành công",
                    description: "Điểm đến đã được chỉnh sửa",
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
        <div className="w-full px-3 py-2 my-2 rounded-sm flex justify-between items-center hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer">
            <img src="https://picsum.photos/200" className="h-28 w-1/4 object-cover rounded-md" alt="" />

            <div className="w-3/4 pl-3">
                <div className="badge badge-accent text-white">{getProvince()}</div>
                <h1 
                    className="text-2xl font-semibold hover:underline"
                    onClick={() => handleGetSiteDetail(props.data.siteBasicInfoRspnDto.siteId)}
                >
                    {props.data.siteBasicInfoRspnDto.siteName}
                </h1>

                <div className="flex justify-between items-center pt-3 text-xs">
                    <p>{props.data.siteBasicInfoRspnDto.siteType.name}</p>
                    <p className="ml-4 flex items-center">
                        <span className="material-icons-outlined">schedule</span>
                        <p className="ml-1">{format(props.data.startTime, "HH:mm dd/MM/yyyy")}</p>
                        <span className="material-icons">arrow_forward</span>
                        <p className="ml-2">{format(props.data.endTime, "HH:mm dd/MM/yyyy")}</p>
                    </p>
                </div>
            </div>

            <div className="w-2/12 flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger className="ml-5">
                        <span className="material-icons text-3xl">more_horiz</span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={()=>document.getElementById(`edit-destination-${props.data.siteBasicInfoRspnDto.siteId}`).showModal()}>
                            Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteDestination(props.data.siteBasicInfoRspnDto.siteId)} className="text-red-700">Xóa</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            {/* modal */}
            <dialog id={`edit-destination-${props.data.siteBasicInfoRspnDto.siteId}`} className="modal">
                <div className="modal-box rounded-md">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Chỉnh sửa thời gian của điểm đến</h3>
                    
                    <div>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Tên địa điểm</span>
                            </div>
                            <div className='p-3 bg-slate-200 dark:bg-slate-800 rounded-sm'>{props.data.siteBasicInfoRspnDto.siteName}</div>
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
                            onClick={() => handleEditDestination(props.data.siteBasicInfoRspnDto.siteId)} 
                            className="mt-4 mr-3 float-right bg-main hover:bg-main-hover">
                                Chỉnh sửa
                        </Button>
                    </div>
                </div>
            </dialog>
            {/* ----------- */}
        </div> 
    );
}
JourneyDestinationItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        startTime: PropTypes.instanceOf(Date).isRequired,
        endTime: PropTypes.instanceOf(Date).isRequired,
        siteBasicInfoRspnDto: PropTypes.shape({
            siteId: PropTypes.number.isRequired,
            resolvedAddress: PropTypes.string.isRequired,
            siteName: PropTypes.string.isRequired,
            siteType: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
            
        }),
    }).isRequired,
};

export default JourneyDestinationItem;