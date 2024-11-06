import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const TeamJourneySummaryCard = () => {
    const [journeyName, setJourneyName] = useState('Chuyến du hành mùa thu');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

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

    const handleDeleteJourney = () => {
        console.log("Delete journey");
    }

    const handleEditJourney = (e) => {
        e.preventDefault();
        const formData = {
            startTime: startTime,
            endTime: endTime,
        };

        console.log("Edit destination: ", formData);
    }

    return ( 
        <div className="bg-[url('@/assets/images/team-journey-card.png')] bg-cover rounded-md">
            <div className="bg-blackOverlay px-6 pt-3 pb-12 rounded-md text-white">
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold w-2/3">Chuyến du hành mùa thu</h1>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-5">
                            <span className="material-icons text-xl">more_horiz</span>
                        </DropdownMenuTrigger>
    
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={()=>document.getElementById('edit-journey').showModal()}>Chỉnh sửa</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDeleteJourney} className="text-red-700">Xóa kế hoạch</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
    
                <div className="flex items-center">
                    <span className="material-icons text-lg">calendar_month</span>
                    <p className="text-md mx-2">20/10/2021</p>
                    <span className="material-icons text-lg">arrow_forward</span>
                    <p className="text-md ml-2">20/11/2021</p>
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