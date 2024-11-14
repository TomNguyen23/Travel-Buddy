import { Link } from "react-router-dom";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DefaultAvatar from "@/assets/images/default-avt.png";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducer/auth.reducer";
import ChangeThemeItem from "../items/change-theme-item";

const MainHeader = () => {
    const token = useSelector((state) => state.auth.login.token);
    const userInfo = useSelector((state) => state.auth.login.user);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }
    return ( 
        <header className="flex justify-between items-center px-16 py-4 bg-white/30 dark:bg-[#020817]/30 backdrop-blur-md border-b fixed top-0 left-0 right-0 z-30">
            <div className="flex items-center">
                <img className="h-11 w-11 rounded-full" src="https://picsum.photos/200" alt="" />
                <h1 className="text-2xl font-bold ml-3">Travel Buddy</h1>
            </div>


            <label className="input input-bordered flex items-center gap-2 rounded-full w-[33.125rem] min-w-28 mr-3">
                <input type="text" className="grow" placeholder="Tìm địa điểm và lên kế hoạch du lịch ngay..." />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
            </label>
            <div className="flex items-center">

                <Link to="/discover" className="ml-5 font-semibold hover:text-main">Khám phá</Link>
                <Link to="/my-journeys" className="ml-5 font-semibold hover:text-main">Lên kế hoạch</Link>

                {token ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-5">
                            <Avatar>
                            {userInfo.avatar 
                                ? <AvatarImage src={userInfo.avatar} />
                                : <AvatarImage src={DefaultAvatar} />
                            }
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Admin</DropdownMenuLabel>
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link to="/your-profile">Trang cá nhân</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logoutHandler}>Đăng xuất</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : 
                (
                    <Link to="/login" className="ml-3 font-semibold px-6 py-3 bg-main hover:bg-main-hover text-white rounded-full">Đăng nhập</Link>
                )}

                <ChangeThemeItem />
            </div>
        </header>
     );
}
 
export default MainHeader;