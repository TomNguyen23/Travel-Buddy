import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MyJourneysCard = () => {
    const handleDeleteJourney = () => {
        console.log("Delete journey");
    }

    return ( 
        <Card className="w-full bg-[url('@/assets/images/layered-waves-haikei.png')] bg-cover dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-900">
            <CardHeader>
                <CardTitle className='cursor-pointer hover:underline' onClick={() => console.log("Card clicked")}>Chuyến du hành mùa thu</CardTitle>
                <CardDescription>
                    <div className="flex items-center">
                        <span className="material-icons text-lg">calendar_month</span>
                        <p className="text-md mx-2">20/10/2021</p>
                        <span className="material-icons text-lg">arrow_forward</span>
                        <p className="text-md mx-2">20/10/2021</p>
                    </div>

                    <div className="flex items-center">
                        <span className="material-icons text-lg">group</span>
                        <p className="text-md mx-2">4 thành viên</p>
                        
                    </div>
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger className="ml-5">
                        <span className="material-icons text-2xl">more_horiz</span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Chi tiết</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDeleteJourney} className="text-red-700">Xóa kế hoạch</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardFooter>
        </Card>
     );
}
 
export default MyJourneysCard;