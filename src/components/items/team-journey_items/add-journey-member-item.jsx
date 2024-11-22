import { useState } from "react";
import useDebound from "@/hooks/use-debound";
import Tippy from "@tippyjs/react/headless";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
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
  
import { useSearchUserQuery } from "@/api/featureApi/userApiSlice";
import { useAddMemberToPlanMutation } from "@/api/featureApi/teamJourneyApiSlice";

const AddJourneyMember = () => {
    const { toast } = useToast();
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [showSearchResult, setShowSearchResult] = useState(false);
    const searchValueDebounce = useDebound(email);

    const planID = useSelector((state) => state.teamJourney.journeyID);

    const { data: users} = useSearchUserQuery(
        {searchValue: searchValueDebounce}, 
        {   refetchOnMountOrArgChange: true,
            enabled: searchValueDebounce !== '',
            skip: searchValueDebounce === ''
        });

    const handleChooseUser = (userID, nickname) => {
        setUserId(userID);
        setEmail(nickname);
        setShowSearchResult(false);
    }


    const [addMemberToPlan] = useAddMemberToPlanMutation();
    const handleAddMember = async (e) => {
        e.preventDefault();
        
        if (userId === '') {
            setEmail('');
            toast({
                variant: "destructive",
                title: "Uh oh! Có gì đó sai sai.",
                description: "Vui lòng chọn người muốn thêm vào hành trình.",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            })
            return;
        }

        const formData = {
            planId: planID,
            userId: userId
        }

        await addMemberToPlan(formData)
            .unwrap()
            .then(() => {
                toast({
                    title: "Thêm thành viên thành công",
                    description: "Người dùng đã được thêm vào hành trình",
                    action: <ToastAction altText="OK">OK</ToastAction>,
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
                    <span className="material-icons-outlined mr-4 cursor-pointer">person_add</span>
                </DialogTrigger>

                <DialogContent className="dark:bg-gray-900">
                    <DialogHeader>
                        <DialogTitle>Thêm thành viên</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleAddMember}>
                        <Tippy
                            interactive
                            visible={showSearchResult && users?.data?.length > 0}
                            onClickOutside={() => setShowSearchResult(false)}
                            placement="bottom"
                            render={attrs => (
                                <div className='w-[28rem] h-fit max-h-80 overflow-auto bg-white dark:bg-gray-800 border rounded-md' tabIndex="-1" {...attrs}>
                                    {users?.data?.map((item, index) => (
                                        <div key={index} 
                                            onClick={() => handleChooseUser(item.id, item.nickname)}
                                            className="flex items-center gap-3 px-3 py-2 border-b cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
                                            <div className="flex items-center">
                                                {item.avatar === null 
                                                ? <img src={DefaultAvatar} className="size-9 rounded-full object-cover" alt="" />
                                                : <img src={item.avatar} className="size-9 rounded-full object-cover" alt="" />
                                                
                                                }
                                                
                                                <p className="pl-2 text-md">{item.nickname}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div> 
                            )}
                        >
                            <label className="form-control w-full max-w-md">
                                <div className="label">
                                    <span className="label-text">Email / nickname người muốn thêm</span>
                                </div>
                                <input type="text" 
                                    placeholder="Nhập Email / nickname" 
                                    className="input input-bordered w-full max-w-md rounded-sm" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setShowSearchResult(true)}
                                />
                            </label>
                        </Tippy>
                        

                        <Button type='submit' className="mt-4 mr-3 float-right bg-main hover:bg-main-hover">Thêm thành viên</Button>
                    </form>

                </DialogContent>
            </Dialog>
        </span>
     );
}
 
export default AddJourneyMember;