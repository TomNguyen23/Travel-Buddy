import { useState, useEffect } from "react"
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"  
import DefaultAvatar from "@/assets/images/default-avt.png";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { useSelector } from "react-redux";
import { useChangeRoleOfMemberMutation, useRemoveMemeberOutPlanMutation } from "@/api/featureApi/teamJourneyApiSlice";

const EditJourneyMember = () => {
    const { toast } = useToast();
    const planID = useSelector((state) => state.teamJourney.journeyID);
    const members = useSelector((state) => state.teamJourney.travelPlanDetail.members);
    const [memberPositions, setMemberPositions] = useState(members);

    useEffect(() => {
        if (members) {
            setMemberPositions(members);
        }
    }, [members]);

    const [changeMemberRole] = useChangeRoleOfMemberMutation();
    const setPosition = async (userId, value) => {
        setMemberPositions(prevState => 
            prevState?.map(member => 
                member.userId === userId ? { ...member, role: value } : member
            )
        );
        console.log(`User ID: ${userId}, New Role: ${value}`);
        const formData = {
            planId: planID,
            userId: userId,
            role: value
        };

        await changeMemberRole(formData)
            .unwrap()
            .then(() => {
                toast({
                    title: "Thành công!",
                    description: "Vai trò thành viên đã được cập nhật.",
                })
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: error.data.message,
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
            })
    };

    const [removeMember] = useRemoveMemeberOutPlanMutation();
    const handleDeleteMember = (id) => {
        const formData = {
            planId: planID,
            userId: id
        };

        removeMember(formData)
            .unwrap()
            .then(() => {
                setMemberPositions(prevState => 
                    prevState?.filter(member => member.id !== id)
                );
                toast({
                    title: "Thành công!",
                    description: "Thành viên đã được xóa khỏi chuyến đi.",
                })
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: error.data.message,
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
            })
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

                    <form>
                        <div className="max-h-96 overflow-y-auto">

                            {memberPositions?.map(member => (
                                <div key={member.userId} className="flex items-center justify-between mt-3">
                                    <div className="flex items-center">
                                    {member.avatarUrl
                                        ? <img src={member.avatarUrl} className="size-12 rounded-full object-cover" alt="" />
                                        : <img src={DefaultAvatar} className="size-12 rounded-full object-cover" alt="" />
                                    }
                                        <p className="pl-2 text-lg">{member.nickname}</p>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button className="bg-transparent hover:bg-inherit text-inherit" disabled={member.role === "OWNER"}>
                                            {member.role === "ADMIN" ? "Quản trị viên" : member.role === "MEMBER" ? "Thành viên" : "Người lập nhóm"}
                                            <span className="material-icons text-lg">arrow_drop_down</span>
                                        </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent>
                                            <DropdownMenuRadioGroup value={member.role} onValueChange={(value) => setPosition(member.userId, value)}>
                                                {member.role !== "OWNER" && (
                                                    <>
                                                        <DropdownMenuRadioItem value="ADMIN">Quản trị viên</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="MEMBER">Thành viên</DropdownMenuRadioItem>
                                                    </>
                                                )}
                                            </DropdownMenuRadioGroup>

                                            {member.role !== "OWNER" && (
                                                <>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteMember(member.userId)}>
                                                        <span className="material-icons-outlined text-lg">delete</span>
                                                        Xóa
                                                    </DropdownMenuItem>
                                                </>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ))}
                        </div>

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