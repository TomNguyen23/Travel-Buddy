import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TeamJourneySummaryCard = () => {
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
                            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-700">Xóa</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
    
                <div className="flex items-center">
                    <span className="material-icons text-lg">calendar_month</span>
                    <p className="text-md mx-2">20/10/2021</p>
                    <span className="material-icons text-lg">arrow_forward</span>
                    <p className="text-md ml-2">20/11/2021</p>
                </div>
            </div>
        </div>
     );
}
 
export default TeamJourneySummaryCard;