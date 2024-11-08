import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import DefaultAvatar from "@/assets/images/default-avt.png";
import ProfileSideBarItem from "../items/user_items/profile-sidebar-item";

import { Separator } from "@/components/ui/separator"
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { useDispatch } from "react-redux";
import { logout } from "@/redux/reducer/auth.reducer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useUploadImgMutation } from "@/api/featureApi/userApiSlice";


const ProfileSidebar = () => {
    const { toast } = useToast();
    const [avatarFile, setAvatarFile] = useState(null);

    const userInfo = useSelector((state) => state.auth.login.user);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [uploadUserAvatar] = useUploadImgMutation();

    const changeAccountHandler = () => {
        dispatch(logout());
        navigateTo("/login");
    }

    const logoutHandler = () => {
        dispatch(logout());
        navigateTo("/homepage");
    }

    useEffect(() => {
        const uploadAvatarHandler = async () => {
            if (avatarFile) {
                const validImageTypes = ['image/png', 'image/jpg', 'image/jpeg'];
                if (!validImageTypes.includes(avatarFile.type)) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Có gì đó sai sai.",
                        description: "Chỉ chấp nhận file ảnh có định dạng PNG, JPG, JPEG.",
                        action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                    })
                    return;
                }
    
                const formData = {avatar: avatarFile};
                console.log(formData);
    
                // await uploadUserAvatar(formData)
                // .unwrap()
                // .then((res) => {
                //     console.log(res);
                // })
                // .catch((err) => {
                //     console.log(err);
                // })
            }   
        }
        uploadAvatarHandler();
    }, [avatarFile, toast]);
    
    

    return ( 
        <aside className="px-3">
            <div className="flex items-center px-5 py-7">
                <form id="avatarForm" className="relative z-20 min-w-20">
                    {userInfo.avatar 
                        ? <img src={userInfo.avatar} className="size-20 rounded-full" alt="" />
                        : <img src={DefaultAvatar} className="size-20 rounded-full" alt="" />
                    }

                    <div className="size-7 rounded-full bg-slate-100 dark:bg-[#28313a] flex justify-center items-center absolute right-0 bottom-0">
                        <input onChange={(e) => setAvatarFile(e.target.files[0])} type="file" id="myAvatar" name="myAvatar" accept="image/png, image/jpg, image/jpeg" hidden />
                        <label htmlFor="myAvatar" className="cursor-pointer">
                            <span className="material-icons text-base">edit</span>
                        </label>
                    </div>
                </form>


                <div className="ml-3">
                    <h1 className="text-2xl font-bold">{userInfo.fullName}</h1>
                    <p className="flex items-center">
                        <span className="material-icons text-[#FFAB3E] text-3xl">workspace_premium</span>
                        <span className="">1020 điểm</span>
                    </p>
                </div>
            </div>

            <Separator />

            <div>
                <ProfileSideBarItem navigateTo="/your-profile">
                    <FontAwesomeIcon icon={faUser} size="xl" className="ml-1 mr-2" /> Tài khoản
                </ProfileSideBarItem>

                <ProfileSideBarItem navigateTo="/password-and-security">
                    <div className="flex items-center mb-3">
                        <span className="material-icons-outlined text-2xl mr-2">shield</span> 
                        <span>Mật khẩu và bảo mật</span>
                    </div>
                </ProfileSideBarItem>

                <Separator />

                <ProfileSideBarItem navigateTo="/profile">
                    <div className="flex items-center">
                        <span className="material-icons-outlined text-2xl mr-2">border_color</span> 
                        <span>Bài đánh giá</span>
                    </div>
                </ProfileSideBarItem>

                <ProfileSideBarItem navigateTo="/profile">
                    <div className="flex items-center">
                        <span className="material-icons-outlined text-2xl mr-2">add_location_alt</span> 
                        <span>Địa điểm đã đăng</span>
                    </div>
                </ProfileSideBarItem>

                <ProfileSideBarItem navigateTo="/profile">
                    <div className="flex items-center">
                        <span className="material-icons-outlined text-2xl mr-2">text_snippet</span> 
                        <span>Báo cáo đã gửi</span>
                    </div>
                </ProfileSideBarItem>

                <ProfileSideBarItem navigateTo="/my-notifications">
                    <div className="flex items-center mb-3">
                        <span className="material-icons-outlined text-2xl mr-2">notifications</span> 
                        <span>Thông báo của tôi</span>
                    </div>
                </ProfileSideBarItem>

                <Separator />

                <div onClick={changeAccountHandler} className="flex items-center text-sm font-bold text-gray-500 hover:text-gray-600 px-4 pt-4 pb-2 cursor-pointer">
                    <span className="material-icons-outlined text-2xl mr-2">change_circle</span> 
                    <span>Chuyển tài khoản</span>
                </div>

                <div onClick={logoutHandler} className="flex items-center text-sm font-bold text-red-500 hover:text-red-600 px-4 pt-4 pb-2 cursor-pointer">
                    <span className="material-icons-outlined text-2xl mr-2">logout</span> 
                    <span>Đăng xuất</span>
                </div>
            </div>
        </aside>
     );
}
 
export default ProfileSidebar;