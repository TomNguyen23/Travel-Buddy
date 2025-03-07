import { Link } from "react-router-dom";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DefaultAvatar from "@/assets/images/default-avt.png";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducer/auth.reducer";
import ChangeThemeItem from "../items/change-theme-item";
import SearchBar from "../bars/search-bar";

const MainHeader = () => {
    const token = useSelector((state) => state.auth.login.token);
    const userInfo = useSelector((state) => state.auth.login.user);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }

    return ( 
        <header className="flex justify-between items-center px-16 py-4 bg-white/30 dark:bg-[#020817]/30 backdrop-blur-md border-b fixed top-0 left-0 right-0 z-30">
            <Link to="/" className="flex items-center">
                {/* <img className="h-11 w-11 rounded-full" src="https://picsum.photos/200" alt="" /> */}
                <h1 className="text-2xl font-bold ml-3">Travel Buddy</h1>
            </Link>

            <SearchBar />
            <div className="flex items-center">

                <Link to="/discover" className="ml-5 font-semibold hover:text-main">Khám phá</Link>
                <Link to="/my-journeys" className="ml-5 font-semibold hover:text-main">Lên kế hoạch</Link>

                {token ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-5">
                            <Avatar>
                            {userInfo.avatar 
                                ? <AvatarImage src={userInfo.avatar} className='object-cover' />
                                : <AvatarImage src={DefaultAvatar} />
                            }
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link to="/your-profile">Trang cá nhân</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Link to="/my-sites">Địa điểm đã đăng</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Link to="/my-reviews">Đánh giá của tôi</Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={logoutHandler} className='text-red-600'>Đăng xuất</DropdownMenuItem>
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