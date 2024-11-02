import { useState } from "react"
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

const AddDestinationItem = () => {
    const [dateTime, setDateTime] = useState('');
    const [destination, setDestination] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault()
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
                    <label className="form-control w-full max-w-md mb-4">
                        <div className="label">
                            <span className="label-text">Tên địa điểm</span>
                        </div>
                        <input type="text"
                            className="input input-bordered w-full max-w-md rounded-sm" 
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </label>


                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Thời gian</span>
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

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="mt-4 bg-[#FFAB3E] hover:bg-[#f4c17e]">Thêm</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>

            </SheetContent>
        </Sheet>
     );
}
 
export default AddDestinationItem;