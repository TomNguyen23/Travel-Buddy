import { useState } from "react"
import PropTypes from 'prop-types';

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"  

const EditJourneyMember = ({ members }) => {
    

    const [memberPositions, setMemberPositions] = useState(members);

    const setPosition = (id, value) => {
        setMemberPositions(prevState => 
            prevState.map(member => 
                member.id === id ? { ...member, role: value } : member
            )
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(memberPositions);
    };

    const handleDeleteMember = (id) => {
        console.log("Delete: ", id);
    }
    
    return ( 
        <span>
            <Dialog>
                <DialogTrigger>
                    <span className="material-icons-outlined cursor-pointer">settings</span>
                </DialogTrigger>

                <DialogContent className="dark:bg-gray-900  ">
                    <DialogHeader>
                        <DialogTitle>Chỉnh sửa thành viên</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                        <div className="max-h-96 overflow-y-auto">

                            {memberPositions.map(member => (
                                <div key={member.id} className="flex items-center justify-between mt-3">
                                    <div className="flex items-center">
                                        <img src={member.avatar} className="size-12 rounded-full" alt="" />
                                        <p className="pl-2 text-lg">{member.nick_name}</p>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="bg-transparent hover:bg-inherit text-inherit">
                                                {member.role === "moderator" ? "Quản trị viên" : "Thành viên"}
                                                <span className="material-icons text-lg">arrow_drop_down</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuRadioGroup value={member.role} onValueChange={(value) => setPosition(member.id, value)}>
                                                <DropdownMenuRadioItem value="moderator">Quản trị viên</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="member">Thành viên</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>

                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteMember(member.id)}>
                                                <span className="material-icons-outlined text-lg">delete</span>
                                                Xóa
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ))}
                        </div>

                        <DialogFooter>
                            <Button type='submit' className="mt-4 bg-[#FFAB3E] hover:bg-[#f4c17e]">Lưu thay đổi</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        </span>
     );
}
EditJourneyMember.propTypes = {
    members: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            avatar: PropTypes.string.isRequired,
            nick_name: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default EditJourneyMember;