import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const JourneyDestinationItem = () => {
    return ( 
        <div className="w-full px-3 py-2 my-2 rounded-sm flex justify-between items-center hover:bg-slate-100 dark:hover:bg-slate-700">
            <img src="https://picsum.photos/200" className="h-28 w-1/4 object-cover rounded-md" alt="" />

            <div className="w-2/4 pl-3">
                <div className="badge badge-accent text-white">Quảng Ninh</div>
                <h1 className="text-2xl font-semibold">Vịnh Hạ Long</h1>

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
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-700">Xóa</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div> 
    );
}
 
export default JourneyDestinationItem;