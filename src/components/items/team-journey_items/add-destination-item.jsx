import { useState } from "react"
import useDebound from "@/hooks/use-debound";
import Tippy from "@tippyjs/react/headless";
import { useSelector } from "react-redux";
import { isAfter, isBefore } from "date-fns";

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

import { useSearchSitesQuery } from "@/api/featureApi/siteApiSlice";
import { useAddSiteToPlanMutation } from "@/api/featureApi/teamJourneyApiSlice";

const AddDestinationItem = () => {
    const { toast } = useToast();
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [destination, setDestination] = useState('');
    const [sideID, setSideID] = useState('');

    const planDetail = useSelector((state) => state.teamJourney.travelPlanDetail);
    const planID = useSelector((state) => state.teamJourney.journeyID);

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

    const [showSearchResult, setShowSearchResult] = useState(false);
    const searchValueDebounce = useDebound(destination);

    const { data: sites } = useSearchSitesQuery(
        {searchValue: searchValueDebounce}, 
        {   refetchOnMountOrArgChange: true,
            enabled: searchValueDebounce !== '',
            skip: searchValueDebounce === ''
        });
    
    const handleChooseSite = (siteID, siteName) => {
        setSideID(siteID);
        setDestination(siteName);
        setShowSearchResult(false);
    }

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

        if (!destination || !startTime || !endTime) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Vui lòng điền đầy đủ thông tin",
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
            siteId: sideID,
            startTime: startTime,
            endTime: endTime,
            name: destination,
            description: '',
        }

        await addSiteToPlan(formData)
            .unwrap()
            .then(() => {
                setStartTime('');
                setEndTime('');
                setDestination('');
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
                <Button variant="outline">
                    <span className="mr-2">+</span>
                    Thêm địa điểm
                </Button>
            </SheetTrigger>
            <SheetContent >
                <SheetHeader>
                    <SheetTitle>Thêm địa điểm mới</SheetTitle>
                    <SheetDescription>
                        Thêm địa điểm mới vào kế hoạch của bạn
                    </SheetDescription>
                </SheetHeader>
                <form className="py-4" onSubmit={handleSubmit}>
                    <Tippy
                        interactive
                        visible={showSearchResult && sites?.data?.length > 0}
                        onClickOutside={() => setShowSearchResult(false)}
                        placement="bottom"
                        render={attrs => (
                            <div className='w-[22rem] h-fit max-h-80 overflow-auto bg-white dark:bg-gray-800 border rounded-md' tabIndex="-1" {...attrs}>
                                {sites?.data?.map((item, index) => (
                                    <div key={index} 
                                        onClick={() => handleChooseSite(item.siteId, item.siteName)}
                                        className="flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
                                        <div>
                                            <h1 className="font-semibold">{item.siteName}</h1>
        
                                            <div className='flex items-start'>
                                                <span className='material-icons-outlined text-sm text-gray-400'>location_on</span>
                                                <span className='text-sm text-gray-400 pl-1'>{item.resolvedAddress}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> 
                          )}
                    >

                        <label className="form-control w-full max-w-md mb-6">
                            <div className="label">
                                <span className="label-text">Tên địa điểm</span>
                            </div>
                            <input type="text"
                                className="input input-bordered w-full max-w-md rounded-sm" 
                                onChange={(e) => setDestination(e.target.value)}
                                value={destination}
                                onFocus={() => setShowSearchResult(true)}
                            />
                        </label>
                    </Tippy>


                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Thời gian bắt đầu</span>
                        </div>
                        <input
                            type="datetime-local"
                            id="datetime"
                            className="border px-2 py-3 rounded-sm dark:bg-[#1D232A]"
                            min={minDateTime}
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
                            min={minDateTime}
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
 
export default AddDestinationItem;