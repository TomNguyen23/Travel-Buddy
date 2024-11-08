import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"  

const AddJourneyMember = () => {
    return ( 
        <span>
            <Dialog>
                <DialogTrigger>
                    <span className="material-icons-outlined mr-4 cursor-pointer">person_add</span>
                </DialogTrigger>

                <DialogContent className="dark:bg-gray-900">
                    <DialogHeader>
                        <DialogTitle>Thêm thành viên</DialogTitle>
                    </DialogHeader>

                    <form>
                        <label className="form-control w-full max-w-md">
                            <div className="label">
                                <span className="label-text">Nickname người muốn thêm</span>
                            </div>
                            <input type="text" placeholder="Nhập nickname" className="input input-bordered w-full max-w-md rounded-sm" />
                        </label>

                        <Button type='submit' className="mt-4 mr-3 float-right bg-main hover:bg-main-hover">Thêm thành viên</Button>
                    </form>

                </DialogContent>
            </Dialog>
        </span>
     );
}
 
export default AddJourneyMember;