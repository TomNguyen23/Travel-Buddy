import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet"  
import { Button } from "@/components/ui/button"

const AddDestinationItem = () => {
    return ( 
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <span className="material-icons">add</span>
                    Thêm địa điểm
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Thêm địa điểm</SheetTitle>
                    <SheetDescription>Thêm địa điểm mới vào hành trình</SheetDescription>
                </SheetHeader>

                <form className="py-4">
                    <label className="form-control w-full max-w-md">
                        <div className="label">
                            <span className="label-text">Tên địa điểm</span>
                        </div>
                        <input type="text" className="input input-bordered w-full max-w-md rounded-sm" />
                    </label>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="mt-4 bg-[#FFAB3E] hover:bg-[#f4c17e]">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>

            </SheetContent>
        </Sheet>
     );
}
 
export default AddDestinationItem;