import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types';

const JourneyDestinationItem = ( props ) => {
    const [dateTime, setDateTime] = useState('');
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

    const handleDeleteDestination = (id) => {
        console.log("Delete destination: ", id);
    }

    const handleEditDestination = (id) => {
        const formData = {
            id: id,
            dateTime: dateTime,
        };

        console.log("Edit destination: ", formData);
    }

    return ( 
        <div className="w-full px-3 py-2 my-2 rounded-sm flex justify-between items-center hover:bg-slate-100 dark:hover:bg-slate-700">
            <img src="https://picsum.photos/200" className="h-28 w-1/4 object-cover rounded-md" alt="" />

            <div className="w-2/4 pl-3">
                <div className="badge badge-accent text-white">{props.data.state}</div>
                <h1 className="text-2xl font-semibold">{props.data.city}</h1>

                <div className="flex items-center pt-3">
                    <p>Địa điểm du lịch</p>
                    <p className="ml-4 flex items-center">
                        <span className="material-icons-outlined">schedule</span>
                        <span className="ml-1">8:00 03/11/2024</span>
                    </p>
                </div>
            </div>

            <div className="w-1/4 flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger className="ml-5">
                        <span className="material-icons text-3xl">more_horiz</span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={()=>document.getElementById(`edit-destination-${props.data.id}`).showModal()}>
                            Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteDestination(props.data.id)} className="text-red-700">Xóa</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            {/* modal */}
            <dialog id={`edit-destination-${props.data.id}`} className="modal">
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
                            <div className='p-3 bg-slate-200 dark:bg-slate-800 rounded-sm'>{props.data.city}</div>
                        </label>

                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Thời gian trong kế hoạch</span>
                            </div>
                            <input
                                type="datetime-local"
                                id="datetime"
                                className="border px-2 py-3 rounded-sm dark:bg-[#1D232A]"
                                value={dateTime}
                                min={minDateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                            />
                        </label>

                        <Button 
                            onClick={() => handleEditDestination(props.data.id)} 
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
        state: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
    }).isRequired,
};

export default JourneyDestinationItem;