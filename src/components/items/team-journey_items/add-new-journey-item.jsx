import { useState } from "react";
import isBefore from 'date-fns/isBefore'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const AddNewJourneyItem = () => {
    const { toast } = useToast();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [journeyName, setJourneyName] = useState('');

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const minDateTime = getCurrentDate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isBefore(new Date(endDate), new Date(startDate))) {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Ngày kết thúc không thể trước ngày bắt đầu",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            })
            return;
        }

        if (journeyName === '' || startDate === '' || endDate === '') {
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Vui lòng điền đầy đủ thông tin",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            })
            return;
        }

        const formData = {
            journeyName: journeyName,
            startDate: startDate,
            endDate: endDate,
        };

        console.log("Create new journey: ", formData);
    } 

    return ( 
        <Sheet>
            <SheetTrigger asChild>
                <div className="w-full flex flex-col justify-center items-center border shadow rounded-lg cursor-pointer bg-cover dark:bg-gray-800 hover:bg-slate-100 dark:hover:bg-gray-900">
                    <span className="material-icons text-7xl">add</span>
                    <h1 className="font-medium">Hành trình mới</h1>
                </div>
            </SheetTrigger>
            <SheetContent >
                <SheetHeader>
                    <SheetTitle>Tạo một hành trình mới</SheetTitle>
                    <SheetDescription>
                        Hãy điền thông tin cần thiết để tạo một hành trình mới
                    </SheetDescription>
                </SheetHeader>
                <form className="py-4" onSubmit={handleSubmit}>
                    <label className="form-control w-full max-w-md mb-4">
                        <div className="label">
                            <span className="label-text">Tên kế hoạch chuyến đi</span>
                        </div>
                        <input type="text"
                            className="input input-bordered w-full max-w-md rounded-sm" 
                            value={journeyName}
                            onChange={(e) => setJourneyName(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full max-w-md mb-4">
                        <div className="label">
                            <span className="label-text">Thời gian bắt đầu</span>
                        </div>
                        <input
                            type="date"
                            id="datetime"
                            className="border px-2 py-3 rounded-sm dark:bg-[#1D232A]"
                            value={startDate}
                            min={minDateTime}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>

                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Thời gian kết thúc</span>
                        </div>
                        <input
                            type="date"
                            id="datetime"
                            className="border px-2 py-3 rounded-sm dark:bg-[#1D232A]"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="mt-4 bg-main hover:bg-main-hover">Tạo mới</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>

            </SheetContent>
        </Sheet>
     );
}
 
export default AddNewJourneyItem;